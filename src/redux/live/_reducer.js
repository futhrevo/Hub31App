import {
  LIVE_CONFIG, LIVE_CLIENT, LIVE_LOADING, LIVE_CODEC, LIVE_VIDEO, LIVE_AUDIO, LIVE_SCREEN, LIVE_DEVICESLIST, LIVE_LOCALSTREAM, LIVE_PROFILE, LIVE_CURRENTSTREAM, LIVE_ADDSTREAM, LIVE_REMSTREAM, LIVE_CLEARALLSTREAM
} from './liveReducer';
const readDefaultState = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem('custom_storage'))
  } catch (err) {
    return {}
  }
}

const defaultState = {
  // loading effect
  loading: false,
  // media devices
  streams: [],
  localStream: null,
  currentStream: null,
  otherStreams: [],
  devicesList: [],
  // web sdk params
  config: {
    uid: 0,
    host: true,
    channelName: '',
    token: '',
    resolution: '480p',
    ...readDefaultState(),
    microphoneId: '',
    cameraId: ''
  },
  agoraClient: null,
  mode: 'live',
  codec: 'h264',
  muteVideo: true,
  muteAudio: true,
  screen: false,
  profile: false
  // beauty: false
}

/*
 * Reducers
 */
export function liveReducer(state = defaultState, action) {
  switch (action.type) {
    case LIVE_CONFIG: {
      return {
        ...state, config: { ...state.config, ...action.payload }
      }
    }
    case LIVE_CLIENT: {
      return {
        ...state, client: action.payload
      }
    }
    case LIVE_LOADING: {
      return {
        ...state, loading: action.payload
      }
    }
    case LIVE_CODEC: {
      return {
        ...state, codec: action.payload
      }
    }
    case LIVE_VIDEO: {
      return {
        ...state, muteVideo: action.payload
      }
    }
    case LIVE_AUDIO: {
      return {
        ...state, muteAudio: action.payload
      }
    }
    case LIVE_SCREEN: {
      return {
        ...state, screen: action.payload
      }
    }
    case LIVE_DEVICESLIST: {
      return {
        ...state, devicesList: action.payload
      }
    }
    case LIVE_LOCALSTREAM: {
      return {
        ...state, localStream: action.payload
      }
    }
    case LIVE_PROFILE: {
      return {
        ...state, profile: action.payload
      }
    }
    case LIVE_CURRENTSTREAM: {
      const { streams } = state
      const newCurrentStream = action.payload
      const otherStreams = streams.filter(
        (it) => it.getId() !== newCurrentStream.getId()
      )
      return { ...state, currentStream: newCurrentStream, otherStreams }
    }
    case LIVE_ADDSTREAM: {
      const { streams, currentStream } = state
      const newStream = action.payload
      let newCurrentStream = currentStream
      if (!newCurrentStream) {
        newCurrentStream = newStream
      }
      if (streams.length === 4) return { ...state }
      const newStreams = [...streams, newStream]
      const otherStreams = newStreams.filter(
        (it) => it.getId() !== newCurrentStream.getId()
      )
      return {
        ...state,
        streams: newStreams,
        currentStream: newCurrentStream,
        otherStreams
      }
    }
    case LIVE_REMSTREAM: {
      const { streams, currentStream } = state
      const { stream, uid } = action
      const targetId = stream ? stream.getId() : uid
      let newCurrentStream = currentStream
      const newStreams = streams.filter(
        (stream) => stream.getId() !== targetId
      )
      if (currentStream && (targetId === currentStream.getId())) {
        if (newStreams.length === 0) {
          newCurrentStream = null
        } else {
          newCurrentStream = newStreams[0]
        }
      }
      const otherStreams = newCurrentStream
        ? newStreams.filter((it) => it.getId() !== newCurrentStream.getId())
        : []
      return {
        ...state,
        streams: newStreams,
        currentStream: newCurrentStream,
        otherStreams
      }
    }
    case LIVE_CLEARALLSTREAM: {
      // const {streams, localStream, currentStream, beauty} = state;
      const { streams, localStream, currentStream } = state
      streams.forEach((stream) => {
        if (stream.isPlaying()) {
          stream.stop()
        }
        // stream.close();
      })

      if (localStream) {
        localStream.isPlaying() && localStream.stop()
        localStream.close()
      }
      if (currentStream) {
        currentStream.isPlaying() && currentStream.stop()
        currentStream.close()
      }
      return { ...state, currentStream: null, localStream: null, streams: [] }
    }
    default:
      return state;
  }
}
