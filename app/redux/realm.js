import Realm from 'realm';

import Courses from './data/course_details/courses/Courses';
import Chapters from './data/course_details/chapter/Chapters';

import EnCourses from './data/student_participation/encourse/EnCourses';

export default new Realm({
  schema: [Courses, Chapters, EnCourses],
  deleteRealmIfMigrationNeeded: true,
});
