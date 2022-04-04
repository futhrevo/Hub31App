import { AnyAction } from "@reduxjs/toolkit";

export const LIVE_ADD_LOCAL_STREAM = 'LIV_ADD_LOC_STR';
export const LIVE_RM_LOCAL_STREAM = 'LIV_RM_LOC_STR';
export const LIVE_ADD_LOCAL_SHARED_STREAM = 'LIV_ADD_LOC_SH_STR';
export const LIVE_RM_LOCAL_SHARED_STREAM = 'LIV_RM_LOC_SH_STR';
export const LIVE_ADD_REMOTE_STREAM = 'LIV_ADD_REM_STR';
export const LIVE_RM_REMOTE_STREAM = 'LIV_RM_REM_STR';

export type LiveProviderState = {
  live: { [x: string]: any },
  rtc: {
    localStream: any,
    localSharedStream: any,
    remoteStreams: { [x: string]: any }
  }
}

const defaultState = {
  live: {},
  rtc: {
    localStream: null,
    localSharedStream: null,
    remoteStreams: {},
  }
}
const reducer = (state: LiveProviderState, action: AnyAction) => {
  switch (action.type) {
    case LIVE_ADD_LOCAL_STREAM:
      return { ...state, rtc: { ...state.rtc, localStream: action.payload } }
    case LIVE_RM_LOCAL_STREAM:
      return { ...state, rtc: { ...state.rtc, localStream: null, localSharedStream: null } }
    case LIVE_ADD_LOCAL_SHARED_STREAM:
      return { ...state, rtc: { ...state.rtc, localSharedStream: action.payload } }
    case LIVE_RM_LOCAL_SHARED_STREAM:
      return { ...state, rtc: { ...state.rtc, localSharedStream: null } }
    case LIVE_ADD_REMOTE_STREAM: {
      return { ...state, rtc: { ...state.rtc, remoteStreams: { ...state.rtc.remoteStreams, [action.streamID]: action.payload } } }
    }
    case LIVE_RM_REMOTE_STREAM: {
      return { ...state, rtc: { ...state.rtc, remoteStreams: { ...state.rtc.remoteStreams, [action.streamID]: undefined } } }
    }
    default:
      throw new Error('mutation type not defined')
  }
}

export { defaultState, reducer };
