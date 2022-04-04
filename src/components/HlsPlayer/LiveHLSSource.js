import React, { Component } from 'react';
import Hls from 'hls.js';
import MediaErrorCodes from '../../modules/media-error-codes';

export default class LiveHLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls();
    this.onHlsjsError = this.onHlsjsError.bind(this);
    this.hlsTryLoad = this.hlsTryLoad.bind(this);
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
      this.hls.on(Hls.Events.ERROR, (event, data) => this.onHlsjsError(event, data));
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  onHlsjsError(event, eventData) {
    const { onError } = this.props;
    if (eventData.fatal) {
      console.error(
        `HLS Fatal Error: ${eventData.type}:${eventData.details}:${
        eventData.reason
        }`,
      );
    } else {
      console.warn(
        `HLS Error: ${eventData.type}:${eventData.details}:${eventData.reason}`,
      );
    }
    if (eventData.type === Hls.ErrorTypes.NETWORK_ERROR) {
      this.hlsTryLoadTimer = setTimeout(() => this.hlsTryLoad(), 10000);
      if (eventData.response && eventData.response.code === 403) {
        onError({
          code: MediaErrorCodes.MEDIA_ERR_NETWORK,
          message: `${eventData.type}:${eventData.details}`,
        });
        return;
      }

      switch (eventData.details) {
        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
        case Hls.ErrorDetails.KEY_LOAD_ERROR:
          onError({
            code: MediaErrorCodes.MEDIA_ERR_NETWORK,
            message: `${eventData.type}:${eventData.details}`,
          });
          break;
        default:
          break;
      }
    }

    // https://github.com/video-dev/hls.js/blob/master/docs/API.md
    if (eventData.fatal) {
      switch (eventData.type) {
        case Hls.ErrorTypes.NETWORK_ERROR:
          this.hls.startLoad();
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.log('modify this error handler');
          this.hls.recoverMediaError();
          break;
        default:
          onError({
            code: MediaErrorCodes.MEDIA_ERR_CUSTOM,
            message: `${eventData.type}:${eventData.details}`,
          });
          break;
      }
    }
  }

  hlsTryLoad() {
    this.hls.loadSource(this.props.src);
    this.hls.startLoad();
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }
}
