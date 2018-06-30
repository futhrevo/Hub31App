export const chapterSchema = {
  name: 'Chapters',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    course_id: 'string',
    chapter_no: 'int',
    description: 'string',
  },
};
