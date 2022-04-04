import React from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import MediaErrorCodes from '../../../modules/media-error-codes';

// https://github.com/makotokw/videojs-hlsjs/blob/master/src/hlsjs-source-handler.js
// https://github.com/video-dev/hls.js/issues/1423#issuecomment-392349907
class HLSSource extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.xhrSetup = this.xhrSetup.bind(this);
    const config = {
      debug: true,
      xhrSetup: this.xhrSetup,
    };
    this.hls = new Hls(config);
    this.onHlsjsError = this.onHlsjsError.bind(this);
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
        // video.play();
      });
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        this.onHlsjsError(event, data);
      });
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

  async xhrSetup(xhr, oldurl) {
    const { suffix, head } = this.props;
    let url = oldurl;
    if (url.includes('sentry')) {
      // url = "https://api.hub31.com/v1/videos/echo"
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'application/pgp-keys');
      xhr.setRequestHeader('Content-Type', 'application/pgp-keys');
      xhr.setRequestHeader('Authorization', `Bearer ${head}`);
    } else {
      url += `${suffix}`; // this suffix is updated every [x] seconds by polling the server
      xhr.open('GET', url, true);
    }
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

HLSSource.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
  video: PropTypes.object,
  player: PropTypes.object,
  onError: PropTypes.func,
  suffix: PropTypes.string,
  head: PropTypes.string,
};

export default HLSSource;
