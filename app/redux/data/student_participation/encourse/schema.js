const schema = {
  _id: 'string',
  student_id: 'string',
  course_id: 'string',
  course_session_id: 'string',
  enrollment_date: 'date?',
  status_id: { type: 'list', objectType: 'int', optional: true },
  status_date: 'date?',
  done: 'bool?',
  final_grade: 'int?',
  certificate_ID: 'string?',
  certificate_location: 'string?',
};

const defaults = {
  student_id: '',
  course_id: '',
  course_session_id: '',
};

export { schema, defaults };
