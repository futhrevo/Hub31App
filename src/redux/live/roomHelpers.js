import { updateRoomUser } from '../../api/rtc';
import { sendControlMsg } from '../iot/topicUtils';
import { updateMe, updateUser } from './liveReducer';

export const updateLocalMe = async (dispatch, me, course, params) => {
  const { broadcast, ...meParams } = params;
  const { courseId, roomId, channel } = course;
  const newMeAttrs = {
    ...me,
    ...meParams
  }

  const userAttrsParams = {
    userId: newMeAttrs.userId,
    chat: newMeAttrs.chat,
    audio: newMeAttrs.audio,
    video: newMeAttrs.video,
    grantBoard: newMeAttrs.grantBoard,
  };

  if (broadcast) {
    await updateRoomUser(courseId, roomId, { user: userAttrsParams });
    userAttrsParams.username = me.account;
    sendControlMsg(channel, userAttrsParams);
  }

  dispatch(updateMe(me.uid, newMeAttrs));
}

export const updateUserBy = async (dispatch, prevUser, course, params) => {
  const { broadcast = true, ...userParams } = params;
  const { courseId, roomId, channel } = course;
  const newUserAttrs = {
    ...prevUser,
    ...userParams
  }

  const userAttrsParams = {
    userId: newUserAttrs.userId,
    chat: newUserAttrs.chat,
    audio: newUserAttrs.audio,
    video: newUserAttrs.video,
    grantBoard: newUserAttrs.grantBoard,
  };

  if (broadcast) {
    await updateRoomUser(courseId, roomId, { user: userAttrsParams });
    userAttrsParams.username = prevUser.account;
    sendControlMsg(channel, userAttrsParams);
  }
  dispatch(updateUser(prevUser.userId, userAttrsParams));
}
