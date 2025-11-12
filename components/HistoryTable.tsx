import React from 'react';
import { GameResult } from '../types';

interface HistoryTableProps {
  history: GameResult[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  return (
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
              <td className={`px-4 py-2 font-mono text-right font-semibold ${result.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {result.profit >= 0 ? '+' : ''}${result.profit.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
