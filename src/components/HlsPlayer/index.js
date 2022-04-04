import React from 'react';
import PropTypes from 'prop-types';
import {
  Player,
  BigPlayButton,
  ControlBar,
  ReplayControl,
  ForwardControl,
  VolumeMenuButton,
  PlaybackRateMenuButton,
} from 'video-react';

import 'video-react/dist/video-react.css';
import ClassHLSSource from './components/ClassHLSSource';

// https://video-react.js.org/customize/customize-source/
// https://github.com/mingxinstar/react-hls

class HlsPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: Date.now(),
    };
  }

  render() {
    const { playerId } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { controls, width, height, videoProps,
      poster,
      url,
      onError,
      suffix,
      head,
    } = this.props;
    return (
      <Player key={playerId} poster={poster} fluid>
        <BigPlayButton position="center" />
        <ControlBar>
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <PlaybackRateMenuButton rates={[2, 1, 0.75, 0.5]} order={7.1} />
          <VolumeMenuButton disabled />
        </ControlBar>
        <ClassHLSSource
          isVideoChild
          src={url}
          onError={onError}
          suffix={suffix}
          head={head}
        />
      </Player>
    );
  }
}

HlsPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  // hlsConfig: PropTypes.object, // https://github.com/dailymotion/hls.js/blob/master/API.md#fine-tuning
  controls: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  poster: PropTypes.string,
  videoProps: PropTypes.object,
  onError: PropTypes.func,
  suffix: PropTypes.string,
  head: PropTypes.string,
};

HlsPlayer.defaultProps = {
  autoplay: false,
  controls: true,
  width: 500,
  height: 375,
};

export default HlsPlayer;
