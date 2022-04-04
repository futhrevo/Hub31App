import { FETCH_FORUM_PENDING, FETCH_FORUM_SUCCESS, FETCH_FORUM_ERROR } from './forumActions';
import {
  FETCH_PIN_PENDING, FETCH_PIN_SUCCESS, FETCH_PIN_ERROR,
  FETCH_POST_PENDING, FETCH_POST_SUCCESS, FETCH_POST_ERROR,
  FETCH_1PIN_SUCCESS, FETCH_1POST_SUCCESS, ADD_POST, DEL_POST, UPDATE_POST,
} from './postsActions';
import {
  FAV_POST, COMM_COUNT
} from './postActions';
import { forumReducer } from './forumReducer';
import { ON_LOGOUT } from '../accounts';

const INITIAL_STATE = {

}

export function forumsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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
        [action.id]: forumReducer(state[action.id], action)
      }
    case ON_LOGOUT:
      return {}
    default:
      return state;
  }
}
