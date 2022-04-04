import { adminCourseDetails, viewCourseDetails, classCourseDetails, rateCourseAPI } from '../../api/courses';
import { CourseInfo } from './reducer';
import { AppDispatch, RootState } from '../store';
/*
 * action types
 */
export const FETCH_COURSE_PENDING = 'FETCH_COURSE_PENDING';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_ERROR = 'FETCH_COURSE_ERROR';
export const FETCH_ST_COURSE_PENDING = 'FCH_ST_CO_PEN';
export const FETCH_ST_COURSE_SUCCESS = 'FCH_ST_CO_SUC';
export const FETCH_ST_COURSE_ERROR = 'FCH_ST_CO_ERR';
export const FETCH_CL_COURSE_PENDING = 'FCH_CL_CO_PEN';
export const FETCH_CL_COURSE_SUCCESS = 'FCH_CL_CO_SUC';
export const FETCH_CL_COURSE_ERROR = 'FCH_CL_CO_ERR';


export const UPDATE_COURSE = 'UPDATE_COURSE';

export const ADD_COURSES = 'ADD_CRSE';
export const RATE_COURSE = 'RATE_CSE';

export type StudentCourseType = {
  Course: CourseInfo;
  longdesc: any;
  Chapters: any;
  EnCourses: any;
  Live: any;
}

export type ClassCourseType = {
  Course: CourseInfo;
  Chapters: any;
  EnCourses: any;
  Materials: any;
  StuResults: any;
}
/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
/*
 * action creators
 */

export function fetchAdminCoursePending(id: string) {
  return { type: FETCH_COURSE_PENDING, id };
}

export function fetchAdminCourseSuccess(id: string, data: CourseInfo) {
  return { type: FETCH_COURSE_SUCCESS, id, data };
}

export function fetchAdminCourseError(id: string, error: any) {
  return { type: FETCH_COURSE_ERROR, id, error };
}

export function fetchStudentCoursePending(id: string) {
  return { type: FETCH_ST_COURSE_PENDING, id };
}

export function fetchStudentCourseSuccess(id: string, data: StudentCourseType) {
  return { type: FETCH_ST_COURSE_SUCCESS, id, data };
}

export function fetchStudentCourseError(id: string, error: any) {
  return { type: FETCH_ST_COURSE_ERROR, id, error };
}

export function fetchClassCoursePending(id: string) {
  return { type: FETCH_CL_COURSE_PENDING, id };
}

export function fetchClassCourseSuccess(id: string, chapterId: string, data: ClassCourseType) {
  if (chapterId == null) {
    if (data.Materials.length > 0) {
      chapterId = data.Materials[0].chapterId;
    } else {
      chapterId = 'unknown';
    }
  }
  return { type: FETCH_CL_COURSE_SUCCESS, id, chapterId, data };
}

export function fetchClassCourseError(id: string, error: any) {
  return { type: FETCH_CL_COURSE_ERROR, id, error };
}

export function updateCourseInfo(id: string, data: CourseInfo) {
  return { type: UPDATE_COURSE, id, data };
}

export function addCourses(courses: CourseInfo) {
  return { type: ADD_COURSES, courses }
}

export function rateCourse(courseId: string, rating: number) {
  return { type: RATE_COURSE, courseId, rating }
}
/* thunk actions */
export function fetchAdminCourse(id: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { loading = true } = (getState().Courses[id] || {});
    if (!loading) return;
    dispatch(fetchAdminCoursePending(id));
    try {
      const details = await adminCourseDetails(id);
      dispatch(fetchAdminCourseSuccess(id, details));
    } catch (error) {
      dispatch(fetchAdminCourseError(id, error));
    }
  }
}

export function fetchStudentCourse(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchStudentCoursePending(id));
    try {
      const details = await viewCourseDetails(id);
      dispatch(fetchStudentCourseSuccess(id, details));
    } catch (error) {
      dispatch(fetchStudentCourseError(id, error));
    }
  }
}

export function fetchClassCourse(id: string, chapterId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchClassCoursePending(id));
    try {
      const details = await classCourseDetails(id, chapterId);
      dispatch(fetchClassCourseSuccess(id, chapterId, details));
    } catch (error) {
      dispatch(fetchClassCourseError(id, error));
    }
  }
}

export function rateCourseDis(id: string, sessId: number, rating: number) {
  return async (dispatch: AppDispatch) => {
    try {
      if (id && sessId) {
        dispatch(rateCourse(id, rating));
        await rateCourseAPI(id, sessId, rating);
      }
    } catch (e) {

    }
  }
}
