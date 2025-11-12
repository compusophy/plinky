export enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface GameResult {
  id: number;
  multiplier: number;
  payout: number;
  profit: number;
}
