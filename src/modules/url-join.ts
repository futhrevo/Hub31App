export default function urlJoin(base: string, path: string) {
  return base.charAt(base.length - 1) === '/' ? base + path : `${base}/${path}`;
}
