export const videoSchema = {
  name: 'OnCourse',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    title: 'string',
    owner: 'string?',
    createdAt: 'date',
    link: 'string',
    course_id: 'string?',
  },
};
