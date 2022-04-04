import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { mute, unmute } from '../../../redux/live/roomActions';
import { useLiveState } from '../context';
import isEmpty from '../../../modules/isEmpty'


const useStream = (client) => {
  const dispatch = useDispatch();
  const stateCtx = useLiveState();

  const Live = useSelector(state => state.Live);

  const teacher = useMemo(() => {
    // if teacherId or uid is not present, return
    if (!Live.course.teacherId || !Live.me.uid)
      return;
    // return if users doesnt contain teacherId
    const teacherInfo = Live.users[Live.course.teacherId];
    if (!teacherInfo)
      return;

    if (Live.me.uid === Live.course.teacherId) {
      return {
        ...stateCtx.rtc.localStream,
        account: teacherInfo.account,
        video: teacherInfo.video,
        audio: teacherInfo.audio,
        local: true
      }
    }
    else {
      // when peer teacher is online
      const teacherUid = Live.users[Live.course.teacherId];
      if (!teacherUid)
        return null;
      // when peer teacher stream is found
      const remoteTeacherStream = stateCtx.rtc.remoteStreams[Live.course.teacherId];
      if (remoteTeacherStream) {
        return {
          ...remoteTeacherStream,
          account: teacherInfo.account,
          video: teacherInfo.video,
          audio: teacherInfo.audio
        }
      }
      return {
        streamID: Live.course.teacherId,
        account: teacherInfo.account,
        video: teacherInfo.video,
        audio: teacherInfo.audio,
      };
    }
  }, [
    Live.users,
    stateCtx.rtc.remoteStreams,
    stateCtx.rtc.localStream,
    Live.course.teacherId,
    Live.me.uid
  ]);

  const screenId = useMemo(() => {
    const teacher = Live.users[Live.course.teacherId];
    let id = '';
    if (teacher) {
      id = teacher.screenId;
    }
    return id;
  }, [Live.course.teacherId, Live.users]);

  const students = useMemo(() => {
    const userAttrs = Live.users;
    if (!Live.me.uid || userAttrs.length === 0)
      return [];
    const teacherUid = Live.course.teacherId;
    const peerUsers = Object.keys(Live.users);
    // exclude teacher and me and screenId
    let studentIds = peerUsers.filter((it) => it !== teacherUid && it !== Live.me.uid && it !== screenId);
    const studentStreams = [];
    const myAttr = userAttrs[Live.me.uid];
    // when i m student
    if (Live.me.role === 2) {
      if (myAttr && stateCtx.rtc.localStream) {
        const _tmpStream = {
          ...stateCtx.rtc.localStream,
          account: myAttr.account,
          video: myAttr.video,
          audio: myAttr.audio,
          local: true
        }
        studentStreams.push(_tmpStream);
      }
    }
    // capture all remote streams
    for (let studentId of studentIds) {
      const studentAttr = userAttrs[studentId];
      const stream = stateCtx.rtc.remoteStreams[studentId];
      if (studentAttr) {
        let _tmpStream = {
          streamID: studentId,
          account: studentAttr.account,
          video: studentAttr.video,
          audio: studentAttr.audio,
        };
        if (stream) {
          _tmpStream = {
            ...stream,
            streamID: studentId,
            account: studentAttr.account,
            video: studentAttr.video,
            audio: studentAttr.audio
          }
        }
        studentStreams.push(_tmpStream);
      }
    }
    return studentStreams;
  }, [
    Live.course.teacherId,
    screenId,
    Live.me.uid,
    Live.users,
    stateCtx.rtc.remoteStreams,
    stateCtx.rtc.localStream,
    Live.me.role
  ]);

  const sharedStream = useMemo(() => {
    if (stateCtx.rtc.localSharedStream) {
      const _tmpStream = {
        ...stateCtx.rtc.localSharedStream,
        video: 1,
        audio: 1,
        local: true
      }
      return _tmpStream;
    }
    const remoteStream = stateCtx.rtc.remoteStreams[screenId];
    if (remoteStream) {
      const _tmpStream = {
        ...remoteStream,
        video: 1,
        audio: 1
      }
      return _tmpStream;
    }
    return null;
  }, [
    screenId,
    stateCtx.rtc.remoteStreams,
    stateCtx.rtc.localSharedStream
  ]);

  const currentHost = useMemo(() => {
    if (!Live.course.coVideoUids || isEmpty(Live.course.coVideoUids))
      return null;
    const coVideoUid = '' + Live.course.coVideoUids[0];
    const userAttr = Live.users[coVideoUid];
    if (!userAttr)
      return null;
    // when i am current broadcaster
    if (`${Live.me.uid}` === coVideoUid) {
      if (stateCtx.rtc.localStream) {
        let _tmpStream = {
          ...stateCtx.rtc.localStream,
          account: userAttr.account,
          video: userAttr.video,
          audio: userAttr.audio,
          local: true,
          streamID: Live.me.uid
        }
        return _tmpStream;
      }
    }
    else {
      // when remote user is broadcaster
      const peerUid = coVideoUid;
      const peerUserAttr = Live.users[peerUid];
      if (peerUid && peerUserAttr) {
        let tmpStream = {
          account: peerUserAttr.account,
          video: peerUserAttr.video,
          audio: peerUserAttr.audio,
          streamID: peerUid,
        };
        const remoteStream = stateCtx.rtc.remoteStreams[peerUid];
        if (remoteStream) {
          tmpStream = {
            ...tmpStream,
            ...remoteStream
          }
        }
        return tmpStream;
      }
    }
    return null;
  }, [
    Live.course.coVideoUids,
    Live.me.uid,
    Live.users,
    stateCtx.rtc.remoteStreams,
    stateCtx.rtc.localStream,
  ]);

  const value = {
    teacher: teacher,
    students: students,
    sharedStream: sharedStream,
    currentHost: currentHost,
    onPlayerClick: async (type, streamID, uid) => {
      console.log("streamID ", streamID, uid);
      // const me = Live.me;
      // if (!roomStore.state.rtm.joined || !me.uid)
      //   return console.warn("please confirm joined rtm");
      const targetUser = Live.users[uid];
      if (!targetUser)
        return;
      const targetUid = targetUser.uid;
      const video = Boolean(targetUser.video);
      const audio = Boolean(targetUser.audio);
      const chat = Boolean(targetUser.chat);
      if (type === 'video') {
        if (video) {
          dispatch(mute(targetUid, 'video'));
        }
        else {
          dispatch(unmute(targetUid, 'video'));
        }
        return;
      }
      if (type === 'audio') {
        if (audio) {
          dispatch(mute(targetUid, 'audio'));
        }
        else {
          dispatch(unmute(targetUid, 'audio'));
        }
        return;
      }
      if (type === 'chat') {
        if (chat) {
          dispatch(mute(targetUid, 'chat'));
        }
        else {
          dispatch(unmute(targetUid, 'chat'));
        }
        return;
      }
    }
  };
  return value;
}

export default useStream;
