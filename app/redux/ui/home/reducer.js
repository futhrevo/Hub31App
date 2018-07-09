import { SUCCESSJOINED, ERRORJOINED, LOADINGJOINED } from './action';

const HomeReducer = (state = {}, action) => {
  switch (action.type) {
    case SUCCESSJOINED:
      return {
        ...state,
        receivedAt: Date.now(),
        isFetching: false,
        didInvalidate: false,
      };
    case ERRORJOINED:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
      };
    case LOADINGJOINED:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default HomeReducer;
