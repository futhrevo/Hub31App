import { FETCH_FORUM_PENDING, FETCH_FORUM_SUCCESS, FETCH_FORUM_ERROR } from './forumActions';
import {
  FETCH_PIN_PENDING, FETCH_PIN_SUCCESS, FETCH_PIN_ERROR,
  FETCH_POST_PENDING, FETCH_POST_SUCCESS, FETCH_POST_ERROR,
  ADD_POST, FETCH_1PIN_SUCCESS, FETCH_1POST_SUCCESS, DEL_POST, UPDATE_POST,
} from './postsActions';
import { FAV_POST, COMM_COUNT } from './postActions';
import { INITIAL_STATE as seedPost, postsReducer } from './postsReducer';

import { FETCH_COURSE_SUCCESS } from '../courses/actions';

export const INITIAL_STATE = {
  fetch: false,
  pending: false,
  byId: {},
  byList: []
}

export function forumReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FORUM_PENDING:
      return {
        ...state,
        fetch: false,
        pending: true,
      }
    case FETCH_FORUM_SUCCESS:
      console.log(action);
      const byList = [...action.forum.byList];
      const byId = {};
      byList.forEach(el => byId[el] = { Posts: { ...seedPost }, ...action.forum.byId[el] })
      // action.forum.forEach(el => { byList.push(el.slug); byId[el.slug] = { Posts: { ...seedPost }, ...el } });
      return {
        ...state,
        fetch: true, pending: false, byId, byList
      }
    case FETCH_FORUM_ERROR:
      return {
        ...state,
        fetch: false,
        pending: false
      }
    case FETCH_COURSE_SUCCESS: {
      const forum = action.data.Forums[0];
      const byId = {};
      forum.byList.forEach(el => byId[el] = { Posts: { ...seedPost }, ...forum.byId[el] })
      return {
        ...state,
        fetch: true, pending: false,
        byList: [...forum.byList],
        byId: { ...byId }
      }
    }
    case ADD_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.slug]: {
            ...state.byId[action.slug],
            Posts: postsReducer(state.byId[action.slug].Posts, action),
            postC: state.byId[action.slug].postC + 1
          }
        }
      }

    case DEL_POST:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.slug]: {
            ...state.byId[action.slug],
            Posts: postsReducer(state.byId[action.slug].Posts, action),
            postC: state.byId[action.slug].postC - 1
          }
        }
      }
    case FETCH_PIN_PENDING:
    case FETCH_PIN_SUCCESS:
    case FETCH_1PIN_SUCCESS:
    case FETCH_PIN_ERROR:
    case FETCH_POST_PENDING:
    case FETCH_POST_SUCCESS:
    case FETCH_1POST_SUCCESS:
    case FETCH_POST_ERROR:
    case UPDATE_POST:
    case FAV_POST:
    case COMM_COUNT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.slug]: {
            ...state.byId[action.slug],
            Posts: postsReducer(state.byId[action.slug].Posts, action)
          }
        },
      }
    default:
      return state;
  }
}
