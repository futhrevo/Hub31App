export default (() => {
  let timer: NodeJS.Timeout;
  return (callback: (...args: any[]) => void, ms: number) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
