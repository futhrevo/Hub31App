import { AnyAction } from 'redux';
import { FETCH_CL_COURSE_SUCCESS, FETCH_COURSE_SUCCESS, FETCH_ST_COURSE_SUCCESS } from './actions';

import {
  BEGIN_SESSION, UPDATE_SESSION, END_SESSION,
  addSessionHelper, updateSessionHelper, endSessionHelper
} from './sessionActions';

export type CSessionItem = {
  cAt: number;
  eAt: number;
  roll: number;
  title: string;
}
export type CSessionType = Array<CSessionItem>;
export const initialState = [];

export function csessionReducer(state: CSessionType = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_ST_COURSE_SUCCESS:
    case FETCH_COURSE_SUCCESS:
      if (action.data.Course.sess)
        return [action.data.Course.sess];
      return initialState;
    case FETCH_CL_COURSE_SUCCESS: {
      return [action.data.Course.sess];
    }
    case BEGIN_SESSION: {
      const newsess = addSessionHelper(state, action.data);
      return newsess;
    }
    case UPDATE_SESSION: {
      const newsess = updateSessionHelper(state, action.createdAt, action.eAt, action.title);
      return newsess;
    }
    case END_SESSION: {
      const newsess = endSessionHelper(state, action.createdAt);
      return newsess;
    }
    default:
      return state;
  }
}
