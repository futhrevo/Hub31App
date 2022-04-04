import AgoraRTC from 'agora-rtc-sdk-ng';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDevice } from '../../../redux/live/liveReducer';
import { RootState } from '../../../redux/store';

export type MediaDeviceType = {
  value: string;
  text: string;
  kind: MediaDeviceKind;
}
export default function useDevices() {
  const dispatch = useDispatch();
  const [devices, setDevices] = useState<Array<MediaDeviceType>>([]);
  const mediaDevice = useSelector((state: RootState) => state.Live.mediaDevice);

  const cameraList = useMemo(() => {
    return devices
      .filter((it) => it.kind === 'videoinput');
  }, [devices]);
  const microphoneList = useMemo(() => {
    return devices
      .filter((it) => it.kind === 'audioinput');
  }, [devices]);
  const speakerList = useMemo(() => {
    return devices
      .filter((it) => it.kind === 'audiooutput');
  }, [devices]);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      const onChange = async () => {
        let devices: MediaDeviceInfo[] = [];
        await AgoraRTC.getDevices().then((res) => devices = res).catch(e => {
          console.log("get devices error!", e);
        });
        console.log(devices);
        setDevices(devices.map((item) => ({
          value: item.deviceId,
          text: item.label,
          kind: item.kind
        })));
      };

      window.addEventListener('devicechange', onChange);
      onChange().then(() => {
      }).catch(console.warn);
      mounted.current = true;
      return () => {
        window.removeEventListener('devicechange', onChange);
      };
    }
  }, []);

  useEffect(() => {
    const payload: any = {};
    if (cameraList.length > 0 && mediaDevice.cameraId === '') {
      payload.cameraId = cameraList[0].value;
    }
    if (microphoneList.length > 0 && mediaDevice.microphoneId === '') {
      payload.microphoneId = microphoneList[0].value;
    }
    if (speakerList.length > 0 && mediaDevice.speakerId === '') {
      payload.speakerId = speakerList[0].value;
    }
    dispatch(updateDevice(payload));
  }, [cameraList, microphoneList, speakerList,
    mediaDevice.cameraId, mediaDevice.microphoneId, mediaDevice.speakerId, dispatch])

  return [cameraList, microphoneList, speakerList]
}
