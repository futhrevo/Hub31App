import {
  TOGGLE_CHAT, TOGGLE_INPUT_DISABLED, TOGGLE_MESSAGE_LOADER, SET_BADGE_COUNT,
  OPEN_FULLSCREEN_PREVIEW, CLOSE_FULLSCREEN_PREVIEW, MARK_ALL_READ
} from './chatActions';
import { ON_LOGOUT } from '../accounts';

export const initialState = {
  ux: {
    showChat: false,
    disabledInput: false,
    messageLoader: false
  },
  fs: {
    src: '',
    alt: '',
    width: 0,
    height: 0,
    visible: false
  },
  message: {
    badgeCount: 0
  },
  quickButtons: {
    quickButtons: []
  }
};

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CHAT:
      return {
        ...state, ux: {
          ...state.ux,
          showChat: !state.ux.showChat
        }
      }
    case TOGGLE_INPUT_DISABLED:
      return {
        ...state, ux: {
          ...state.ux,
          disabledInput: !state.ux.disabledInput
        }
      }
    case TOGGLE_MESSAGE_LOADER:
      return {
        ...state, ux: {
          ...state.ux,
          messageLoader: !state.ux.messageLoader
        }
      }
    case SET_BADGE_COUNT:
      return {
        ...state, message: {
          ...state.message,
          badgeCount: action.count
        }
      }
    case OPEN_FULLSCREEN_PREVIEW:
      const { src, width, height } = action.payload;
      return {
        ...state, fs: {
          ...state.fs, src, width, height, visible: true
        }
      }
    case CLOSE_FULLSCREEN_PREVIEW:
      return { ...state, fs: { ...initialState.fs } }
    case MARK_ALL_READ:
      return { ...state, message: { ...state.message, badgeCount: 0 } }
    case ON_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
