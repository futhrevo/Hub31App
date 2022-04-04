import { topicReducer, initialState as initialTopicState } from './topicReducer';
import { NEW_MESSAGE, NEW_CONTROL, ADD_SUBSCRIBED_TOPIC, CLEAR_SUBSCRIBED_TOPICS } from './actions';
import { ON_LOGOUT } from '../accounts';

export const initialState = {
  'public/hub31': initialTopicState,
};

export function topicsReducer(state: { [x: string]: any } = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE: {
      return {
        ...state,
        [action.topic]: topicReducer(state[action.topic], action),
      };
    }
    case NEW_CONTROL: {
      return {
        ...state,
        [action.topic]: topicReducer(state[action.topic], action),
      }
    }

    case ADD_SUBSCRIBED_TOPIC: {
      return {
        ...state,
        [action.topic]: topicReducer(state[action.topic], action)
      }
    }

    case CLEAR_SUBSCRIBED_TOPICS: {
      const newState = { ...state };
      delete newState[action.topic];
      return newState;
    }
    case ON_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
