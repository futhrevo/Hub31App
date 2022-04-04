import { AnyAction } from 'redux';
import { ON_LOGOUT } from '../accounts';
import { ADD_FORUM } from '../forums/forumActions';
import {
  ADD_COURSES, FETCH_CL_COURSE_ERROR, FETCH_CL_COURSE_PENDING, FETCH_CL_COURSE_SUCCESS, FETCH_COURSE_ERROR, FETCH_COURSE_PENDING, FETCH_COURSE_SUCCESS,
  FETCH_ST_COURSE_ERROR, FETCH_ST_COURSE_PENDING, FETCH_ST_COURSE_SUCCESS,
  RATE_COURSE, UPDATE_COURSE
} from './actions';
import {
  ADD_CHAPTER, DELETE_CHAPTER, DOWN_CHAPTER, UPDATE_CHAPTER, UP_CHAPTER
} from './chapterActions';
import { chapterReducer, ChaptersType, initialState as chapInitialState } from './chapterReducer';
import {
  FETCH_ABT_DOC_ERROR, FETCH_ABT_DOC_PENDING, FETCH_ABT_DOC_SUCCESS,

  FETCH_DES_DOC_ERROR, FETCH_DES_DOC_PENDING, FETCH_DES_DOC_SUCCESS, FETCH_RSC_DOC_ERROR, FETCH_RSC_DOC_PENDING,
  FETCH_RSC_DOC_SUCCESS,
  UPDATE_ABT, UPDATE_DESC, UPDATE_RSC
} from './docActions';
import { docReducer, DocType, initialState as docInitialState } from './docReducer';
import { MAT_READ_DOC } from './enrollActions';
import { EnCoursesType, enrollReducer, initialState as enrollInitialState } from './enrollReducer';
import {
  ADD_NEW_LIVE, FETCH_LIVES_ERROR,
  FETCH_LIVES_NEXT, FETCH_LIVES_NEXT_PENDING, FETCH_LIVES_PENDING, FETCH_LIVES_SUCCESS
} from './liveActions';
import { initialState as liveInitialState, liveReducer, LiveType } from './liveReducer';
import { addMaterialResults, ADD_BULK_MATERIALS, ADD_MATERIAL, DELETE_MATERIAL, DOWN_MATERIAL, UPDATE_MATERIAL, UP_MATERIAL } from './materialActions';
import { initialState as matInitialState, materialReducer, MaterialsType } from './materialReducer';
import { BEGIN_SESSION, END_SESSION, UPDATE_SESSION } from './sessionActions';
import { csessionReducer, CSessionType, initialState as sessInitialState } from './sessionReducer';

import { FETCH_FORUM_PENDING, FETCH_FORUM_SUCCESS, FETCH_FORUM_ERROR } from '../forums/forumActions';
import {
  FETCH_PIN_PENDING, FETCH_PIN_SUCCESS, FETCH_PIN_ERROR,
  FETCH_POST_PENDING, FETCH_POST_SUCCESS, FETCH_POST_ERROR,
  FETCH_1PIN_SUCCESS, FETCH_1POST_SUCCESS, ADD_POST, DEL_POST, UPDATE_POST,
} from '../forums/postsActions';
import {
  FAV_POST, COMM_COUNT
} from '../forums/postActions';
import { INITIAL_STATE as forumInitialState, forumReducer } from '../forums/forumReducer';

export type CourseInfo = {
  id: string;
  attr: String;
  title: string;
}
export type CourseData = {
  loading: boolean;
  Course: CourseInfo;
  Lives: LiveType;
  about: DocType;
  resources: DocType;
  description: DocType;
  Chapters: ChaptersType;
  CSessions: CSessionType;
  EnCourses: EnCoursesType;
  Materials: MaterialsType;
  StuResults: any;
  Forums: any;
}
type CourseType = {
  [x: string]: CourseData;
}
export function courseReducer(state: CourseType = {}, action: AnyAction) {
  switch (action.type) {
    case FETCH_COURSE_PENDING:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          loading: true,
          Lives: liveReducer(liveInitialState, action),
          about: docReducer(docInitialState, action),
          resources: docReducer(docInitialState, action),
          description: docReducer(docInitialState, action),
          Chapters: chapterReducer(chapInitialState, action),
          Materials: materialReducer(matInitialState, action),
          CSessions: csessionReducer(sessInitialState, action),
          Forums: forumReducer(forumInitialState, action),
        }
      }
    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        [action.id]:
        {
          ...state[action.id],
          Course: { ...action.data.Course },
          Chapters: chapterReducer(state[action.id].Chapters, action),
          CSessions: csessionReducer(state[action.id].CSessions, action),
          loading: false,
          Lives: liveReducer(state[action.id].Lives, action),
          Forums: forumReducer(state[action.id].Forums, action)
        }
      }
    case FETCH_COURSE_ERROR:
      return {
        ...state,
        [action.id]: { ...state[action.id], error: action.error, loading: false, }
      }
    case FETCH_ST_COURSE_PENDING:
      return {
        ...state,
        [action.id]: { loading: true, }
      }
    case FETCH_ST_COURSE_SUCCESS:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          Course: { ...action.data.Course },
          Chapters: chapterReducer(chapInitialState, action),
          EnCourses: enrollReducer(enrollInitialState, action),
          description: docReducer(docInitialState, action),
          Lives: liveReducer(liveInitialState, action),
          CSessions: csessionReducer(sessInitialState, action),
          loading: false,
        }
      };
    case FETCH_ST_COURSE_ERROR:
      return {
        ...state,
        [action.id]: { ...state[action.id], error: action.error, loading: false, }
      }
    case FETCH_CL_COURSE_PENDING:
      return {
        ...state,
        [action.id]: { ...state[action.id], cloading: true, }
      }
    case FETCH_CL_COURSE_SUCCESS:
      // const newChapMats = addMaterialHelper((state[action.id].Materials || {})[action.chapterId], action.data.Materials);
      const results = addMaterialResults((state[action.id].StuResults || {}), action.data.StuResults);
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          Course: { ...state[action.id].Course, ...action.data.Course },
          Chapters: chapterReducer(chapInitialState, action),
          CSessions: csessionReducer(sessInitialState, action),
          EnCourses: { ...action.data.EnCourses },
          Materials: materialReducer(state[action.id].Materials, action),
          StuResults: { ...results },
          chapterId: action.chapterId,
          cloading: false,
        }
      };

    case UPDATE_COURSE:
      return {
        ...state,
        [action.id]: { ...state[action.id], Course: { ...state[action.id].Course, ...action.data } }
      }

    case ADD_COURSES:
      const newcourses: { [x: string]: any } = {};
      action.courses.map((el: CourseInfo) => newcourses[el.id] = el);
      return {
        ...state,
        ...newcourses
      }
    case ADD_FORUM: {
      return {
        ...state,
        [action.id]: { ...state[action.id], Forums: action.Item }
      }
    }
    case RATE_COURSE: {
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], EnCourses: { ...state[action.courseId].EnCourses, rating: action.rating } }
      }
    }

    case FETCH_CL_COURSE_ERROR:
      return state;
    case FETCH_ABT_DOC_PENDING:
    case FETCH_ABT_DOC_SUCCESS:
    case FETCH_ABT_DOC_ERROR:
    case UPDATE_ABT:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], about: docReducer(state[action.courseId].about, action) }
      }
    case FETCH_RSC_DOC_PENDING:
    case FETCH_RSC_DOC_SUCCESS:
    case FETCH_RSC_DOC_ERROR:
    case UPDATE_RSC:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], resources: docReducer(state[action.courseId].resources, action) }
      }

    case FETCH_DES_DOC_PENDING:
    case FETCH_DES_DOC_SUCCESS:
    case FETCH_DES_DOC_ERROR:
    case UPDATE_DESC:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], description: docReducer(state[action.courseId].description, action) }
      }

    case ADD_CHAPTER:
    case UPDATE_CHAPTER:
    case DELETE_CHAPTER:
    case UP_CHAPTER:
    case DOWN_CHAPTER:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], Chapters: chapterReducer(state[action.courseId].Chapters, action) }
      }

    case ADD_MATERIAL:
    case ADD_BULK_MATERIALS:
    case UPDATE_MATERIAL:
    case DELETE_MATERIAL:
    case UP_MATERIAL:
    case DOWN_MATERIAL:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], Materials: materialReducer(state[action.courseId].Materials, action) }
      }

    case BEGIN_SESSION:
    case UPDATE_SESSION:
    case END_SESSION:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], CSessions: csessionReducer(state[action.courseId].CSessions, action) }
      }

    case FETCH_LIVES_PENDING:
    case FETCH_LIVES_SUCCESS:
    case FETCH_LIVES_ERROR:
    case FETCH_LIVES_NEXT_PENDING:
    case FETCH_LIVES_NEXT:
    case ADD_NEW_LIVE: {
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], Lives: liveReducer(state[action.courseId].Lives, action) }
      }
    }
    case MAT_READ_DOC: {
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], EnCourses: enrollReducer(state[action.courseId].EnCourses, action) }
      }
    }
    case FETCH_FORUM_PENDING:
    case FETCH_FORUM_SUCCESS:
    case FETCH_FORUM_ERROR:
    case FETCH_PIN_PENDING:
    case FETCH_PIN_SUCCESS:
    case FETCH_PIN_ERROR:
    case FETCH_POST_PENDING:
    case FETCH_POST_SUCCESS:
    case FETCH_POST_ERROR:
    case FETCH_1PIN_SUCCESS:
    case FETCH_1POST_SUCCESS:
    case ADD_POST:
    case UPDATE_POST:
    case FAV_POST:
    case COMM_COUNT:
    case DEL_POST:
      return {
        ...state,
        [action.courseId]: { ...state[action.courseId], Forums: forumReducer(state[action.courseId].Forums, action) }
      }
    case ON_LOGOUT:
      return {}
    default:
      return state;
  }
}
