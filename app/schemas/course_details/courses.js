export const courseSchema = {
  name: 'Courses',
  primaryKey: '_id',
  properties: {
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
  },
};
