export default function RemoveLastDirectoryPartOf(the_url: string) {
  const the_arr = the_url.split('/');
  the_arr.pop();
  const newurl = `${the_arr.join('/')}/*`;
  return newurl;
}
