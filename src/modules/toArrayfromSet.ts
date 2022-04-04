// https://medium.com/hackernoon/safe-list-updates-with-dynamodb-adc44f2e7d3
function toArrayfromSet(set: Set<any>) {
  if (!set) return [];
  if (Array.isArray(set)) return set;

  return Array.isArray(set.values) ? set.values : [];
};

export default toArrayfromSet;
