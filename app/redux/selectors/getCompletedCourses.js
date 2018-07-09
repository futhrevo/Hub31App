import { createSelector } from 'reselect';
import _ from 'underscore';

import { name as encourseName } from '../data/student_participation/encourse/schema';
import { name as courseName } from '../data/course_details/courses/schema';

const getEncourses = (state) => state.Collections[encourseName] || [];
const getCourses = (state) => state.Collections[courseName] || [];

export const getCompletedCourses = createSelector(
  [getEncourses, getCourses],
  (enrolled, courses) => {
    const done = _.pluck(enrolled.filter((t) => t.done), 'course_id');
    return courses.filter((t) => done.indexOf(t._id) > -1);
  },
);
