import {
  FAV_POST, COMM_COUNT,
} from './postActions';

const INITIAL_STATE = {

}

export function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FAV_POST:
      let { favC } = state;
      if (action.fav) {
        favC += 1;
      } else {
        favC -= 1;
      }
      return {
        ...state,
        favC
      }
    case COMM_COUNT:
      let { comC } = state;
      if (action.isInc) {
        comC += 1;
      } else {
        comC -= 1;
      }
      return {
        ...state,
        comC
      }
    default:
      return state;
  }
}
