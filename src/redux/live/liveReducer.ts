import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { enterLive, refreshToken, startLive, updateLive } from '../../api/rtc';
import Config from '../../modules/config';
import { client } from '../../components/RTC/context'
import { onLogout, refreshUserData } from '../accounts';
import { ADD_NEW_LIVE, buildRtcRoomId } from '../courses/liveActions';
import { AppDispatch, RootState } from '../store';

type LiveState = {
  connFlag: boolean;
  rtcToken: string;
  appID: string;
  recordLock: boolean;
  me: {
    account: string;
    uid: string;
    role: number;
    video: number;
    audio: number;
    chat: number;
    grantBoard: number;
    rtcToken: string;
    appID: string;
    coVideo: string;
  };
  users: { [x: string]: any };
  applyUser: {
    userId: string;
    account: string;
    uid: string;
  };
  rtc: {
    published: boolean;
    joined: boolean;
    shared: boolean;
    users: string[];
  };
  course: {
    teacherId: string;
    teacherName: string;
    courseState: number;
    muteChat: number;
    isRecording: boolean;
    recordId: string;
    recordingTime: number;
    roomName: string;
    roomType: number;
    lockBoard: number;
    channel: string;
    roomId: string;
    courseId: string;
    coVideoUids: string[];
  };
  mediaDevice: {
    microphoneId: string;
    speakerId: string;
    cameraId: string;
    micVolume: number;
  };
}
const INITIAL_STATE: LiveState = {
  connFlag: false,
  rtcToken: '',
  appID: Config.agora.APP_ID,
  recordLock: false,
  me: {
    account: "",
    uid: "",
    role: 2,
    video: 1,
    audio: 1,
    chat: 1,
    grantBoard: 0,
    rtcToken: '',
    appID: Config.agora.APP_ID,
    coVideo: '',
  },
  users: {},
  applyUser: {
    userId: '',
    account: '',
    uid: ''
  },
  rtc: {
    published: false,
    joined: false,
    shared: false,
    users: [],
  },
  course: {
    teacherId: '',
    teacherName: '',
    courseState: 0,
    muteChat: 0,
    isRecording: false,
    recordId: '',
    recordingTime: 0,
    roomName: '',
    roomType: 3,
    lockBoard: 0,
    channel: '',
    roomId: '',
    courseId: '',
    coVideoUids: []
  },
  mediaDevice: {
    microphoneId: '',
    speakerId: '',
    cameraId: '',
    micVolume: 100,
  },
}

export const liveSlice = createSlice({
  name: 'Live',
  initialState: INITIAL_STATE,
  reducers: {
    setRTCJoined: (state, action) => {
      state.rtc.joined = action.payload;
    },
    setConnectFlag: (state, action) => {
      state.connFlag = Boolean(action.payload);
    },
    addRTCUser: {
      reducer: (state, action: PayloadAction<any>) => {
        const { rtcUserId, data } = action.payload
        state.users[rtcUserId] = data;
      },
      prepare: (rtcUserId: string, data: any) => {
        return { payload: { rtcUserId, data } }
      }
    },
    updateMe: {
      reducer: (state, action: PayloadAction<any>) => {
        const { rtcUserId, data } = action.payload
        return { ...state, users: { ...state.users, [rtcUserId]: { ...data } }, me: { ...state.me, ...data }, }
      },
      prepare: (rtcUserId: string, data: any) => {
        return { payload: { rtcUserId, data } }
      }
    },
    updateUser: {
      reducer: (state, action: PayloadAction<any>) => {
        const { userId, data } = action.payload
        state.users[userId] = data;
      },
      prepare: (userId: string, data: any) => {
        return { payload: { userId, data } }
      }
    },
    removeRTCUser: (state, action) => {
      delete state.users[action.payload];
    },
    addPeerUser: (state, action) => {
      let index = state.rtc.users.findIndex(el => el === action.payload);
      if (index === -1)
        state.rtc.users.push(action.payload)
    },
    removePeerUser: (state, action) => {
      let index = state.rtc.users.findIndex(el => el === action.payload);
      if (index !== -1) state.rtc.users.splice(index, 1)
    },
    updateDevice: (state, action) => {
      return { ...state, mediaDevice: { ...state.mediaDevice, ...action.payload } }
    },
    updateApplyUser: (state, action) => {
      return { ...state, applyUser: { ...action.payload } }
    },
    addRTCUsers: (state, action) => {
      return { ...state, users: { ...action.payload } }
    },
    addToken: (state, action) => {
      return { ...state, rtcToken: action.payload.rtcToken, me: { ...state.me, ...action.payload } }
    },
    updateToken: (state, action) => {
      state.rtcToken = action.payload;
      state.me.rtcToken = action.payload;
    },
    updateCourse: (state, action) => {
      return { ...state, course: { ...state.course, ...action.payload } }
    },
    endLiveRTC: (state) => INITIAL_STATE
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogout, state => INITIAL_STATE)
  }
});

export default liveSlice.reducer;

export const {
  setRTCJoined,
  setConnectFlag,
  addRTCUser,
  updateMe,
  updateUser,
  removeRTCUser,
  addPeerUser,
  removePeerUser,
  updateDevice,
  updateApplyUser,
  addRTCUsers,
  addToken,
  updateToken,
  updateCourse,
  endLiveRTC
} = liveSlice.actions;

export const ClassState = {
  CLOSED: 0,
  STARTED: 1
}

export const RTC_MSG_TYPE = {
  updateMemberCount: 2,
  roomInfoChanged: 3,
  coVideoUsersChanged: 4,
  screenShare: 5,
  sendApply: 6,
  sendReject: 7,
  sendAccept: 8,
  sendStop: 9
}


/* Redux thunk
*/

export function createRTC(courseId: string, roomName: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const username = getState().Accounts.dname.toLowerCase();
    const teacherId = getState().Accounts.sub;
    try {
      const { channel, cAt } = await startLive(courseId, roomName, username)
      dispatch({
        type: ADD_NEW_LIVE, courseId, live: {
          channel, username, cAt, attr: buildRtcRoomId(cAt), stuC: 0, topic: roomName, isAct: true, courseId: courseId
        }
      })
      dispatch(updateCourse({ channel, roomId: cAt, courseId, roomName, teacherId }))
    } catch (e) {

    }
  }
}

export function entryRTC(courseId: string, sessId: number, cAt: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      console.log('entryRTC', courseId, cAt);
      let username = getState()?.Accounts?.dname?.toLowerCase() ?? '';
      if (username.length === 0) {
        dispatch<any>(refreshUserData());
        username = getState()?.Accounts?.dname?.toLowerCase() || '';
      }
      console.log('entryRTC', courseId, cAt, username);
      const { live, user } = await enterLive(courseId, sessId, cAt, username);
      const { channel, topic: roomName, userId, username: teacherName } = live;
      const { token: rtcToken, role, uid } = user;
      const coVideo = role === 1 ? role : 0;
      const account = uid.split(':')[1].toUpperCase();
      const teacherId = `${userId}:${teacherName.replace(/ /g, '_')}`.substring(0, 250);
      dispatch(updateCourse({ channel, roomName, userId, teacherId, teacherName, roomId: cAt, courseId }))
      dispatch(addToken({ rtcToken, role, uid, account, coVideo }));
      dispatch(addRTCUser(teacherId, { account, audio: 1, video: 1, chat: 1 }))
    } catch (e) {
      console.log(e);
    }
  }
}

export function endRTC() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const sub = getState().Accounts.sub;
    const { teacherId, courseId, roomId: cAt } = getState().Live.course;
    if (teacherId.indexOf(sub) > -1) {
      await updateLive(courseId, cAt);
      dispatch(endLiveRTC())
    }
  }
}

export function refreshRTCToken() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { courseId, roomId: cAt } = getState().Live.course;
    const { token } = await refreshToken(courseId, cAt);
    dispatch(updateToken(token));
    client.renewToken(token);
  }
}
