import React from 'react';
import { View, Animated, Dimensions, TouchableWithoutFeedback, NetInfo } from 'react-native';
import { Video, Audio } from 'expo';
import PropTypes from 'prop-types';

import styles from './styles';

// UI states
const CONTROL_STATES = {
  SHOWN: 'SHOWN',
  SHOWING: 'SHOWING',
  HIDDEN: 'HIDDEN',
  HIDING: 'HIDDING',
};

const PLAYBACK_STATES = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  BUFFERING: 'BUFFERING',
  ERROR: 'ERROR',
  ENDED: 'ENDED',
};

const SEEK_STATES = {
  NOT_SEEKING: 'NOT_SEEKING',
  SEEKING: 'SEEKING',
  SEEKED: 'SEEKED',
};

// Don't show the Spinner for very short periods of buffering
const BUFFERING_SHOW_DELAY = 200;

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Playback state
      playbackState: PLAYBACK_STATES.LOADING,
      lastPlaybackStateUpdate: Date.now(),
      // Seeking state
      seekState: SEEK_STATES.NOT_SEEKING,
      // State comes from the playbackCallback
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      // Error message if we are in PLAYBACK_STATES.ERROR
      error: null,
      // Controls display state
      controlsOpacity: new Animated.Value(props.showControlsOnLoad ? 1 : 0),
      controlsState: props.showControlsOnLoad ? CONTROL_STATES.SHOWN : CONTROL_STATES.HIDDEN,
    };
    this._showControls = this._showControls.bind(this);
    this._hideControls = this._hideControls.bind(this);
    this._toggleControls = this._toggleControls.bind(this);
    this._resetControlsTimer = this._resetControlsTimer.bind(this);
    this._setupNetInfoListener = this._setupNetInfoListener.bind(this);
    this._onTimerDone = this._onTimerDone.bind(this);
  }

  async componentDidMount() {
    this._setupNetInfoListener();

    if (this.state.controlsState === CONTROL_STATES.SHOWN) {
      this._resetControlsTimer();
    }

    // Set audio mode to play even in silent mode (like the YouTube app)
    try {
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
    } catch (e) {
      this.props.errorCallback({
        type: 'NON_FATAL',
        message: 'setAudioModeAsync error',
        obj: e,
      });
    }
  }

  // Listen for changes in network connectivity
  _setupNetInfoListener() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.props.debug && console.log('[networkState]', connectionInfo.type);
      this.setState({ networkState: connectionInfo.type });
    });
    NetInfo.addEventListener('connectionChange', this._onConnectionChange.bind(this));
  }

  _onConnectionChange(connectionInfo) {
    this.props.debug && console.log('[networkState]', connectionInfo.type);
    this.setState({ networkState: connectionInfo.type });
  }

  _toggleControls() {
    switch (this.state.controlsState) {
      case CONTROL_STATES.SHOWN:
        // If the controls are currently shown, a tap should hide controls quickly
        this.setState({ controlsState: CONTROL_STATES.HIDING });
        this._hideControls(true);
        break;
      case CONTROL_STATES.HIDDEN:
        // If the controls are currently, show controls with fade-in animation
        this._showControls();
        this.setState({ controlsState: CONTROL_STATES.SHOWING });
        break;
      case CONTROL_STATES.HIDING:
        // If controls are fading out, a tap should reverse, and show controls
        this.setState({ controlsState: CONTROL_STATES.SHOWING });
        this._showControls();
        break;
      case CONTROL_STATES.SHOWING:
        // A tap when the controls are fading in should do nothing
        break;
      default:
        break;
    }
  }

  _showControls() {
    this.showingAnimation = Animated.timing(this.state.controlsOpacity, {
      toValue: 1,
      duration: this.props.fadeInDuration,
      useNativeDriver: true,
    });

    this.showingAnimation.start(({ finished }) => {
      if (finished) {
        this.setState({ controlsState: CONTROL_STATES.SHOWN });
        this._resetControlsTimer();
      }
    });
  }

  _hideControls(immediate = false) {
    if (this.controlsTimer) {
      clearTimeout(this.controlsTimer);
    }
    this.hideAnimation = Animated.timing(this.state.controlsOpacity, {
      toValue: 0,
      duration: immediate ? this.props.quickFadeOutDuration : this.props.fadeOutDuration,
      useNativeDriver: true,
    });
    this.hideAnimation.start(({ finished }) => {
      if (finished) {
        this.setState({ controlsState: CONTROL_STATES.HIDDEN });
      }
    });
  }

  _onTimerDone() {
    // After the controls timer runs out, fade away the controls slowly
    this.setState({ controlsState: CONTROL_STATES.HIDING });
    this._hideControls();
  }

  _resetControlsTimer() {
    if (this.controlsTimer) {
      clearTimeout(this.controlsTimer);
    }
    this.controlsTimer = setTimeout(
      () => this._onTimerDone(),
      this.props.hideControlsTimerDuration,
    );
  }

  render() {
    const { width } = Dimensions.get('window');
    const height = width * (9 / 16);
    return (
      <TouchableWithoutFeedback onPress={this._toggleControls.bind(this)}>
        <View style={styles.container}>
          <Video
            source={{ uri: 'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8' }}
            ref={(component) => {
              this._playbackInstance = component;
            }}
            shouldPlay={false}
            resizeMode="cover"
            style={{ width, height }}
            useNativeControls={false}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

VideoPlayer.propTypes = {
  /**
   * How long should the fadeIn animation for the controls run? (in milliseconds)
   * Default value is 200.
   *
   */
  fadeInDuration: PropTypes.number,
  /**
   * How long should the fadeOut animation run? (in milliseconds)
   * Default value is 1000.
   *
   */
  fadeOutDuration: PropTypes.number,
  /**
   * How long should the fadeOut animation run when the screen is tapped when the controls are visible? (in milliseconds)
   * Default value is 200.
   *
   */
  quickFadeOutDuration: PropTypes.number,
  /**
   * If the user has not interacted with the controls, how long should the controls stay visible? (in milliseconds)
   * Default value is 4000.
   *
   */
  hideControlsTimerDuration: PropTypes.number,

  /**
   * Callback that gets passed `playbackStatus` objects for the underlying video element
   */
  playbackCallback: PropTypes.func,

  /**
   * Error callback (lots of errors are non-fatal and the video will continue to play)
   */
  errorCallback: PropTypes.func,

  // Icons
  playIcon: PropTypes.func,
  pauseIcon: PropTypes.func,
  spinner: PropTypes.func,
  fullscreenEnterIcon: PropTypes.func,
  fullscreenExitIcon: PropTypes.func,

  showFullscreenButton: PropTypes.bool,

  /**
   * Style to use for the all the text in the videoplayer including seek bar times and error messages
   */
  textStyle: PropTypes.object,

  /**
   * Props to use into the underlying <Video>. Useful for configuring autoplay, playback speed, and other Video properties.
   * See Expo documentation on <Video>. `source` is required.
   */
  videoProps: PropTypes.object,

  /**
   * Write internal logs to console
   */
  debug: PropTypes.bool,

  // Dealing with fullscreen
  isPortrait: PropTypes.bool,
  switchToLandscape: PropTypes.func,
  switchToPortrait: PropTypes.func,

  showControlsOnLoad: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  // Animations
  fadeInDuration: 200,
  fadeOutDuration: 1000,
  quickFadeOutDuration: 200,
  hideControlsTimerDuration: 4000,
  // Appearance (assets and styles)
  showFullscreenButton: true,
  textStyle: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  // Callbacks
  playbackCallback: () => {},
  errorCallback: (error) => {
    console.log('Error: ', error.message, error.type, error.obj);
  },
  debug: false,
  switchToLandscape: () => {
    console.warn('Pass in this function `switchToLandscape` in props to enable fullscreening');
  },
  switchToPortrait: () => {
    console.warn('Pass in this function `switchToLandscape` in props to enable fullscreening');
  },
  showControlsOnLoad: false,
};
export default VideoPlayer;
