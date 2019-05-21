import Meteor from 'react-native-meteor';
import _ from 'underscore';
import {
  successJoined, errorJoined, loadingJoined, fetchedJoined,
} from './action';
import { writeRealm, queryRealm } from '../../data/Utils';

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

export function getJoinedFromRealm(dispatch) {
  const objects = queryRealm(encourseName);
  const len = objects.length;
  const Encourses = [];
  const Courses = [];
  for (let i = 0; i < len; i += 1) {
    const obj = _.pick(objects[i], encourseKeys);
    // obj.status_id = Array.from(obj.status_id);
    obj.status_id = _.values(obj.status_id);
    Encourses.push(obj);
    const course = queryRealm(courseName, `_id = "${obj.course_id}"`);
    if (course.length > 0) {
      const cobj = _.pick(course[0], courseKeys);
      Courses.push(cobj);
    }
  }
  const result = {};
  result[encourseName] = Encourses;
  result[courseName] = Courses;
  dispatch(fetchedJoined(result));
}

export function fetchJoinedCourses() {
  return (dispatch) => {
    mviewJoinedVerb(dispatch);
  };
}

export function getJoinedCourses() {
  return (dispatch) => {
    getJoinedFromRealm(dispatch);
  };
}
