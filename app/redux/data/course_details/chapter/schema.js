const schema = {
  _id: 'string',
  course_id: 'string',
  chapter_no: 'int',
  description: 'string',
};

const defaults = {
  course_id: '',
  chapter_no: 0,
  description: '',
};

export { schema, defaults };
