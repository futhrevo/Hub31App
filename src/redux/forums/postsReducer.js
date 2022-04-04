import {
  FETCH_PIN_PENDING, FETCH_PIN_SUCCESS, FETCH_PIN_ERROR,
  FETCH_POST_PENDING, FETCH_POST_SUCCESS, FETCH_POST_ERROR,
  FETCH_1PIN_SUCCESS, FETCH_1POST_SUCCESS, ADD_POST, UPDATE_POST, DEL_POST
} from './postsActions';
import {
  FAV_POST, COMM_COUNT,
} from './postActions';

import { postReducer } from './postReducer';

export const INITIAL_STATE = {
  pinfetch: false,
  pinPending: false,
  pinlast: null,
  postfetch: false,
  postPending: false,
  postlast: null,
  pinned: [],
  byId: {},
  byList: [],
}

export function postsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PIN_PENDING:
      return {
        ...state,
        pinPending: true
      }
    case FETCH_PIN_SUCCESS: {
      const byId = {};
      let pinned = [];
      action.items.forEach(el => { pinned.push(el.slug); byId[el.slug] = el });
      if (state.pinfetch) {
        pinned = [...state.pinned, ...pinned]
      }
      return {
        ...state,
        pinPending: false,
        pinfetch: true,
        pinlast: action.last,
        pinned: [...pinned],
        byId: { ...state.byId, ...byId }
      }
    }
    case FETCH_PIN_ERROR:
      return {
        ...state,
        pinPending: false
      }
    case FETCH_POST_PENDING:
      return {
        ...state,
        postPending: true
      }
    case FETCH_POST_SUCCESS: {
      const byId = {};
      let byList = [];
      action.items.forEach(el => { byList.push(el.slug); byId[el.slug] = el })
      if (state.postfetch) {
        byList = [...state.byList, ...byList]
      }
      return {
        ...state,
        postPending: false, postfetch: true, postlast: action.last,
        byList: [...byList],
        byId: { ...state.byId, ...byId }
      }
    }
    case FETCH_POST_ERROR:
      return {
        ...state,
        postPending: false
      }
    case ADD_POST:
    case FETCH_1POST_SUCCESS: {
      let byList = [];
      if (state.byList.indexOf(action.pslug) === -1) {
        byList = [action.pslug];
      }
      return {
        ...state,
        byList: [...byList, ...state.byList],
        byId: { ...state.byId, [action.pslug]: { ...action.item } }
      }
    }
    case FETCH_1PIN_SUCCESS: {
      let pinned = [];
      if (state.pinned.indexOf(action.pslug) === -1) {
        pinned = [action.pslug];
      }
      return {
        ...state,
        pinned: [...pinned, ...state.pinned],
        byId: { ...state.byId, [action.pslug]: { ...action.item } }
      }
    }
    case UPDATE_POST: {
      return {
        ...state,
        byId: { ...state.byId, [action.pslug]: { ...state.byId[action.pslug], ...action.item } }
      }
    }
    case DEL_POST: {
      const index = state.byList.indexOf(action.pslug);
      const newList = state.byList.slice();
      newList.splice(index, 1);
      return {
        ...state,
        byList: newList
      }
    }
    case FAV_POST:
    case COMM_COUNT: {
      return {
        ...state,
        byId: { ...state.byId, [action.pslug]: postReducer(state.byId[action.pslug], action) }
      }
    }
    default:
      return state;
  }
}
