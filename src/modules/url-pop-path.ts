export default function urlPopLastPath(url: string) {
  let cleanurl = url;
  if (url.charAt(url.length - 1) === '/') {
    cleanurl = url.slice(0, -1);
  }
  const newpath = cleanurl.split('/');
  newpath.pop();
  return newpath.join('/');
}
