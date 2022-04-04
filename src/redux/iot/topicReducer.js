import { messagesReducer } from './messagesReducer';
import { NEW_MESSAGE, NEW_CONTROL, ADD_SUBSCRIBED_TOPIC } from './actions';

export const initialState = {
  messages: [],
};

export function topicReducer(state = initialState, action) {
  switch (action.type) {
    case NEW_MESSAGE: {
      return {
        ...state,
        messages: messagesReducer(state.messages, action),
      };
    }
    case NEW_CONTROL:
      return {
        ...state,
        messages: messagesReducer(state.messages, action),
      }
    case ADD_SUBSCRIBED_TOPIC: {
      return {
        ...state,
        messages: messagesReducer(state.messages, action),
      }
    }
    default:
      return state;
  }
};
