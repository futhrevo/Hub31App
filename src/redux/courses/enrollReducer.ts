import { AnyAction } from 'redux';
import { MAT_READ_DOC } from './enrollActions';
import { FETCH_ST_COURSE_SUCCESS } from './actions';

export type MatResultType = {
  p: number,     // chap -> Mat -> { p: points, s: score, d: date , l: link, a: attempt }
  d: number,
  s: number,
  l: string,
  a: number
}
export type EnCoursesType = {
  loading: boolean;
  fetched: boolean;
  lastC: string;
  lastM: string;
  stuId?: string;
  fname?: string;
  chaps: {
    [chapId: string]: {
      [matId: string]: MatResultType
    }
  }
}
export const initialState = {
  loading: false,
  fetched: false,
  lastC: '',
  lastM: '',
  chaps: {}
};

export function enrollReducer(state: EnCoursesType = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_ST_COURSE_SUCCESS: {
      return {
        ...state,
        loading: false,
        fetched: true,
        ...action.data.EnCourses
      }
    }
    case MAT_READ_DOC: {
      return {
        ...state,
        chaps: {
          ...state.chaps,
          [action.chapterId]: {
            ...state.chaps[action.chapterId],
            [action.matId]: action.result
          }
        }
      }
    }
    default:
      return state;
  }
}
