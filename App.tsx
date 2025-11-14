'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { Volume2, VolumeX } from 'lucide-react';
import PlinkoBoard from './components/PlinkoBoard';
import HistoryTable from './components/HistoryTable';
import { GameResult } from './types';
import { MULTIPLIERS, ROWS, PHYSICS_CALIBRATION_COEFFICIENT, CALIBRATED_MULTIPLIERS } from './constants';

type DevToolsTab = 'devtools' | 'balance' | 'history';

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  // Use calibrated multipliers if available, otherwise use base multipliers
  const [multipliers, setMultipliers] = useState<number[]>(
    CALIBRATED_MULTIPLIERS.length > 0 ? CALIBRATED_MULTIPLIERS : MULTIPLIERS
  );
  const [history, setHistory] = useState<GameResult[]>([]);
  const [playTrigger, setPlayTrigger] = useState(0);
  const [isDevToolsVisible, setIsDevToolsVisible] = useState(false);
  const [devToolsTab, setDevToolsTab] = useState<DevToolsTab>('devtools');
  const [lastPayout, setLastPayout] = useState<{ payout: number; key: number } | null>(null);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [targetRTP, setTargetRTP] = useState(0.95);
  const [isCalculating, setIsCalculating] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rowSpacing, setRowSpacing] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  
  // Gravity calibration state - keep stable to maintain correct physics
  const [gravity, setGravity] = useState<number>(0.1);
  const binDistributionRef = useRef<number[]>([]); // Track wins per bin (cumulative, never reset)
  const totalLossesRef = useRef<number>(0); // Track losses (ball hits floor) (cumulative)
  const calibrationHistoryRef = useRef<{ rtp: number; scaleFactor: number; games: number }[]>([]); // Track calibration history
  const totalGamesPlayedRef = useRef<number>(0); // Track all games played (cumulative, never reset)
  const totalPayoutRef = useRef<number>(0); // Track total payout across all games (cumulative)
  const lastCalibrationGamesRef = useRef<number>(0); // Track games since last calibration

  const BET_AMOUNT = 1;

  // Calculate binomial coefficient (n choose k)
  const binomialCoefficient = (n: number, k: number): number => {
    if (k > n - k) k = n - k;
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = result * (n - i) / (i + 1);
    }
    return result;
  };

  // Calculate exact probabilities for each bin using binomial distribution
  const calculateBinProbabilities = useCallback((binCount: number): number[] => {
    const probabilities: number[] = new Array(binCount).fill(0);
    const totalPaths = Math.pow(2, ROWS);
    
    // Starting position is center: (binCount - 1) / 2
    const centerPos = (binCount - 1) / 2;
    
    // For each possible number of right moves (0 to ROWS)
    for (let rightMoves = 0; rightMoves <= ROWS; rightMoves++) {
      const leftMoves = ROWS - rightMoves;
      
      // Calculate final position: center + (rightMoves - leftMoves) * 0.5
      // Each move shifts by 0.5 positions
      const finalPosition = centerPos + (rightMoves - leftMoves) * 0.5;
      
      // Round to nearest bin (bins are at integer positions 0, 1, 2, ..., binCount-1)
      const targetBin = Math.round(finalPosition);
      
      // Clamp to valid bin range
      if (targetBin >= 0 && targetBin < binCount) {
        const ways = binomialCoefficient(ROWS, rightMoves);
        probabilities[targetBin] += ways / totalPaths;
      }
    }
    
    return probabilities;
  }, []);

  // Calculate expected value deterministically
  const calculateExpectedValue = useCallback((multipliers: number[]): number => {
    const probabilities = calculateBinProbabilities(multipliers.length);
    let ev = 0;
    for (let i = 0; i < multipliers.length; i++) {
      ev += probabilities[i] * multipliers[i];
    }
    return ev;
  }, [calculateBinProbabilities]);

  // Call sdk.ready() to clear the splash screen
  useEffect(() => {
    sdk.actions.ready().catch((error) => {
      // Silently fail if not in a Mini App context
      console.debug('Failed to call sdk.ready():', error);
    });
  }, []);

  // Initialize audio context for sound effects
  useEffect(() => {
    // Create audio context on user interaction (required by browsers)
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    // Initialize on first user interaction
    const handleInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Play peg hit sound
  const playPegSound = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    try {
      const audioContext = audioContextRef.current;
      // Resume audio context if suspended (required by some browsers)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Simple tone: 800Hz, short duration
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug('Failed to play sound:', error);
    }
  }, [soundEnabled]);

  // Initialize bin distribution tracking (only on mount, never reset)
  useEffect(() => {
    if (binDistributionRef.current.length === 0) {
      binDistributionRef.current = new Array(multipliers.length).fill(0);
      totalLossesRef.current = 0;
      lastCalibrationGamesRef.current = 0;
    } else if (binDistributionRef.current.length !== multipliers.length) {
      // If multiplier count changed, resize but preserve existing data
      const oldLength = binDistributionRef.current.length;
      binDistributionRef.current = [...binDistributionRef.current, ...new Array(multipliers.length - oldLength).fill(0)];
    }
  }, [multipliers.length]);

  // Auto-calibrate multipliers on mount ONLY if no calibrated multipliers exist
  // If CALIBRATED_MULTIPLIERS is set, use those directly (they're already calibrated)
  useEffect(() => {
    // If we already have calibrated multipliers, use them and skip auto-calibration
    if (CALIBRATED_MULTIPLIERS.length > 0) {
      console.log('Using pre-calibrated multipliers:', CALIBRATED_MULTIPLIERS);
      return;
    }

    // Otherwise, apply initial calibration from base multipliers
    const baseEV = calculateExpectedValue(MULTIPLIERS);
    if (baseEV > 0) {
      // Step 1: Scale to target RTP (95%)
      const targetRTPFactor = 0.95 / baseEV;
      // Step 2: Apply physics calibration coefficient to account for Matter.js physics differences
      const finalScalingFactor = targetRTPFactor * PHYSICS_CALIBRATION_COEFFICIENT;
      const newMultipliers = MULTIPLIERS.map(m => parseFloat((m * finalScalingFactor).toPrecision(3)));
      setMultipliers(newMultipliers);
      console.log('Auto-calibrated multipliers (dev mode):', {
        baseEV: baseEV.toFixed(4),
        targetRTPFactor: targetRTPFactor.toFixed(4),
        physicsCoeff: PHYSICS_CALIBRATION_COEFFICIENT,
        finalScalingFactor: finalScalingFactor.toFixed(4),
        multipliers: newMultipliers
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Calculate multipliers based on actual game distribution to achieve target RTP
  // Uses PID-like control with cumulative tracking and gradual adjustments
  const calibrateFromActualData = useCallback(() => {
    const totalGames = totalGamesPlayedRef.current;
    const gamesSinceLastCalibration = totalGames - lastCalibrationGamesRef.current;
    
    if (gamesSinceLastCalibration < 50) {
      setNotification({ 
        message: `Need at least 50 new games since last calibration. You have ${gamesSinceLastCalibration} new games.`, 
        type: 'error' 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    // Calculate actual probability distribution from ALL cumulative games
    const actualProbs: number[] = [];
    const totalWins = binDistributionRef.current.reduce((a, b) => a + b, 0);
    
    if (totalGames === 0 || totalWins === 0) {
      setNotification({ 
        message: 'Cannot calibrate: no wins recorded.', 
        type: 'error' 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }
    
    for (let i = 0; i < multipliers.length; i++) {
      actualProbs.push(binDistributionRef.current[i] / totalGames);
    }

    // Calculate current RTP with actual distribution and current multipliers
    let currentRTP = 0;
    for (let i = 0; i < multipliers.length; i++) {
      currentRTP += actualProbs[i] * multipliers[i];
    }

    // Calculate error (difference from target)
    const error = targetRTP - currentRTP;
    const errorPercent = (error / targetRTP) * 100;

    // PID-like control: Use proportional term with learning rate to prevent oscillation
    // More aggressive learning rate when far from target, conservative when close
    // Formula: learningRate = min(0.8, max(0.2, errorPercent / 50))
    // This means: 20% min, up to 80% max, scales with error
    // At 11% error: ~22% learning rate (was 11%)
    // At 50% error: 80% learning rate
    // At 5% error: 20% learning rate (conservative)
    const learningRate = Math.min(0.8, Math.max(0.2, Math.abs(errorPercent) / 50));
    
    // Calculate desired scale factor
    const desiredScaleFactor = targetRTP / currentRTP;
    
    // Apply learning rate: only adjust by a fraction to prevent oscillation
    // Instead of: newMultiplier = oldMultiplier * desiredScaleFactor
    // We do: newMultiplier = oldMultiplier * (1 + learningRate * (desiredScaleFactor - 1))
    // This makes gradual adjustments
    const adjustmentFactor = 1 + learningRate * (desiredScaleFactor - 1);
    
    // Apply gradual adjustment to multipliers
    const calibratedMultipliers = multipliers.map(m => parseFloat((m * adjustmentFactor).toPrecision(3)));
    setMultipliers(calibratedMultipliers);

    // Record calibration history (keep last 10)
    calibrationHistoryRef.current.push({
      rtp: currentRTP,
      scaleFactor: adjustmentFactor,
      games: gamesSinceLastCalibration
    });
    if (calibrationHistoryRef.current.length > 10) {
      calibrationHistoryRef.current.shift();
    }

    // Update last calibration point
    lastCalibrationGamesRef.current = totalGames;

    // Calculate expected new RTP (approximate)
    const expectedNewRTP = currentRTP * adjustmentFactor;

    setNotification({ 
      message: `Calibrated (${gamesSinceLastCalibration} new games, ${totalGames} total). Current RTP: ${(currentRTP * 100).toFixed(2)}% → Expected: ${(expectedNewRTP * 100).toFixed(2)}% (Target: ${(targetRTP * 100).toFixed(2)}%). Adjustment: ${(adjustmentFactor * 100).toFixed(2)}% (learning rate: ${(learningRate * 100).toFixed(1)}%)`, 
      type: 'success' 
    });
    setTimeout(() => setNotification(null), 8000);
  }, [multipliers, targetRTP]);

  // Force calibration: apply full adjustment instead of gradual (for when close but not quite there)
  const forceCalibrate = useCallback(() => {
    const totalGames = totalGamesPlayedRef.current;
    if (totalGames < 50) {
      setNotification({ 
        message: `Need at least 50 games. You have ${totalGames} games.`, 
        type: 'error' 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    const actualProbs: number[] = [];
    const totalWins = binDistributionRef.current.reduce((a, b) => a + b, 0);
    
    if (totalGames === 0 || totalWins === 0) {
      setNotification({ 
        message: 'Cannot calibrate: no wins recorded.', 
        type: 'error' 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }
    
    for (let i = 0; i < multipliers.length; i++) {
      actualProbs.push(binDistributionRef.current[i] / totalGames);
    }

    let currentRTP = 0;
    for (let i = 0; i < multipliers.length; i++) {
      currentRTP += actualProbs[i] * multipliers[i];
    }

    if (currentRTP === 0) {
      setNotification({ 
        message: 'Cannot calibrate: no wins recorded.', 
        type: 'error' 
      });
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    // Force full adjustment to target
    const scaleFactor = targetRTP / currentRTP;
    const calibratedMultipliers = multipliers.map(m => parseFloat((m * scaleFactor).toPrecision(3)));
    setMultipliers(calibratedMultipliers);

    lastCalibrationGamesRef.current = totalGames;

    setNotification({ 
      message: `Force calibrated (${totalGames} games). RTP: ${(currentRTP * 100).toFixed(2)}% → Target: ${(targetRTP * 100).toFixed(2)}%. Scale: ${(scaleFactor * 100).toFixed(2)}%`, 
      type: 'success' 
    });
    setTimeout(() => setNotification(null), 8000);
  }, [multipliers, targetRTP]);

  // Export calibrated multipliers to constants.ts (dev tool)
  const exportCalibratedMultipliers = useCallback(() => {
    const multiplierString = multipliers.map(m => m.toFixed(3)).join(', ');
    const codeToCopy = `export const CALIBRATED_MULTIPLIERS: number[] = [${multiplierString}];`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setNotification({
        message: `Calibrated multipliers copied to clipboard! Paste into constants.ts:\n\n${codeToCopy}\n\nAfter saving, reload the page to use pre-calibrated multipliers.`,
        type: 'success'
      });
      setTimeout(() => setNotification(null), 12000);
    }).catch(() => {
      // Fallback: show in alert-style notification
      setNotification({
        message: `Copy this to constants.ts:\n\n${codeToCopy}`,
        type: 'info'
      });
      setTimeout(() => setNotification(null), 15000);
    });
  }, [multipliers]);

  // Calculate perfect container height based on width for even row divisions
  // Container = header (vSpacing) + main + footer (vSpacing)
  // Main = space above ball (vSpacing) + ball-to-row0 (vSpacing) + between rows (ROWS-1)*vSpacing + space after last peg (vSpacing) + to bins (vSpacing) = (ROWS+3)*vSpacing
  // So: containerHeight = 2*vSpacing + (ROWS+3)*vSpacing + bottomPadding = (ROWS+5)*vSpacing + bottomPadding
  useEffect(() => {
    const updateContainer = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const binCount = multipliers.length;
      const hSpacing = width / binCount;
      const bottomPadding = hSpacing;
      
      const screenHeight = window.innerHeight;
      const totalSpacings = ROWS + 5; // header + above ball + between rows + after last peg + to bins + footer
      
      // Calculate vSpacing that fits screen
      const estimatedVSpacing = (screenHeight - bottomPadding) / totalSpacings;
      
      // Calculate perfect container height (must be exactly divisible)
      const perfectHeight = estimatedVSpacing * totalSpacings + bottomPadding;
      
      // Constrain to screen but keep perfect division
      const finalHeight = Math.min(perfectHeight, screenHeight);
      const finalVSpacing = (finalHeight - bottomPadding) / totalSpacings;
      
      setContainerHeight(finalHeight);
      setRowSpacing(finalVSpacing);
    };
    
    // Wait for container to be rendered
    const timeoutId = setTimeout(updateContainer, 0);
    window.addEventListener('resize', updateContainer);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateContainer);
    };
  }, [multipliers]);

  const handlePlay = useCallback(() => {
    if (balance < BET_AMOUNT) {
      return;
    }
    setLastPayout(null); // Clear payout display when starting new play
    setBalance(prev => prev - BET_AMOUNT);
    setPlayTrigger(prev => prev + 1);
  }, [balance]);

  // Calculate expected distribution (binomial)
  const getExpectedDistribution = useCallback((): number[] => {
    return calculateBinProbabilities(multipliers.length);
  }, [multipliers.length, calculateBinProbabilities]);

  // Disabled auto-calibration - gravity changes affect physics and break RTP
  // Multipliers are auto-calibrated on mount using PHYSICS_CALIBRATION_COEFFICIENT
  const calibrateGravity = useCallback(() => {
    // Auto-calibration disabled - keeping gravity stable at 0.1
  }, []);

  const handleGameEnd = useCallback((finalBinIndex: number) => {
    const isLoss = finalBinIndex === -1;
    const multiplier = isLoss ? 0 : multipliers[finalBinIndex];
    const payout = BET_AMOUNT * multiplier;
    const profit = payout - BET_AMOUNT;

    // Track distribution for calibration
    if (isLoss) {
      totalLossesRef.current++;
    } else if (finalBinIndex >= 0 && finalBinIndex < multipliers.length) {
      binDistributionRef.current[finalBinIndex]++;
    }

    // Track all games and total payout for accurate RTP calculation
    totalGamesPlayedRef.current++;
    totalPayoutRef.current += payout;

    setBalance(prev => prev + payout);
    const newResult: GameResult = {
      id: Date.now() + Math.random(),
      multiplier,
      payout,
      profit,
    };
    // Store all games in history (no limit)
    setHistory(prev => [newResult, ...prev]);
    setLastPayout({ payout, key: Date.now() });
  }, [multipliers, calibrateGravity]);
  
  const runSimulation = (simMultipliers: number[], runs: number) => {
    let totalPayout = 0;
    const binCount = simMultipliers.length;
    for (let i = 0; i < runs; i++) {
        let position = (binCount - 1) / 2;
        for (let j = 0; j < ROWS; j++) {
            position += Math.random() < 0.5 ? -0.5 : 0.5;
        }
        const finalBinIndex = Math.max(0, Math.min(binCount - 1, Math.round(position)));
        totalPayout += simMultipliers[finalBinIndex];
    }
    return totalPayout / runs;
  }

  const handleSimulate = useCallback(async () => {
    setIsCalculating(true);
    
    // Show actual game history RTP if available - use all games played, not just history array
    let actualHistoryRTP: number | null = null;
    const totalGamesPlayed = totalGamesPlayedRef.current;
    if (totalGamesPlayed > 0) {
      actualHistoryRTP = totalPayoutRef.current / totalGamesPlayed;
    }
    
    setSimulationResult('Running simulations...\nThis may take a moment...');
    
    // Run simulations - track both bin indices and payouts
    const binIndices: number[] = [];
    const simulationPayouts: number[] = [];
    const binCount = multipliers.length;
    
    // Simulate 200 games for better accuracy
    for (let i = 0; i < 200; i++) {
      let position = (binCount - 1) / 2;
      for (let j = 0; j < ROWS; j++) {
        position += Math.random() < 0.5 ? -0.5 : 0.5;
      }
      const finalBinIndex = Math.max(0, Math.min(binCount - 1, Math.round(position)));
      binIndices.push(finalBinIndex);
      simulationPayouts.push(multipliers[finalBinIndex]);
    }
    
    // Calculate RTP from simulation results
    const totalPayout = simulationPayouts.reduce((sum, payout) => sum + payout, 0);
    const simulationRTP = totalPayout / 200;
    const houseEdge = (1 - simulationRTP) * 100;
    
    // Count bin distribution
    const binCounts = new Array(binCount).fill(0);
    binIndices.forEach(binIdx => {
      binCounts[binIdx]++;
    });
    
    // Compare with theoretical
    const theoreticalEV = calculateExpectedValue(multipliers);
    const theoreticalRTP = theoreticalEV;
    
    let resultText = `=== RTP ANALYSIS ===\n\n`;
    
    if (actualHistoryRTP !== null) {
      resultText += `🎯 ACTUAL GAME RTP (${totalGamesPlayed} games): ${(actualHistoryRTP * 100).toFixed(2)}%\n`;
      resultText += `   This is REAL data from your games!\n\n`;
    }
    
    resultText += `📊 Simulation RTP (200 games): ${(simulationRTP * 100).toFixed(2)}%\n`;
    resultText += `📐 Theoretical RTP (math): ${(theoreticalRTP * 100).toFixed(2)}%\n`;
    resultText += `📉 Difference: ${((simulationRTP - theoreticalRTP) * 100).toFixed(2)}%\n`;
    resultText += `💰 House Edge: ${houseEdge.toFixed(2)}%\n\n`;
    
    if (actualHistoryRTP !== null) {
      const diffFromActual = ((simulationRTP - actualHistoryRTP) * 100);
      resultText += `⚠️  Simulation vs Actual: ${diffFromActual > 0 ? '+' : ''}${diffFromActual.toFixed(2)}%\n`;
      resultText += `   (Simulation may not match physics exactly)\n\n`;
    }
    
    resultText += `Bin Distribution (from simulation):\n`;
    binCounts.forEach((count, i) => {
      const percentage = (count / 200) * 100;
      resultText += `Bin ${i}: ${count} games (${percentage.toFixed(1)}%) → ${multipliers[i]}x\n`;
    });
    
    if (totalGamesPlayed >= 50 && actualHistoryRTP !== null) {
      // Calculate actual bin probabilities
      const actualProbs: number[] = [];
      const totalWins = binDistributionRef.current.reduce((a, b) => a + b, 0);
      for (let i = 0; i < multipliers.length; i++) {
        actualProbs.push(binDistributionRef.current[i] / totalGamesPlayed);
      }
      
      // Calculate what RTP would be with current multipliers and actual distribution
      let actualRTPWithCurrentMultipliers = 0;
      for (let i = 0; i < multipliers.length; i++) {
        actualRTPWithCurrentMultipliers += actualProbs[i] * multipliers[i];
      }
      
      const error = targetRTP - actualRTPWithCurrentMultipliers;
      const errorPercent = (error / targetRTP) * 100;
      
      resultText += `\n\n🔧 CALIBRATION INFO (Cumulative):\n`;
      resultText += `   Total Games: ${totalGamesPlayed} (${totalGamesPlayed - lastCalibrationGamesRef.current} since last calibration)\n`;
      resultText += `   Current RTP (actual games): ${(actualHistoryRTP * 100).toFixed(2)}%\n`;
      resultText += `   Current RTP (with actual distribution): ${(actualRTPWithCurrentMultipliers * 100).toFixed(2)}%\n`;
      resultText += `   Target RTP: ${(targetRTP * 100).toFixed(2)}%\n`;
      resultText += `   Error: ${errorPercent > 0 ? '+' : ''}${errorPercent.toFixed(2)}%\n\n`;
      
      if (calibrationHistoryRef.current.length > 0) {
        resultText += `   Calibration History (last ${calibrationHistoryRef.current.length}):\n`;
        calibrationHistoryRef.current.slice(-5).forEach((cal, idx) => {
          resultText += `     ${idx + 1}. RTP: ${(cal.rtp * 100).toFixed(2)}%, Scale: ${(cal.scaleFactor * 100).toFixed(2)}%, Games: ${cal.games}\n`;
        });
      }
      
      resultText += `\n   Actual Bin Distribution (cumulative):\n`;
      actualProbs.forEach((prob, i) => {
        resultText += `     Bin ${i}: ${(prob * 100).toFixed(1)}% (${binDistributionRef.current[i]} games)\n`;
      });
    } else if (totalGamesPlayed < 50) {
      resultText += `\n💡 Tip: Play 50+ games to see calibration recommendations.`;
    }
    
    setSimulationResult(resultText);
    setIsCalculating(false);
  }, [multipliers, calculateExpectedValue, targetRTP]);
  


  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center">
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-b from-gray-800 to-black shadow-2xl flex flex-col overflow-hidden w-full"
        style={{ 
          height: containerHeight || '100vh',
          maxHeight: '100vh'
        }}
      >
        
        <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
           {lastPayout && (
              <span key={lastPayout.key} className="font-mono text-4xl font-bold" style={{ color: '#3e9c35' }}>
                +${lastPayout.payout.toFixed(2)}
              </span>
            )}
        </div>

        {notification && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto max-w-md w-full px-4">
            <div 
              className={`p-4 rounded-lg shadow-lg border-2 ${
                notification.type === 'success' 
                  ? 'bg-green-900/95 border-green-600 text-green-100' 
                  : notification.type === 'error'
                  ? 'bg-red-900/95 border-red-600 text-red-100'
                  : 'bg-blue-900/95 border-blue-600 text-blue-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium flex-1">{notification.message}</p>
                <button 
                  onClick={() => setNotification(null)}
                  className="ml-4 text-lg leading-none opacity-70 hover:opacity-100"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
        
        <header 
          className="absolute top-0 left-0 right-0 px-4 flex justify-between items-center z-20"
          style={{ height: rowSpacing || 'auto', paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem', paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem' }}
        >
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)} 
            className="w-8 h-8 flex items-center justify-center bg-gray-700/50 hover:bg-gray-700/80 text-white rounded transition-colors"
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button onClick={() => setIsDevToolsVisible(true)} className="bg-purple-700/50 hover:bg-purple-700/80 text-white font-semibold py-1 px-2 rounded-lg text-xs transition-colors">
            Dev Tools
          </button>
        </header>

        <main ref={mainRef} className="flex-grow" style={{ paddingTop: rowSpacing || 0 }}>
           <PlinkoBoard 
              multipliers={multipliers}
              playTrigger={playTrigger}
              onGameEnd={handleGameEnd}
              gravity={gravity}
              onPegHit={playPegSound}
          />
        </main>
        
        <footer 
          className="px-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center"
          style={{ height: rowSpacing || 'auto', paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem', paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem' }}
        >
            <button
                onClick={handlePlay}
                disabled={balance < BET_AMOUNT}
                className="w-full text-gray-900 font-bold py-3 rounded-md text-lg uppercase transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:shadow-none"
                style={{
                    background: balance < BET_AMOUNT ? 'linear-gradient(to right, #4b5563, #374151)' : 'linear-gradient(to right, #168118, #157811)',
                    boxShadow: balance < BET_AMOUNT ? 'none' : '0 0 5px #168118, 0 0 10px #168118'
                }}
                onMouseEnter={(e) => {
                    if (balance >= BET_AMOUNT) {
                        e.currentTarget.style.background = 'linear-gradient(to right, #3e9c35, #168118)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (balance >= BET_AMOUNT) {
                        e.currentTarget.style.background = 'linear-gradient(to right, #168118, #157811)';
                    }
                }}
            >
                PLAY
            </button>
        </footer>

        {isDevToolsVisible && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4 overflow-y-auto" onClick={() => setIsDevToolsVisible(false)}>
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl flex flex-col max-h-[95vh] my-auto" onClick={e => e.stopPropagation()}>
                    <div className="p-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0 sticky top-0 bg-gray-800 z-10">
                        <h3 className="text-lg font-semibold text-white">Dashboard</h3>
                        <button onClick={() => setIsDevToolsVisible(false)} className="text-gray-400 hover:text-white text-2xl leading-none font-bold">&times;</button>
                    </div>
                    
                    <div className="flex border-b border-gray-700 flex-shrink-0 bg-gray-800">
                        <button onClick={() => setDevToolsTab('devtools')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'devtools' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`} style={devToolsTab === 'devtools' ? { color: '#3e9c35', borderColor: '#3e9c35' } : {}}>Dev Tools</button>
                        <button onClick={() => setDevToolsTab('balance')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'balance' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`} style={devToolsTab === 'balance' ? { color: '#3e9c35', borderColor: '#3e9c35' } : {}}>Balance</button>
                        <button onClick={() => setDevToolsTab('history')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'history' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`} style={devToolsTab === 'history' ? { color: '#3e9c35', borderColor: '#3e9c35' } : {}}>History</button>
                    </div>
                    
                    <div className="overflow-y-auto flex-1 min-h-0">

                    {devToolsTab === 'devtools' && (
                        <div className="p-4 space-y-4">
                            <div className="bg-gray-900/70 p-3 rounded-md space-y-3">
                                <h4 className="font-semibold text-base text-white">Gravity Calibration</h4>
                                <div>
                                    <label className="flex justify-between text-sm text-gray-300">
                                      <span>Current Gravity</span>
                                      <span className="font-mono" style={{ color: '#3e9c35' }}>{gravity.toFixed(3)}</span>
                                    </label>
                                    <div className="mt-2 text-xs text-gray-400">
                                      Distribution: {binDistributionRef.current.reduce((a, b) => a + b, 0)} games tracked
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-900/70 p-3 rounded-md space-y-3">
                                <h4 className="font-semibold text-base text-white">RTP Analysis</h4>
                                <p className="text-xs text-gray-400">
                                    Check actual RTP from game history and simulations. Multipliers are auto-calibrated on load.
                                </p>
                                <button onClick={handleSimulate} disabled={isCalculating} className="w-full text-white px-4 py-2 rounded transition-colors disabled:bg-gray-600 mb-2" style={{ backgroundColor: 'rgba(22, 129, 24, 0.8)' }} onMouseEnter={(e) => !isCalculating && (e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 1)')} onMouseLeave={(e) => !isCalculating && (e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 0.8)')}>
                                    {isCalculating ? 'Calculating...' : 'Check Current RTP'}
                                </button>
                                <button 
                                    onClick={calibrateFromActualData} 
                                    disabled={(totalGamesPlayedRef.current - lastCalibrationGamesRef.current) < 50}
                                    className="w-full text-white px-4 py-2 rounded transition-colors disabled:bg-gray-600 disabled:text-gray-400" 
                                    style={{ backgroundColor: (totalGamesPlayedRef.current - lastCalibrationGamesRef.current) >= 50 ? 'rgba(139, 69, 19, 0.8)' : 'rgba(75, 75, 75, 0.8)' }} 
                                    onMouseEnter={(e) => (totalGamesPlayedRef.current - lastCalibrationGamesRef.current) >= 50 && !isCalculating && (e.currentTarget.style.backgroundColor = 'rgba(139, 69, 19, 1)')} 
                                    onMouseLeave={(e) => (totalGamesPlayedRef.current - lastCalibrationGamesRef.current) >= 50 && (e.currentTarget.style.backgroundColor = 'rgba(139, 69, 19, 0.8)')}
                                >
                                    {(totalGamesPlayedRef.current - lastCalibrationGamesRef.current) >= 50 
                                      ? `Calibrate (${totalGamesPlayedRef.current - lastCalibrationGamesRef.current} new games, ${totalGamesPlayedRef.current} total)` 
                                      : `Need 50+ new games (${totalGamesPlayedRef.current - lastCalibrationGamesRef.current} new, ${totalGamesPlayedRef.current} total)`}
                                </button>
                                <button 
                                    onClick={forceCalibrate}
                                    disabled={totalGamesPlayedRef.current < 50}
                                    className="w-full text-white px-4 py-2 rounded transition-colors mt-2 disabled:bg-gray-600 disabled:text-gray-400" 
                                    style={{ backgroundColor: totalGamesPlayedRef.current >= 50 ? 'rgba(220, 38, 38, 0.8)' : 'rgba(75, 75, 75, 0.8)' }} 
                                    onMouseEnter={(e) => totalGamesPlayedRef.current >= 50 && (e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 1)')} 
                                    onMouseLeave={(e) => totalGamesPlayedRef.current >= 50 && (e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.8)')}
                                >
                                    ⚡ Force Calibrate (Full Adjustment to 95%)
                                </button>
                                <button 
                                    onClick={exportCalibratedMultipliers}
                                    className="w-full text-white px-4 py-2 rounded transition-colors mt-2" 
                                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.8)' }} 
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 1)')} 
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.8)')}
                                >
                                    📋 Save Calibrated Multipliers to constants.ts
                                </button>
                                {CALIBRATED_MULTIPLIERS.length > 0 && (
                                    <div className="mt-2 p-2 bg-green-900/30 border border-green-700/50 rounded text-xs text-green-200">
                                        <strong>✅ Pre-calibrated:</strong> Using calibrated multipliers from constants.ts. Game is ready to ship!
                                    </div>
                                )}
                                {totalGamesPlayedRef.current >= 50 && (
                                    <div className="mt-2 p-2 bg-blue-900/30 border border-blue-700/50 rounded text-xs text-blue-200">
                                        <strong>💡 Dev Calibration:</strong> Play 200+ games, calibrate until RTP is ~95%, then click "Save Calibrated Multipliers" to export. The game will ship pre-calibrated!
                                    </div>
                                )}
                            </div>
                            {simulationResult && (
                                <div className="bg-gray-900 p-3 rounded mt-2">
                                    <pre className="text-xs text-white whitespace-pre-wrap font-mono">{simulationResult}</pre>
                                </div>
                            )}
                        </div>
                    )}
                    {devToolsTab === 'balance' && (
                        <div className="p-4 text-center">
                            <span className="text-sm text-gray-400">Current Balance</span>
                            <p className="font-mono text-3xl mt-1">${balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                    )}
                    {devToolsTab === 'history' && (
                        <HistoryTable 
                            history={history} 
                            totalGames={totalGamesPlayedRef.current}
                            totalPayout={totalPayoutRef.current}
                        />
                    )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default App;