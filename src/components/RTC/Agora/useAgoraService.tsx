import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { refreshToken } from '../../../api/rtc';
import { addPeerUser, removePeerUser } from '../../../redux/live/liveReducer';

export function useAgoraService(id: string, sess: string, _at: string) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { addLocalStream, addRemoteStream, removeRemoteStream, removeLocalStream } = useLiveMutation();
  const Live = useSelector((state: RootState) => state.Live);

  const publishLock = useRef(false);
  const rtc = useRef(false);

  useEffect(() => {
    return () => {
      rtc.current = true
    }
  }, []);

  useEffect(() => {
    return () => {
      console.log("[agora-web] Exit All")
      agoraProxy.exitAll();
    }
  }, [location]);

  useEffect(() => {
    // Already teacher or covideo then return
    if (Live.me.role === 1) return;
    // Already published stream, then return
    if (!agoraProxy.rtcClient.published) return;
    Promise.all([
      agoraProxy.rtcClient.unpublishLocalStream()
    ]).then(() => console.log("[agora-web] unpublish local stream"))
  }, [Live.me.role, Live.me.coVideo])

  useEffect(() => {
    if (!Live.rtc.joined || rtc.current) return;

    if (Live.me.coVideo && !publishLock.current) {
      const params = {
        streamID: Live.me.uid,
        video: true,
        audio: true,
        mirror: false,
        screen: false,
        microphoneId: Live.mediaDevice.microphoneId,
        cameraId: Live.mediaDevice.cameraId,
        audioOutput: {
          volume: Live.mediaDevice.speakerVolume,
          deviceId: Live.mediaDevice.speakerId
        }
      }
      console.log("canPb>>> ", Live.me.coVideo, Live.me.uid);
      publishLock.current = true;
      Promise.all([
        agoraProxy.rtcClient.publishLocalStream(params)
      ])
        .then((res) => {
          console.log(res);
          console.log("[agora-web] any: ", res[0], res[1]);
          console.log("[agora-web] publish local stream");
        }).catch(console.warn)
        .finally(() => {
          publishLock.current = false;
        })
    }
  }, [Live.rtc.joined, Live.me.uid, Live.me.role, Live.mediaDevice, Live.me.coVideo])

  useEffect(() => {
    // If flag not enabled dont connect to channel
    if (!Live.connFlag) return;
    if (!Live.me.uid || !Live.course.channel || !Live.appID || !Live.me.rtcToken) return;

    if (agoraProxy.rtcClient.joined || rtc.current) {
      return
    }
    console.log("[agora-rtc] add event listener");
    agoraProxy.rtcClient.rtc.on('onTokenPrivilegeWillExpire', (evt: any) => {
      // you need obtain the `newToken` token from server side
      console.log('[agora-web] onTokenPrivilegeWillExpire', evt);
      refreshToken(Live.course.courseId, Live.course.roomId).then(res => {
        const newToken = res.rtcToken;
        agoraProxy.rtcClient.rtc.renewToken(newToken);
      })
    });
    agoraProxy.rtcClient.rtc.on('onTokenPrivilegeDidExpire', (evt: any) => {
      // you need obtain the `newToken` token from server side
      console.log('[agora-web] onTokenPrivilegeDidExpire', evt);
      refreshToken(Live.course.courseId, Live.course.roomId).then(res => {
        const newToken = res.rtcToken;
        agoraProxy.rtcClient.rtc.renewToken(newToken);
      })
    });
    agoraProxy.rtcClient.rtc.on('error', (evt: any) => {
      console.log('[agora-web] error evt', evt);
    });
    agoraProxy.rtcClient.rtc.on('stream-published', ({ stream }: any) => {
      const _stream = new AgoraStream(stream, stream.getId(), true);
      console.log("[agora-web] stream-published, id: ", stream.getId());
      addLocalStream?.(_stream);
      dispatch(addPeerUser(stream.getId()));
    });
    agoraProxy.rtcClient.rtc.on('stream-subscribed', ({ stream }: any) => {
      const streamID = stream.getId();
      // when streamID is not shareid use switch high or low stream in dual stream mode
      const _stream = new AgoraStream(stream, stream.getId(), false);
      console.log("[agora-web] subscribe remote stream, id: ", stream.getId());
      addRemoteStream?.(streamID, _stream);
    });
    agoraProxy.rtcClient.rtc.on('stream-added', ({ stream }: any) => {
      console.log("[agora-web] added remote stream, id: ", stream.getId());
      agoraProxy.rtcClient.subscribe(stream);
    });
    agoraProxy.rtcClient.rtc.on('stream-removed', ({ stream }: any) => {
      console.log("[agora-web] removed remote stream, id: ", stream.getId());
      // const id = stream.getId();
      removeRemoteStream?.(stream.getId());
    });
    agoraProxy.rtcClient.rtc.on('peer-online', ({ uid }: any) => {
      console.log("[agora-web] peer-online, id: ", uid);
      dispatch(addPeerUser(uid));
    });
    agoraProxy.rtcClient.rtc.on('peer-leave', ({ uid }: any) => {
      console.log("[agora-web] peer-leave, id: ", uid);
      dispatch(removePeerUser(uid));
      removeRemoteStream?.(uid);

      if (Live.me.role === 1 && Live.course.roomType === 2) {
        // if (roomStore.state.applyUser.account) {
        //   globalStore.showToast({
        //     type: 'rtmClient',
        //     message: t('toast.student_peer_leave', { reason: roomStore.state.applyUser.account }),
        //   })
        // }
      }
    });
    agoraProxy.rtcClient.rtc.on("stream-fallback", ({ uid, attr }: any) => {
      const msg = attr === 0 ? 'resume to a&v mode' : 'fallback to audio mode';
      console.info(`[agora-web] stream: ${uid} fallback: ${msg}`);
    });
    rtc.current = true;
    // TODO: fetch token before this point
    agoraProxy.rtcClient.joinChannel({
      uid: Live.me.uid,
      channel: Live.course.channel,
      token: Live.me.rtcToken,
      dual: false,
      appId: Live.appID,
    }).catch(console.warn).finally(() => {
      rtc.current = false;
    });
    return () => {
      const events = [
        'onTokenPrivilegeWillExpire',
        'onTokenPrivilegeDidExpire',
        'error',
        'stream-published',
        'stream-subscribed',
        'stream-added',
        'stream-removed',
        'peer-online',
        'peer-leave',
        'stream-fallback'
      ]
      for (let eventName of events) {
        agoraProxy.rtcClient.rtc.off(eventName, () => { });
      }
      console.log("[agora-web] remove event listener");
      !rtc.current && agoraProxy.rtcClient.exit().then(() => {
        console.log("[agora-web] do remove event listener");
      }).catch(console.warn)
        .finally(() => {
          rtc.current = true;
          removeLocalStream?.();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Live.me.uid, Live.me.rtcToken, Live.me.role,
  Live.course.channel, Live.course.roomType, Live.course.courseId, Live.course.roomId,
  Live.appID, dispatch, Live.connFlag])
}
