export default function rearrangeArray(items: Array<any>, moveFromIndex: number, moveToIndex: number) {
  const arrayClone = items.slice();
  const movingItem = arrayClone[moveFromIndex];

  arrayClone.splice(moveFromIndex, 1);
  arrayClone.splice(moveToIndex, 0, movingItem);

  return arrayClone;
}
