import { AnyAction } from 'redux';
import {
  FETCH_ABT_DOC_PENDING, FETCH_ABT_DOC_SUCCESS, FETCH_ABT_DOC_ERROR, FETCH_RSC_DOC_PENDING,
  FETCH_RSC_DOC_SUCCESS, FETCH_RSC_DOC_ERROR, FETCH_DES_DOC_PENDING, FETCH_DES_DOC_SUCCESS,
  FETCH_DES_DOC_ERROR, UPDATE_ABT, UPDATE_RSC, UPDATE_DESC,
} from './docActions';
import { FETCH_ST_COURSE_SUCCESS } from './actions';

export type RscDoc = {
  id: string;
  title: string;
  body: string;
  public: boolean;
}

export type RscVid = {
  id: string;
  title: string;
  link: string;
  poster: string;
  body: string;
  public: boolean;
  userId: string;
  hash: string;
}
export type DocType = {
  loading: boolean;
  fetched: boolean;
}

export const initialState = {
  loading: false,
  fetched: false
}

export function docReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_RSC_DOC_PENDING:
    case FETCH_ABT_DOC_PENDING:
    case FETCH_DES_DOC_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_RSC_DOC_SUCCESS:
    case FETCH_ABT_DOC_SUCCESS:
    case FETCH_DES_DOC_SUCCESS: {
      return {
        ...state,
        loading: false,
        fetched: true,
        ...action.doc
      }
    }

    case FETCH_RSC_DOC_ERROR:
    case FETCH_ABT_DOC_ERROR:
    case FETCH_DES_DOC_ERROR: {
      return {
        loading: false, error: action.error
      }
    }

    case UPDATE_ABT:
    case UPDATE_RSC:
    case UPDATE_DESC: {
      return {
        ...state,
        body: action.body
      }
    }
    case FETCH_ST_COURSE_SUCCESS: {
      return {
        ...state,
        ...action.data.longdesc
      }
    }
    default:
      return state;
  }
}
