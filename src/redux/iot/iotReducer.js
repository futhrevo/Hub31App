import { IOT_INIT, IOT_CONNECT, IOT_DISCONNECT, IOT_ERROR } from './actions';
import { ON_LOGOUT } from '../accounts';
/*
 * Reducers
 */
const INITIAL_STATE = {
  init: false, connect: false
}
export function iotReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IOT_INIT:
      return {
        ...state,
        init: true
      }
    case IOT_CONNECT:
      return {
        ...state,
        connect: true
      }
    case IOT_DISCONNECT:
      return {
        ...state,
        connect: false
      }
    case IOT_ERROR:
      return {
        ...state,
        error: action.error
      }
    case ON_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
