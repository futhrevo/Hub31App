import _ from 'underscore';

const name = 'Chapters';

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

const keys = _.keys(schema);

export { schema, defaults, name, keys };

