import _ from 'underscore';

const name = 'Courses';

const schema = {
  _id: 'string',
  name: 'string',
  profession: 'string',
  hours: 'int',
  exams: 'int',
  projects: 'int',
  content: 'string',
  longdesc: 'string',
  specialization_id: 'string?',
  min_grade: 'int',
  course_price: 'int',
  active: 'bool',
};

const defaults = {
  hours: 0,
  exams: 0,
  projects: 0,
  content: '',
  longdesc: '',
  min_grade: 0,
  course_price: 0,
  active: false,
};

const keys = _.keys(schema);

export { schema, defaults, name, keys };
