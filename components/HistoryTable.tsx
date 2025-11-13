import React, { useMemo } from 'react';
import { GameResult } from '../types';

interface HistoryTableProps {
  history: GameResult[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  const stats = useMemo(() => {
    if (history.length === 0) {
      return {
        totalGames: 0,
        totalPayout: 0,
        totalBets: 0,
        actualEV: 0,
        actualRTP: 0,
        totalProfit: 0,
      };
    }

    const totalGames = history.length;
    const totalPayout = history.reduce((sum, result) => sum + result.payout, 0);
    const totalBets = totalGames; // Each game costs 1
    const totalProfit = history.reduce((sum, result) => sum + result.profit, 0);
    const actualEV = totalPayout / totalGames; // Average payout per game
    const actualRTP = totalPayout / totalBets; // Return to player percentage

    return {
      totalGames,
      totalPayout,
      totalBets,
      actualEV,
      actualRTP,
      totalProfit,
    };
  }, [history]);

  return (
    <div className="p-4 space-y-4">
      {history.length > 0 && (
        <div className="bg-gray-900/70 p-3 rounded-md space-y-2">
          <h4 className="font-semibold text-base text-white mb-3">Actual Statistics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Total Games:</span>
              <span className="font-mono text-white">{stats.totalGames}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Total Bets:</span>
              <span className="font-mono text-white">${stats.totalBets.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Total Payout:</span>
              <span className="font-mono text-white">${stats.totalPayout.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Total Profit:</span>
              <span className="font-mono font-semibold" style={{ color: stats.totalProfit >= 0 ? '#3e9c35' : '#ef4444' }}>
                {stats.totalProfit >= 0 ? '+' : '-'}${Math.abs(stats.totalProfit).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-2">
              <div className="flex justify-between text-gray-300">
                <span>Actual EV (Avg Payout):</span>
                <span className="font-mono" style={{ color: '#3e9c35' }}>{stats.actualEV.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-gray-300 mt-1">
                <span>Actual RTP:</span>
                <span className="font-mono" style={{ color: '#3e9c35' }}>{(stats.actualRTP * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-y-auto max-h-[60vh]">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700/50 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-2 font-mono">Multiplier</th>
              <th scope="col" className="px-4 py-2 font-mono">Payout</th>
              <th scope="col" className="px-4 py-2 font-mono text-right">Profit</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 && (
              <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-500">No games played yet.</td>
              </tr>
            )}
            {history.map(result => (
              <tr key={result.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="px-4 py-2 font-mono">{result.multiplier.toFixed(2)}x</td>
                <td className="px-4 py-2 font-mono">${result.payout.toFixed(2)}</td>
                <td className="px-4 py-2 font-mono text-right font-semibold" style={{ color: result.profit >= 0 ? '#3e9c35' : '#ef4444' }}>
                  {result.profit >= 0 ? '+' : '-'}${Math.abs(result.profit).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
