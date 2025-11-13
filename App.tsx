'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import PlinkoBoard from './components/PlinkoBoard';
import HistoryTable from './components/HistoryTable';
import { GameResult } from './types';
import { MULTIPLIERS, ROWS } from './constants';

type DevToolsTab = 'devtools' | 'balance' | 'history';

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [multipliers, setMultipliers] = useState<number[]>(MULTIPLIERS);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [playTrigger, setPlayTrigger] = useState(0);
  const [isBallInPlay, setIsBallInPlay] = useState<boolean>(false);
  const [isDevToolsVisible, setIsDevToolsVisible] = useState(false);
  const [devToolsTab, setDevToolsTab] = useState<DevToolsTab>('devtools');
  const [lastPayout, setLastPayout] = useState<{ payout: number; key: number } | null>(null);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [targetRTP, setTargetRTP] = useState(0.95);
  const [isCalculating, setIsCalculating] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rowSpacing, setRowSpacing] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  
  // Gravity calibration state
  const [gravity, setGravity] = useState<number>(0.1);
  const binDistributionRef = useRef<number[]>([]);
  const calibrationHistoryRef = useRef<number[]>([]);

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

  // Initialize bin distribution tracking
  useEffect(() => {
    binDistributionRef.current = new Array(multipliers.length).fill(0);
  }, [multipliers.length]);

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
    if (balance < BET_AMOUNT || isBallInPlay) {
      return;
    }
    setIsBallInPlay(true);
    setLastPayout(null); // Clear payout display when starting new play
    setBalance(prev => prev - BET_AMOUNT);
    setPlayTrigger(prev => prev + 1);
  }, [balance, isBallInPlay]);

  // Calculate expected distribution (binomial)
  const getExpectedDistribution = useCallback((): number[] => {
    return calculateBinProbabilities(multipliers.length);
  }, [multipliers.length, calculateBinProbabilities]);

  // PID-like gravity calibration
  const calibrateGravity = useCallback(() => {
    const totalGames = binDistributionRef.current.reduce((a, b) => a + b, 0);
    if (totalGames < 20) return; // Need at least 20 games for calibration
    
    const expectedDist = getExpectedDistribution();
    const actualDist = binDistributionRef.current.map(count => count / totalGames);
    
    // Calculate error: how much the distribution is skewed toward center
    // If balls cluster in center, gravity is too low
    const centerBins = [3, 4]; // Indices of center bins (0.58x)
    const edgeBins = [0, 1, 6, 7]; // Indices of edge bins
    
    let centerError = 0;
    let edgeError = 0;
    
    centerBins.forEach(i => {
      centerError += actualDist[i] - expectedDist[i];
    });
    
    edgeBins.forEach(i => {
      edgeError += expectedDist[i] - actualDist[i];
    });
    
    // If too many balls in center, increase gravity
    // If too many balls at edges, decrease gravity
    const error = centerError - edgeError;
    
    // PID controller parameters
    const Kp = 0.5; // Proportional gain
    const Ki = 0.1; // Integral gain
    const Kd = 0.05; // Derivative gain
    
    // Store error history for integral and derivative terms
    calibrationHistoryRef.current.push(error);
    if (calibrationHistoryRef.current.length > 10) {
      calibrationHistoryRef.current.shift();
    }
    
    const integral = calibrationHistoryRef.current.reduce((a, b) => a + b, 0);
    const derivative = calibrationHistoryRef.current.length > 1 
      ? error - calibrationHistoryRef.current[calibrationHistoryRef.current.length - 2]
      : 0;
    
    const adjustment = Kp * error + Ki * integral + Kd * derivative;
    
    // Update gravity (clamp between 0.01 and 0.5)
    const newGravity = Math.max(0.01, Math.min(0.5, gravity + adjustment * 0.01));
    setGravity(newGravity);
    
    // Reset distribution every 50 games for continuous calibration
    if (totalGames >= 50) {
      binDistributionRef.current = new Array(multipliers.length).fill(0);
    }
  }, [gravity, multipliers.length, getExpectedDistribution]);

  const handleGameEnd = useCallback((finalBinIndex: number) => {
    const isLoss = finalBinIndex === -1;
    const multiplier = isLoss ? 0 : multipliers[finalBinIndex];
    const payout = BET_AMOUNT * multiplier;
    const profit = payout - BET_AMOUNT;

    // Track distribution for gravity calibration
    if (!isLoss && finalBinIndex >= 0 && finalBinIndex < multipliers.length) {
      binDistributionRef.current[finalBinIndex]++;
      calibrateGravity();
    }

    setBalance(prev => prev + payout);
    const newResult: GameResult = {
      id: Date.now() + Math.random(),
      multiplier,
      payout,
      profit,
    };
    setHistory(prev => [newResult, ...prev.slice(0, 14)]);
    setLastPayout({ payout, key: Date.now() });
    setIsBallInPlay(false); // Re-enable button when game ends
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

  const handleSimulate = useCallback(() => {
    // Use deterministic calculation for exact EV
    const ev = calculateExpectedValue(multipliers);
    const houseEdge = (1 - ev) * 100;
    const probabilities = calculateBinProbabilities(multipliers.length);
    
    let probText = 'Bin Probabilities:\n';
    probabilities.forEach((prob, i) => {
      probText += `Bin ${i}: ${(prob * 100).toFixed(2)}% (${multipliers[i]}x)\n`;
    });
    
    const resultText = `Expected Value (EV): ${ev.toFixed(4)}\nReturn to Player (RTP): ${(ev * 100).toFixed(2)}%\nHouse Edge: ${houseEdge.toFixed(2)}%\n\n${probText}`;
    setSimulationResult(resultText);
  }, [multipliers, calculateExpectedValue, calculateBinProbabilities]);
  
  const handleRecalculateMultipliers = useCallback(() => {
    setIsCalculating(true);
    setTimeout(() => {
        const baseEV = calculateExpectedValue(multipliers);
        if (baseEV === 0) {
          setSimulationResult('Error: Cannot calculate RTP. Check probability calculation.');
          setIsCalculating(false);
          return;
        }
        const scalingFactor = targetRTP / baseEV;
        const newMultipliers = multipliers.map(m => parseFloat((m * scalingFactor).toPrecision(3)));
        setMultipliers(newMultipliers);
        
        const finalEV = calculateExpectedValue(newMultipliers);
        const houseEdge = (1 - finalEV) * 100;
        const resultText = `Target RTP: ${(targetRTP * 100).toFixed(2)}%\n---\nActual RTP: ${(finalEV * 100).toFixed(2)}%\nHouse Edge: ${houseEdge.toFixed(2)}%\n\nNew Multipliers:\n${newMultipliers.map((m, i) => `Bin ${i}: ${m.toFixed(2)}x`).join('\n')}`;
        setSimulationResult(resultText);
        setIsCalculating(false);
    }, 50);
  }, [multipliers, targetRTP, calculateExpectedValue]);


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
        
        <header 
          className="absolute top-0 left-0 right-0 px-4 flex justify-end items-center z-20"
          style={{ height: rowSpacing || 'auto', paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem', paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem' }}
        >
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
          />
        </main>
        
        <footer 
          className="px-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center"
          style={{ height: rowSpacing || 'auto', paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem', paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem' }}
        >
            <button
                onClick={handlePlay}
                disabled={balance < BET_AMOUNT || isBallInPlay}
                className="w-full text-gray-900 font-bold py-3 rounded-md text-lg uppercase transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:shadow-none"
                style={{
                    background: (balance < BET_AMOUNT || isBallInPlay) ? 'linear-gradient(to right, #4b5563, #374151)' : 'linear-gradient(to right, #168118, #157811)',
                    boxShadow: (balance < BET_AMOUNT || isBallInPlay) ? 'none' : '0 0 5px #168118, 0 0 10px #168118'
                }}
                onMouseEnter={(e) => {
                    if (balance >= BET_AMOUNT && !isBallInPlay) {
                        e.currentTarget.style.background = 'linear-gradient(to right, #3e9c35, #168118)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (balance >= BET_AMOUNT && !isBallInPlay) {
                        e.currentTarget.style.background = 'linear-gradient(to right, #168118, #157811)';
                    }
                }}
            >
                PLAY
            </button>
        </footer>

        {isDevToolsVisible && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={() => setIsDevToolsVisible(false)}>
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
                    <div className="p-4 flex justify-between items-center border-b border-gray-700">
                        <h3 className="text-lg font-semibold text-white">Dashboard</h3>
                        <button onClick={() => setIsDevToolsVisible(false)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                    </div>
                    
                    <div className="flex border-b border-gray-700">
                        <button onClick={() => setDevToolsTab('devtools')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'devtools' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`} style={devToolsTab === 'devtools' ? { color: '#3e9c35', borderColor: '#3e9c35' } : {}}>Dev Tools</button>
                        <button onClick={() => setDevToolsTab('balance')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'balance' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`} style={devToolsTab === 'balance' ? { color: '#3e9c35', borderColor: '#3e9c35' } : {}}>Balance</button>
                        <button onClick={() => setDevToolsTab('history')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'history' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`} style={devToolsTab === 'history' ? { color: '#3e9c35', borderColor: '#3e9c35' } : {}}>History</button>
                    </div>

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
                                <h4 className="font-semibold text-base text-white">Game Economy</h4>
                                <div>
                                    <label htmlFor="rtp-slider" className="flex justify-between text-sm text-gray-300">
                                      <span>Target RTP</span>
                                      <span className="font-mono" style={{ color: '#3e9c35' }}>{(targetRTP * 100).toFixed(1)}%</span>
                                    </label>
                                    <input id="rtp-slider" type="range" min="0.90" max="1.00" step="0.005" value={targetRTP} onChange={(e) => setTargetRTP(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg mt-1"
                                        style={{ accentColor: '#168118' }} />
                                </div>
                                <button onClick={handleRecalculateMultipliers} disabled={isCalculating} className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition-colors disabled:bg-gray-600">
                                    {isCalculating ? 'Calculating...' : 'Calibrate Multipliers'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">
                                Simulate 100 runs with the current multipliers to see the approximate RTP.
                            </p>
                            <button onClick={handleSimulate} className="w-full text-white px-4 py-2 rounded transition-colors" style={{ backgroundColor: 'rgba(22, 129, 24, 0.8)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 0.8)'}>
                                Check Current RTP
                            </button>
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
                        <HistoryTable history={history} />
                    )}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default App;