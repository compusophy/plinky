export const ROWS = 7;

export const MULTIPLIERS = [
  3.7, 2.1, 1.05, 0.58, 0.58, 1.05, 2.1, 3.7
];

// Calibrated multipliers - set these after calibration in dev mode
// If this array is empty, MULTIPLIERS will be used instead
// To calibrate: Play 200+ games, calibrate until RTP is ~95%, then click "Save Calibrated Multipliers" in dev tools
export const CALIBRATED_MULTIPLIERS: number[] = [2.050, 1.180, 0.590, 0.325, 0.325, 0.590, 1.180, 2.050];


// Physics calibration coefficient: ONLY used as a fallback when CALIBRATED_MULTIPLIERS is empty
// This is a rough estimate for initial dev testing. For production, use the dev tools calibration system:
// 1. Play 200+ games, calibrate until RTP is ~95%
// 2. Click "Save Calibrated Multipliers" to export to CALIBRATED_MULTIPLIERS
// 3. Once CALIBRATED_MULTIPLIERS is set, this coefficient is ignored
// If physics gives higher RTP than theoretical, this should be < 1.0
// If physics gives lower RTP than theoretical, this should be > 1.0
export const PHYSICS_CALIBRATION_COEFFICIENT = 0.8411; // Fallback only - use dev tools calibration for production

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