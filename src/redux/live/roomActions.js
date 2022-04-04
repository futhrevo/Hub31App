import { addRTCUsers, updateApplyUser, updateMe, updateCourse } from './liveReducer';
import { updateLocalMe, updateUserBy } from './roomHelpers';


export function updateCoVideoUsers(rawUsers) {
  return async (dispatch, getState) => {
    const coVideoUids = [];
    // construct new covideo users list
    let users = rawUsers.reduce((acc, it) => {
      if (!Object.prototype.hasOwnProperty(it, 'role') || it.role > 1) {
        coVideoUids.push(it.uid);
      }
      return acc[it.uid] = {
        role: it.role,
        account: it.userName,
        uid: it.uid,
        video: it.enableVideo,
        audio: it.enableAudio,
        chat: it.enableChat,
        grantBoard: it.grantBoard,
        userId: it.userId,
        screenId: it.screenId,
      }
    });

    // dispatch updated covideoUids
    dispatch(updateCourse({ coVideoUids }));
    // dispatch updated users
    dispatch(addRTCUsers(users));

    // update local user properties
    let { me: meState, applyUser } = getState().Live;

    let newMe = users[meState.uid];
    // if my uid is found update me state else update covideo as off
    if (newMe) {
      meState = { ...meState, ...newMe, coVideo: 1 }
    } else {
      meState = { ...meState, coVideo: 0 }
    }

    // dispatch new me state
    dispatch(updateMe(meState.uid, meState));

    // if apply user Id is not covideo clear applyUser
    if (applyUser && applyUser.uid) {
      const foundUser = users[applyUser.uid];
      if (!foundUser) {
        dispatch(updateApplyUser({
          userId: '',
          account: '',
          uid: ''
        }))
      }
    }
  }
}

export function mute(uid, type) {
  return async (dispatch, getState) => {
    const { me, course } = getState().Live;
    if (`${me.uid}` === `${uid}`) {
      if (type === 'audio') {
        await updateLocalMe(dispatch, me, course, {
          audio: 0,
          broadcast: true
        });
      }
      if (type === 'video') {
        await updateLocalMe(dispatch, me, course, {
          video: 0,
          broadcast: true
        });
      }
      if (type === 'chat') {
        await updateLocalMe(dispatch, me, course, {
          chat: 0,
          broadcast: true
        });
      }
    } else if (me.role === 1) {
      const prevUser = getState().Live.users[`${uid}`];
      if (type === 'audio') {
        await updateUserBy(dispatch, prevUser, course, { audio: 0 });
      }
      if (type === 'video') {
        await updateUserBy(dispatch, prevUser, course, { video: 0 });
      }
      if (type === 'chat') {
        await updateUserBy(dispatch, prevUser, course, { chat: 0 });
      }
      if (type === 'grantBoard') {
        await updateUserBy(dispatch, prevUser, course, { grantBoard: 0 });
      }
    }
  }
}

export function unmute(uid, type) {
  return async (dispatch, getState) => {
    const { me, course } = getState().Live;
    if (`${me.uid}` === `${uid}`) {
      if (type === 'audio') {
        await updateLocalMe(dispatch, me, course, {
          audio: 1,
          broadcast: true
        });
      }
      if (type === 'video') {
        await updateLocalMe(dispatch, me, course, {
          video: 1,
          broadcast: true
        });
      }
      if (type === 'chat') {
        await updateLocalMe(dispatch, me, course, {
          chat: 1,
          broadcast: true
        });
      }
    } else if (me.role === 1) {
      const prevUser = getState().Live.users[`${uid}`];
      if (type === 'audio') {
        await updateUserBy(dispatch, prevUser, course, { audio: 1 });
      }
      if (type === 'video') {
        await updateUserBy(dispatch, prevUser, course, { video: 1 });
      }
      if (type === 'chat') {
        await updateUserBy(dispatch, prevUser, course, { chat: 1 });
      }
      if (type === 'grantBoard') {
        await updateUserBy(dispatch, prevUser, course, { grantBoard: 1 });
      }
    }
  }
}
