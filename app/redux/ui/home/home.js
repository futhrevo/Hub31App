import Meteor from 'react-native-meteor';

import { successJoined, errorJoined, loadingJoined } from './action';
import { writeRealm } from '../../data/Utils';

import {
  keys as courseKeys,
  defaults as courseDefaults,
  name as courseName,
} from '../../data/course_details/courses/schema';
import {
  keys as chapterKeys,
  defaults as chapterDefaults,
  name as chapterName,
} from '../../data/course_details/chapter/schema';
import {
  keys as encourseKeys,
  defaults as encourseDefaults,
  name as encourseName,
} from '../../data/student_participation/encourse/schema';

const _writeJoinedCourses = (objects = []) => {
  return new Promise((resolve, reject) => {
    try {
      writeRealm(objects, courseName, courseKeys, courseDefaults);
      resolve(objects);
    } catch (e) {
      reject(e);
    }
  });
};
const _writeEnrolledCourses = (objects = []) => {
  return new Promise((resolve, reject) => {
    try {
      writeRealm(objects, encourseName, encourseKeys, encourseDefaults);
      resolve(objects);
    } catch (e) {
      reject(e);
    }
  });
};
const _writeJoinedChapters = (objects = []) => {
  return new Promise((resolve, reject) => {
    try {
      writeRealm(objects, chapterName, chapterKeys, chapterDefaults);
      resolve(objects);
    } catch (e) {
      reject(e);
    }
  });
};

export function mviewJoinedVerb(dispatch) {
  dispatch(loadingJoined());
  Meteor.call('courses.mviewJoinedVerb', (error, response) => {
    if (response) {
      Promise.all([
        _writeJoinedCourses(response.Courses),
        _writeEnrolledCourses(response.EnCourses),
        _writeJoinedChapters(response.Chapters),
      ])
        .then(() => {
          dispatch(successJoined(response));
        })
        .catch((e) => {
          dispatch(errorJoined(e));
        });
    } else {
      // TODO: error dispatch
    }
  });
}
