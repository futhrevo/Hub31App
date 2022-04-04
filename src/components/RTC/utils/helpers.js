const level = [
  'unknown',
  'excellent',
  'good',
  'poor',
  'bad',
  'very bad',
  'down'
];

export function NetworkQualityEvaluation(evt) {
  let defaultQuality = 'unknown';
  const val = Math.max(evt.downlinkNetworkQuality, evt.uplinkNetworkQuality);
  return level[val] ? level[val] : defaultQuality;
}
