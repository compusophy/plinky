export const ROWS = 7;

export const MULTIPLIERS = [
  3.7, 2.1, 1.05, 0.58, 0.58, 1.05, 2.1, 3.7
];

export const MULTIPLIER_COLORS: { [key: number]: string } = {
  0.9: 'bg-purple-500',
  1.0: 'bg-blue-500',
  1.5: 'bg-cyan-500',
  2.0: 'bg-teal-500',
  4.0: 'bg-green-500',
  7.0: 'bg-yellow-500',
  15.0: 'bg-orange-500',
  50.0: 'bg-red-500',
  100.0: 'bg-pink-500',
};

export const getMultiplierColor = (multiplier: number): string => {
  const keys = Object.keys(MULTIPLIER_COLORS).map(Number).sort((a,b) => a-b);
  for(const key of keys) {
      if(multiplier <= key) {
          return MULTIPLIER_COLORS[key];
      }
  }
  return MULTIPLIER_COLORS[keys[keys.length-1]];
};