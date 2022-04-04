const monthNames = [
  '---',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CourseSessionResolver = (csession) => {
  let sessMsg = '';
  if (
    csession
    && Object.prototype.hasOwnProperty.call(csession, 'cAt')
  ) {
    const nowdate = Date.now();
    const { cAt, eAt } = csession;
    const start_date = new Date(cAt);
    const end = new Date(eAt);
    if (nowdate < cAt) {
      sessMsg = `starts ${monthNames[start_date.getMonth()]}`;
    } else if (nowdate > eAt) {
      sessMsg = 'session ended';
    } else {
      sessMsg = `${
        monthNames[start_date.getMonth()]
        } ${start_date.getFullYear()} - ${
        monthNames[end.getMonth()]
        } ${end.getFullYear()}`;
    }
  }
  return sessMsg;
};

export default CourseSessionResolver;
