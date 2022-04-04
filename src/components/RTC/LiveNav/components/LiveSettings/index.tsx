import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { updateDevice } from '../../../../../redux/live/liveReducer';
import { AppDispatch, RootState } from '../../../../../redux/store';
import Icon from '../../../../Icon';
import { useAgoraLiveState } from '../../../context';
import MediaPlayer from '../../../TeacherPage/components/MediaPlayer';

const LiveSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Live = useSelector((state: RootState) => state.Live);
  const { state: { localVideoTrack, localAudioTrack, cameraList = [], microphoneList = [], speakerList = [] }, actions: { setSettings } } = useAgoraLiveState();

  const changeCamera = (evt: any) => {
    console.log('changeCamera ', evt.target.value);
    const camera = evt.target.value;
    if (cameraList && cameraList.length > 0) {
      const cameraId = cameraList[camera] ? cameraList[camera].value : '';
      if (cameraId) dispatch(updateDevice({ cameraId }));
    }
  }

  const changeMicrophone = (evt: any) => {
    console.log('changeMicrophone ', evt.target.value);
    const microphone = evt.target.value;
    if (microphoneList && microphoneList.length > 0) {
      const microphoneId = microphoneList[microphone] ? microphoneList[microphone].value : '';
      if (microphoneId) dispatch(updateDevice({ microphoneId }));
    }
  }

  const changeSpeaker = (evt: any) => {
    console.log('changeSpeaker ', evt.target.value);
    const speaker = evt.target.value;
    if (speakerList && speakerList.length > 0) {
      const speakerId = speakerList[speaker] ? speakerList[speaker].value : '';
      if (speakerId) dispatch(updateDevice({ speakerId }));
    }
  }

  const changeMicVolume = (evt: any) => {
    const volume = evt.target.value;
    console.log('changeSpeaker ', volume);
    dispatch(updateDevice({ micVolume: volume }));
  }

  return (
    <Card className="shadow settings-card">
      <Card.Header className="py-0">
        <div className="d-flex justify-content-between">
          LiveSettings
          <Button variant="link" onClick={(e) => { setSettings && setSettings(false); }}>
            <Icon iconStyle="solid" icon="times" />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <div style={{ width: '300px', height: 'auto' }} className="border border-primary">
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack} aspectRatio="4by3"></MediaPlayer>
        </div>
        <Form>
          <Form.Group>
            <Form.Label>Camera</Form.Label>
            <Form.Control as="select" value={Live.mediaDevice.cameraId} onChange={changeCamera}>
              {cameraList.map((item, key) => (
                <option key={key} value={item.value}>
                  {item.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Microphone</Form.Label>
            <Form.Control as="select" value={Live.mediaDevice.microphoneId} onChange={changeMicrophone}>
              {microphoneList.map((item, key) => (
                <option key={key} value={item.value}>
                  {item.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicRangeCustom">
            <Form.Label>Mic Volume (0 - 200)</Form.Label>
            <Form.Control type="range" custom onChange={changeMicVolume} value={Live.mediaDevice.micVolume} min="0" max="200" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Speaker</Form.Label>
            <Form.Control as="select" value={Live.mediaDevice.speakerId} onChange={changeSpeaker}>
              {speakerList.map((item, key) => (
                <option key={key} value={item.value}>
                  {item.text}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LiveSettings;
