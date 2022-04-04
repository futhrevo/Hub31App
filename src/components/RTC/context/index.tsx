import { createContext, ReactNode, useContext, useEffect, useCallback, useState, useMemo } from 'react';
import AgoraRTC, { IAgoraRTCRemoteUser, ILocalAudioTrack, ILocalVideoTrack, UID } from 'agora-rtc-sdk-ng';
import { useDispatch, useSelector } from 'react-redux';
import { endRTC, entryRTC, refreshRTCToken } from '../../../redux/live/liveReducer';
import useAgora from '../Agora/useAgora';
import { RootState } from '../../../redux/store';
import useDevices, { MediaDeviceType } from '../utils/useDevices';

type LiveState = {
  localVideoTrack?: ILocalVideoTrack | undefined;
  localAudioTrack?: ILocalAudioTrack | undefined;
  joinState?: boolean;
  remoteUsers?: IAgoraRTCRemoteUser[];
  userUid?: UID;
  showSettings?: boolean;
  cameraList?: MediaDeviceType[];
  microphoneList?: MediaDeviceType[];
  speakerList?: MediaDeviceType[];
  isTeacher?: boolean;
  teacher?: IAgoraRTCRemoteUser | undefined
}
type LiveMethods = {
  joinChannel?: Function,
  setSettings?: Function
}

type LiveContextType = {
  state: LiveState,
  actions: LiveMethods
}
const AgoraLiveContext = createContext<LiveContextType>({ state: {}, actions: {} });
export const useAgoraLiveState = () => useContext(AgoraLiveContext);

export const client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });


export const ContainerProvider = ({ courseId, sessId, at, children }: { courseId: string, sessId: number, at: number, children: ReactNode }) => {
  const dispatch = useDispatch();
  const [showSettings, setSettings] = useState(false);
  const [cameraList, microphoneList, speakerList] = useDevices();
  const Live = useSelector((state: RootState) => state.Live);
  const { createLocalAudioTrack, createLocalVideoTracks, userUid, localAudioTrack, localVideoTrack, leave, join, joinState, publish, remoteUsers } = useAgora(client);

  useEffect(() => {
    dispatch(entryRTC(courseId, sessId, at));
    return () => {
      exitAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at, courseId, sessId]);

  const exitAll = useCallback(() => {
    try {
      leave();
    } catch (e) {
      console.warn(e)
    } finally {
      dispatch(endRTC());
    }
  }, [dispatch, leave]);

  const refreshToken = useCallback(() => {
    try {
      dispatch(refreshRTCToken());
    } catch (e) {
      console.warn(e)
    }
  }, [dispatch]);

  const joinChannel = useCallback(async () => {
    await join(Live.appID, Live.course.channel, Live.me.rtcToken, Live.me.uid);
  }, [Live.appID, Live.course.channel, Live.me.rtcToken, Live.me.uid, join]);

  useEffect(() => {
    if (typeof localVideoTrack === 'undefined') {
      createLocalVideoTracks({ encoderConfig: "720p_1", cameraId: Live.mediaDevice.cameraId });
    } else {
      localVideoTrack.setDevice(Live.mediaDevice.cameraId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Live.mediaDevice.cameraId]);

  useEffect(() => {
    if (typeof localAudioTrack === 'undefined') {
      createLocalAudioTrack({ encoderConfig: "high_quality_stereo", microphoneId: Live.mediaDevice.microphoneId });
    } else {
      localAudioTrack.setDevice(Live.mediaDevice.microphoneId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Live.mediaDevice.microphoneId]);

  useEffect(() => {
    if (typeof localAudioTrack !== 'undefined') {
      localAudioTrack.setVolume(Number(Live.mediaDevice.micVolume))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Live.mediaDevice.micVolume]);

  const isTeacher = useMemo(() => {
    const meUid = Live.me.uid.split(':')[0];
    const teacherUid = Live.course.teacherId.split(':')[0];
    return meUid === teacherUid
  }, [Live.me.uid, Live.course.teacherId]);

  const teacher = useMemo(() => remoteUsers.find(el => el.uid === Live.course.teacherId), [Live.course.teacherId, remoteUsers]);

  const value = {
    state: { localVideoTrack, localAudioTrack, joinState, remoteUsers, userUid, cameraList, microphoneList, speakerList, showSettings, isTeacher, teacher },
    actions: { exitAll, refreshToken, publish, joinChannel, setSettings }
  }
  return (
    <AgoraLiveContext.Provider value={value}>
      {children}
    </AgoraLiveContext.Provider>
  );
}
