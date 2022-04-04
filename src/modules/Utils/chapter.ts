
export function calcChapterProgress(outline: { [s: string]: number; }, results: { [x: string]: { p: number; }; }) {
  let total = 0;
  let done = 0;
  for (const [key, value] of Object.entries(outline)) {
    total++;
    if (results && results[key] && results[key]?.p === value) {
      done++
    }
  }
  return {
    total,
    done,
    ratio: (total === 0 ? 0 : (done * 100) / total)
  }
}
