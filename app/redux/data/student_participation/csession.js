export const csessionSchema = {
  name: 'CSessions',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    course_id: 'string',
    spec_session_id: 'string?',
    start_date: 'date',
    end_date: 'date',
  },
};
