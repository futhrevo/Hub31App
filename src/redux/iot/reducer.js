import { combineReducers } from 'redux';
import { iotReducer } from './iotReducer';
import { unReadReducer } from './unReadsReducer';
import { topicsReducer } from './topicsReducer';
import { chatReducer } from './chatReducer';

const chatRootReducer = combineReducers({
  iot: iotReducer,
  unreads: unReadReducer,
  topics: topicsReducer,
  chat: chatReducer
});
export default chatRootReducer;
