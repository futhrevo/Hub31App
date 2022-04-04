import { AnyAction } from 'redux';
import { FETCH_COURSE_SUCCESS, FETCH_ST_COURSE_SUCCESS } from './actions';
import {
  FETCH_LIVES_PENDING, FETCH_LIVES_SUCCESS, FETCH_LIVES_ERROR,
  FETCH_LIVES_NEXT_PENDING, FETCH_LIVES_NEXT, ADD_NEW_LIVE
} from './liveActions';

export type LiveType = {
  loading: boolean;
  fetched: boolean;
  last: null;
  active: string;
  lives: {};
  pagination: {
    total: number;
    current: number;
    pages: {
      [x: number]: {
        ids: string[], fetching: boolean;
      }
    }
  }
}
export const initialState: LiveType = {
  loading: false,
  fetched: false,
  last: null,
  active: '',
  lives: {},
  pagination: {
    total: 0,
    current: 0,
    pages: {
      1: {
        ids: [], fetching: true
      }
    }
  }
}

export function liveReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case ADD_NEW_LIVE: {
      const newIds = [action.live.channel, ...state.pagination.pages[1].ids]
      return {
        ...state,
        active: action.live.channel,
        lives: {
          ...state.lives,
          [action.live.channel]: action.live,
        },
        pagination: {
          ...state.pagination,
          pages: {
            ...state.pagination.pages,
            1: {
              ...state.pagination.pages[1],
              ids: newIds
            }
          }
        }
      }
    }
    case FETCH_ST_COURSE_SUCCESS:
    case FETCH_COURSE_SUCCESS: {
      let active = '';
      let live: { [x: string]: any } = {};
      if (action.data && action.data.Lives && action.data.Lives.length > 0) {
        active = action.data.Lives[0].channel;
        live[active] = action.data.Lives[0]
      } else if (action.data && action.data.Live && action.data.Live.length > 0) {
        active = action.data.Live[0].channel;
        live[active] = action.data.Live[0]
      }
      return {
        ...state,
        active,
        lives: { ...state.lives, ...live }
      }
    }
    case FETCH_LIVES_PENDING: {
      return { ...state, loading: true }
    }
    case FETCH_LIVES_SUCCESS: {
      let lives = {};
      let ids = [];
      for (let live of action.items) {
        ids.push(live.channel);
        lives = {
          ...lives,
          [live.channel]: live
        }
      }
      return {
        ...state, loading: false, fetched: true, last: action.lastItem,
        lives: { ...state.lives, ...lives },
        pagination: {
          ...state.pagination, total: action.next,
          pages: {
            ...state.pagination.pages,
            [action.next]: {
              ids, fetching: false
            }
          }
        }
      }
    }
    case FETCH_LIVES_ERROR: {
      return { ...state, loading: false, error: action.error, fetched: true }
    }
    case FETCH_LIVES_NEXT_PENDING: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pages: {
            ...state.pagination.pages,
            [action.next]: {
              ids: [], fetching: true
            }
          }
        }
      }
    }
    case FETCH_LIVES_NEXT: {
      let lives = {};
      let ids = [];
      for (let live of action.items) {
        ids.push(live.channel);
        lives = {
          ...lives,
          [live.channel]: live
        }
      }
      return {
        ...state, last: action.lastItem,
        lives: { ...state.lives, ...lives },
        pagination: {
          ...state.pagination, total: action.next,
          pages: {
            ...state.pagination.pages,
            [action.next]: {
              ids, fetching: false
            }
          }
        }
      }
    }
    default:
      return state;
  }
}
