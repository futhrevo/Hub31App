import { NEW_MESSAGE, RESET_UNREADS } from './actions';
import { ON_LOGOUT } from '../accounts';

export function unReadReducer(state = {}, action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        [action.topic]: state[action.topic] + 1 || 1,
      };
    case RESET_UNREADS:
      return {
        ...state,
        [action.room]: 0,
      };
    case ON_LOGOUT:
      return {};
    default:
      return state;
  }
}
