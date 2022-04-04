import { NEW_MESSAGE, NEW_CONTROL, ADD_SUBSCRIBED_TOPIC } from './actions';

export function messagesReducer(state = [], action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return [
        ...state,
        {
          id: action.id,
          author: action.user,
          time: action.time,
          text: action.msg,
        },
      ];
    case NEW_CONTROL:
      let count = (state.count || 0) + 1;;
      return {
        count,
        time: action.time,
        ...action.msg
      };
    case ADD_SUBSCRIBED_TOPIC:
      return state;
    default:
      return state;
  }
}
