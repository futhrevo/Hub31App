import { iotClient } from '../../modules/MTIoTClient';
import { tryParseJSON } from '../../modules/utils';
import { WHITEBOARD_TYPE, CONTROL_TYPE } from './topicUtils';


// IOT Actions
export const IOT_INIT = 'IOT_INIT';
export const IOT_CONNECT = 'IOT_CONN';
export const IOT_DISCONNECT = 'IOT_DIS';
export const IOT_ERROR = 'IOT_ERR';


// Message Actions
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const NEW_CONTROL = 'NEW_CONTROL';

// Chat actions
export const ADD_SUBSCRIBED_TOPIC = 'ADD_SUB_TOPIC';
export const CLEAR_SUBSCRIBED_TOPICS = 'CLR_SUB_TOPICS';
export const RESET_UNREADS = 'RST_UNREADS';

// Query Actions
export const QUERY_DEFER = 'QRY_DEF';
export const QUERY_ANSWER = 'QRY_ANS';

// Control Actions
export const CONTROL_TEACHER_ACCEPT = 'CTRL_TEAC_ACC';
export const CONTROL_TEACHER_REJECT = 'CTRL_TEAC_REJ';
export const CONTROL_TEACHER_STOP = 'CTRL_TEAC_STO';
export const CONTROL_STUDENT_APPLY = 'CTRL_STU_APLY';
export const CONTROL_AUDIO_MUTE = 'CTRL_AUD_MUT';
export const CONTROL_AUDIO_UNMUTE = 'CTRL_AUD_UNMUT';
export const CONTROL_VIDEO_MUTE = 'CTRL_VID_MUT';
export const CONTROL_VIDEO_UNMUTE = 'CTRL_VID_UNMUT';
export const CONTROL_CHAT_MUTE = 'CTRL_CHAT_MUT';
export const CONTROL_CHAT_UNMUTE = 'CTRL_CHAT_UNMUT';


export function onConnect() {
  return { type: IOT_CONNECT };
}

export function onDisconnect() {
  return { type: IOT_DISCONNECT }
}

export function onError(error) {
  return { type: IOT_ERROR, error }
}

export function newIOTMsg(topic, message) {
  const str = message.toString();
  const obj = tryParseJSON(str);

  if (topic.indexOf(CONTROL_TYPE) > -1) {
    return { type: NEW_CONTROL, topic, msg: obj, time: Date.now() }
  }
  if (topic.indexOf(WHITEBOARD_TYPE) > -1) {
    return { type: NEW_CONTROL, topic, msg: obj, time: Date.now() }
  }
  return { type: NEW_MESSAGE, topic, msg: obj.m, user: obj.n, id: obj.i, time: Date.now() }
}

export function answeredQ(topic, index) {
  return { type: QUERY_ANSWER, topic, index }
}

export function deferQ(topic, index) {
  return { type: QUERY_DEFER, topic, index }
}



/**
 *
 * thunk functions
 */
export function initIot() {
  return async dispatch => {
    iotClient.init(dispatch);
    dispatch({ type: IOT_INIT });
  }
}

export function addSub(topic) {
  return async dispatch => {
    if (topic.length === 0) return;
    if (iotClient.isConnected) {
      iotClient.subscribe(topic);
      dispatch({ type: ADD_SUBSCRIBED_TOPIC, topic });
    }
  }
}

export function addSubs(topics) {
  return async dispatch => {
    if (topics.length === 0) return;
    if (iotClient.isConnected) {
      iotClient.subscribe(topics);
      topics.forEach(topic => dispatch({ type: ADD_SUBSCRIBED_TOPIC, topic }))
    }
  }
}

export function delSub(topic) {
  if (topic.length === 0) return;
  return async dispatch => {
    if (iotClient.isConnected) {
      iotClient.unsubscribe(topic);
      dispatch({ type: CLEAR_SUBSCRIBED_TOPICS, topic });
    }
  }
}

export function delSubs(topics) {
  return async dispatch => {
    if (topics.length === 0) return;
    if (iotClient.isConnected) {
      iotClient.unsubscribe(topics);
      topics.forEach(topic => dispatch({ type: CLEAR_SUBSCRIBED_TOPICS, topic }))
    }
  }
}

export function endIot(force) {
  return async dispatch => {
    iotClient.end(force);
    dispatch({ type: IOT_DISCONNECT });
  }
}
