import { iotClient } from '../../modules/MTIoTClient';

export const WHITEBOARD_TYPE = '_wboard_';
export const CHAT_TYPE = '_chat_';
export const CONTROL_TYPE = '_ctrl_';

export function getWhiteBoardTopic(channel) {
  return `${channel}/${WHITEBOARD_TYPE}`;
}

export function getChatTopic(channel) {
  return `${channel}/${CHAT_TYPE}`;
}

export function getControlTopic(channel) {
  return `${channel}/${CONTROL_TYPE}`;
}

export function sendWhiteBoardMsg(channel, payload) {
  sendChannelMessage(getWhiteBoardTopic(channel), payload);
}

export function sendChatMsg(channel, payload) {
  sendChannelMessage(getChatTopic(channel), payload);
}

export function sendControlMsg(channel, payload) {
  sendChannelMessage(getControlTopic(channel), payload);
}

export function sendChannelMessage(topic, payload) {
  iotClient.publish(topic, JSON.stringify(payload));
}
