import { useState, useEffect } from 'react';
import AgoraRTC, {
  IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack, UID, ConnectionState, ConnectionDisconnectedReason, ScreenVideoTrackInitConfig
} from 'agora-rtc-sdk-ng';

type ConnStateType = {
  prev: ConnectionState;
  curr: ConnectionState;
  reason?: ConnectionDisconnectedReason
}
export default function useAgora(client: IAgoraRTCClient | undefined) {
  const [userUid, setUid] = useState<UID>('');
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | undefined>(undefined);
  const [localScreenTrack, setLocalScreenTrack] = useState<ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack] | undefined>(undefined);

  const [joinState, setJoinState] = useState(false);
  const [connState, setConnState] = useState<ConnStateType>({ prev: "DISCONNECTED", curr: "DISCONNECTED" });
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  async function createLocalAudioTrack(audioConfig?: MicrophoneAudioTrackInitConfig) {
    try {
      // Sample the audio from the microphone
      const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(audioConfig);
      setLocalAudioTrack(microphoneTrack);
    } catch (error) {
      console.warn("Audio Track error - ", error);
    }
  }


  async function createLocalVideoTracks(videoConfig?: CameraVideoTrackInitConfig) {
    try {
      // Capture the video from the camera
      const cameraTrack = await AgoraRTC.createCameraVideoTrack(videoConfig);
      setLocalVideoTrack(cameraTrack);
    } catch (error) {
      console.warn("Video Track error - ", error);
    }
  }

  async function join(appid: string, channel: string, token?: string, uid: string | number | null = null) {
    if (!client) return;
    if (joinState) return;
    try {
      const generatedUid = await client.join(appid, channel, token || null, uid);
      setUid(generatedUid);
      setJoinState(true);
    } catch (error) {
      console.warn("Join Error - ", error);
    }
  }

  async function publish() {
    if (localAudioTrack && localVideoTrack) {
      try {
        await client?.setClientRole("host");
        await client?.publish([localAudioTrack, localVideoTrack]);
      } catch (error) {
        console.warn("Publish Error - ", error);
      }
    }
  }

  async function unpublish() {
    // You can also unpublish all the published tracks at once
    await client?.unpublish();
  }

  async function enableScreenShare(enable: boolean, screenConfig?: ScreenVideoTrackInitConfig) {
    if (localVideoTrack) {
      if (enable && screenConfig) {
        // remove camera stream and enable screen stream
        try {
          const screenTrack = await AgoraRTC.createScreenVideoTrack(screenConfig, "auto");
          setLocalScreenTrack(screenTrack);
          await client?.unpublish(localVideoTrack);
          await client?.publish(screenTrack);
        } catch (error) {
          console.warn("Screen Enable Error - ", error);
        }
      } else {
        // remove screen stream and enable camera stream
        try {
          await client?.unpublish(localScreenTrack);
          await client?.publish(localVideoTrack);
          if (Array.isArray(localScreenTrack)) {
            localScreenTrack.forEach(el => el.stop());
            localScreenTrack.forEach(el => el.close());
            setLocalScreenTrack(undefined);
          }
        } catch (error) {
          console.warn("Screen Disable Error - ", error);
        }
      }
    }
  }
  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    if (localScreenTrack) {
      if (Array.isArray(localScreenTrack)) {
        localScreenTrack.forEach(el => el.stop());
        localScreenTrack.forEach(el => el.close());
      } else {
        localScreenTrack.stop();
        localScreenTrack.close();
      }
    }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleConnStateChange = (curr: ConnectionState, prev: ConnectionState, reason: ConnectionDisconnectedReason) => {
      setConnState({ prev, curr, reason });
    }
    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);
    client.on('connection-state-change', handleConnStateChange);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.off('connection-state-change', handleConnStateChange);
    };
  }, [client]);

  return {
    createLocalAudioTrack,
    createLocalVideoTracks,
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    userUid,
    publish,
    unpublish,
    remoteUsers,
    connState,
    enableScreenShare
  };
}
