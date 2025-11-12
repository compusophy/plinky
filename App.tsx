import React, { useState, useCallback, useEffect } from 'react';
import PlinkoBoard from './components/PlinkoBoard';
import HistoryTable from './components/HistoryTable';
import { RiskLevel, GameResult } from './types';
import { BASE_MULTIPLIERS, ROWS } from './constants';

type DevToolsTab = 'devtools' | 'balance' | 'history';
type GameState = 'ready' | 'dropping' | 'finished';

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(RiskLevel.Medium);
  const [multipliers, setMultipliers] = useState<number[]>(BASE_MULTIPLIERS[riskLevel]);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [playTrigger, setPlayTrigger] = useState(0);
  const [isDevToolsVisible, setIsDevToolsVisible] = useState(false);
  const [devToolsTab, setDevToolsTab] = useState<DevToolsTab>('devtools');
  const [lastPayout, setLastPayout] = useState<{ payout: number; key: number } | null>(null);
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [targetRTP, setTargetRTP] = useState(0.97);
  const [isCalculating, setIsCalculating] = useState(false);

  const BET_AMOUNT = 1;

  useEffect(() => {
    setMultipliers(BASE_MULTIPLIERS[riskLevel]);
    setSimulationResult(null);
  }, [riskLevel]);

  const handlePlay = useCallback(() => {
    if (gameState === 'dropping' || balance < BET_AMOUNT) {
      return;
    }
    setGameState('dropping');
    setLastPayout(null);
    setBalance(prev => prev - BET_AMOUNT);
    setPlayTrigger(prev => prev + 1);
  }, [balance, gameState]);

  const handleGameEnd = useCallback((finalBinIndex: number) => {
    const isLoss = finalBinIndex === -1;
    const multiplier = isLoss ? 0 : multipliers[finalBinIndex];
    const payout = BET_AMOUNT * multiplier;
    const profit = payout - BET_AMOUNT;

    setBalance(prev => prev + payout);
    const newResult: GameResult = {
      id: Date.now() + Math.random(),
      multiplier,
      payout,
      profit,
    };
    setHistory(prev => [newResult, ...prev.slice(0, 14)]);
    setLastPayout({ payout, key: Date.now() });
    setGameState('finished');
  }, [multipliers]);
  
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
    const ev = runSimulation(multipliers, 100);
    const houseEdge = (1 - ev) * 100;
    const resultText = `Expected Value (EV): ${ev.toFixed(4)}\nReturn to Player (RTP): ${(ev * 100).toFixed(2)}%\nHouse Edge: ${houseEdge.toFixed(2)}%`;
    setSimulationResult(resultText);
  }, [multipliers]);
  
  const handleRecalculateMultipliers = useCallback(() => {
    setIsCalculating(true);
    setTimeout(() => {
        const baseMultipliers = BASE_MULTIPLIERS[riskLevel];
        const baseEV = runSimulation(baseMultipliers, 10000);
        const scalingFactor = targetRTP / baseEV;
        const newMultipliers = baseMultipliers.map(m => parseFloat((m * scalingFactor).toPrecision(3)));
        setMultipliers(newMultipliers);
        
        const finalEV = runSimulation(newMultipliers, 10000);
        const houseEdge = (1 - finalEV) * 100;
        const resultText = `Target RTP: ${(targetRTP * 100).toFixed(2)}%\n---\nActual RTP: ${(finalEV * 100).toFixed(2)}%\nHouse Edge: ${houseEdge.toFixed(2)}%`;
        setSimulationResult(resultText);
        setIsCalculating(false);
    }, 50);
  }, [riskLevel, targetRTP]);


  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center selection:bg-teal-400 selection:text-black">
      <div className="relative h-screen aspect-[9/16] bg-gradient-to-b from-gray-800 to-black shadow-2xl flex flex-col overflow-hidden">
        
        <div className="absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
           {lastPayout && (
              <span key={lastPayout.key} className={`font-mono text-4xl font-bold text-green-400`}>
                +${lastPayout.payout.toFixed(2)}
              </span>
            )}
        </div>
        
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-end items-start z-20">
          <button onClick={() => setIsDevToolsVisible(true)} className="bg-purple-700/50 hover:bg-purple-700/80 text-white font-semibold py-1 px-2 rounded-lg text-xs transition-colors">
            Dev Tools
          </button>
        </header>

        <main className="flex-grow pt-16 pb-20">
           <PlinkoBoard 
              multipliers={multipliers}
              playTrigger={playTrigger}
              onGameEnd={handleGameEnd}
          />
        </main>
        
        <footer className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center">
            <button
                onClick={handlePlay}
                disabled={gameState === 'dropping' || balance < BET_AMOUNT}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-gray-900 font-bold py-3 rounded-md text-lg uppercase hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400"
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
                        <button onClick={() => setDevToolsTab('devtools')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'devtools' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-gray-200'}`}>Dev Tools</button>
                        <button onClick={() => setDevToolsTab('balance')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'balance' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-gray-200'}`}>Balance</button>
                        <button onClick={() => setDevToolsTab('history')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'history' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-gray-200'}`}>History</button>
                    </div>

                    {devToolsTab === 'devtools' && (
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="text-sm text-gray-400">Risk Level</label>
                                <div className="grid grid-cols-3 gap-2 mt-1 bg-gray-900/70 p-1 rounded-md">
                                    {(Object.values(RiskLevel)).map(level => (
                                        <button
                                            key={level}
                                            onClick={() => setRiskLevel(level)}
                                            className={`py-1 rounded text-sm font-semibold transition-all duration-200 ${riskLevel === level ? 'bg-teal-500 text-gray-900' : 'bg-transparent hover:bg-gray-700 text-white'}`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-900/70 p-3 rounded-md space-y-3">
                                <h4 className="font-semibold text-base text-white">Game Economy</h4>
                                <div>
                                    <label htmlFor="rtp-slider" className="flex justify-between text-sm text-gray-300">
                                      <span>Target RTP</span>
                                      <span className="font-mono text-teal-400">{(targetRTP * 100).toFixed(1)}%</span>
                                    </label>
                                    <input id="rtp-slider" type="range" min="0.90" max="1.00" step="0.005" value={targetRTP} onChange={(e) => setTargetRTP(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-teal-500 mt-1" />
                                </div>
                                <button onClick={handleRecalculateMultipliers} disabled={isCalculating} className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition-colors disabled:bg-gray-600">
                                    {isCalculating ? 'Calculating...' : 'Recalculate Multipliers'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">
                                Simulate 100 runs with the current multipliers to see the approximate RTP.
                            </p>
                            <button onClick={handleSimulate} className="w-full bg-teal-500/80 text-white px-4 py-2 rounded hover:bg-teal-500/100 transition-colors">
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