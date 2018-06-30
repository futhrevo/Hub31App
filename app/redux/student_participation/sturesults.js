export const stuResultSchema = {
  name: 'StuResults',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    material_id: 'string',
    enrolled_course_id: 'string',
    attempt: 'int',
    attempt_link: 'string?',
    started: 'date',
    ended: 'date',
    score: 'int?',
    answers: 'string?',
  },
};
