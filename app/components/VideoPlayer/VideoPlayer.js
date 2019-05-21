import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, Animated, BackHandler, StatusBar, Text, Alert,
} from 'react-native';
import Video from 'react-native-video';
import { withNavigation } from 'react-navigation';
import Icons from 'react-native-vector-icons/MaterialIcons';
import KeepAwake from 'react-native-keep-awake';
import Orientation from 'react-native-orientation';

import { Controls } from './components';
import styles from './styles';

const Win = Dimensions.get('window');

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      muted: false,
      loading: false,
      fullScreen: false,
      inlineHeight: Win.width * 0.5625,
      duration: 0,
      progress: 0,
      currentTime: 0,
      seeking: false,
      renderError: false,
    };
    this.animInline = new Animated.Value(Win.width * 0.5625);
    this.animFullscreen = new Animated.Value(Win.width * 0.5625);
    this.BackHandler = this.BackHandler.bind(this);
    this.onRotated = this.onRotated.bind(this);
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onRotated);
    BackHandler.addEventListener('hardwareBackPress', this.BackHandler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onRotated);
    BackHandler.removeEventListener('hardwareBackPress', this.BackHandler);
    Orientation.lockToPortrait();
  }

  onLoadStart() {
    this.setState({ paused: true, loading: true });
  }

  onLoad(data) {
    if (!this.state.loading) return;

    const { height, width } = data.naturalSize;
    const ratio = height === 'undefined' && width === 'undefined' ? 9 / 16 : height / width;
    const inlineHeight = Win.width * ratio;
    this.setState(
      {
        loading: false,
        inlineHeight,
        duration: data.duration,
      },
      () => {
        Animated.timing(this.animInline, { toValue: inlineHeight, duration: 200 }).start();
        if (!this.state.paused) {
          KeepAwake.activate();
        }
      },
    );
  }

  onEnd() {
    this.onSeekRelease(0);
    this.setState({ currentTime: 0 }, () => {
      this.controls.showControls();
    });
  }

  onRotated({ window: { width, height } }) {
    if (width > height) {
      this.props.onFullScreen(true);
      this.props.navigation.setParams({
        fullscreen: true,
      });
      this.setState({ fullScreen: true }, () => {
        this.animToFullscreen(height);
      });
    } else {
      this.props.onFullScreen(false);
      this.props.navigation.setParams({
        fullscreen: false,
      });
      this.setState({ fullScreen: false }, () => {
        this.animToInline();
      });
    }
  }

  onSeekRelease(pos) {
    const newPosition = pos * this.state.duration;
    this.setState({ progress: pos, seeking: false }, () => {
      this.player.seek(newPosition);
    });
  }

  onError(msg) {
    this.setState({ renderError: true }, () => {
      return Alert.alert(
        'Oops!',
        'There was an error playing this video, please try again later.',
        [{ text: 'Close' }],
      );
    });
  }

  BackHandler() {
    if (this.state.fullScreen) {
      this.setState({ fullScreen: false }, () => {
        this.animToInline();
        Orientation.lockToPortrait();
      });
      return true;
    }
    return false;
  }

  pause() {
    if (!this.state.paused) this.togglePlay();
  }

  play() {
    if (this.state.paused) this.togglePlay();
  }

  togglePlay() {
    this.setState({ paused: !this.state.paused }, () => {
      Orientation.getOrientation((e, orientation) => {
        if (!this.state.paused) {
          KeepAwake.activate();
        } else {
          KeepAwake.deactivate();
        }
      });
    });
  }

  toggleFS() {
    this.setState({ fullScreen: !this.state.fullScreen }, () => {
      Orientation.getOrientation((e, orientation) => {
        if (this.state.fullScreen) {
          const initialOrient = Orientation.getInitialOrientation();
          const height = orientation !== initialOrient ? Win.width : Win.height;
          this.animToFullscreen(height);
          Orientation.lockToLandscape();
        } else {
          this.animToInline();
          Orientation.lockToPortrait();
        }
      });
    });
  }

  animToInline(height) {
    const newHeight = height || this.state.inlineHeight;
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: newHeight, duration: 100 }),
      Animated.timing(this.animInline, { toValue: this.state.inlineHeight, duration: 100 }),
    ]).start();
  }

  animToFullscreen(height) {
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: height, duration: 200 }),
      Animated.timing(this.animInline, { toValue: height, duration: 200 }),
    ]).start();
  }

  toggleMute() {
    this.setState({ muted: !this.state.muted });
  }

  seek(val) {
    const currentTime = val * this.state.duration;
    this.setState({ seeking: true, currentTime });
  }

  progress(time) {
    const { currentTime } = time;
    const progress = currentTime / this.state.duration;
    if (!this.state.seeking) {
      this.setState({ progress, currentTime });
    }
  }

  renderError() {
    const { fullScreen } = this.state;
    const inline = {
      height: this.animInline,
      alignSelf: 'stretch',
    };
    const textStyle = { color: 'white', padding: 10 };
    return (
      <Animated.View style={[styles.background, fullScreen ? styles.fullScreen : inline]}>
        <Text style={textStyle}>Retry</Text>
        <Icons
          name="replay"
          size={60}
          color="white"
          onPress={() => this.setState({ renderError: false })}
        />
      </Animated.View>
    );
  }

  renderPlayer() {
    const {
      paused,
      fullScreen,
      inlineHeight,
      muted,
      loading,
      progress,
      duration,
      currentTime,
    } = this.state;
    const { url, cookies } = this.props;
    const inline = {
      height: inlineHeight,
      alignSelf: 'stretch',
    };
    return (
      <Animated.View
        style={[
          styles.background,
          fullScreen
            ? (styles.fullScreen, { height: this.animFullscreen })
            : { height: this.animInline },
        ]}
      >
        <StatusBar hidden={fullScreen} />
        <Video
          ref={(ref) => {
            this.player = ref;
          }}
          source={{ uri: url, cookies }}
          rate={1.0} // 0 is paused, 1 is normal.
          volume={1.0} // 0 is muted, 1 is normal.
          muted={muted} // Mutes the audio entirely.
          paused={paused}
          style={fullScreen ? styles.fullScreen : inline}
          resizeMode="contain"
          onLoadStart={() => this.onLoadStart()} // Callback when video starts to load
          onLoad={(e) => this.onLoad(e)} // Callback when video loads
          onProgress={(e) => this.progress(e)} // Callback every ~250ms with currentTime
          onEnd={() => this.onEnd()}
          onError={(e) => this.onError(e)}
        />
        <Controls
          ref={(ref) => {
            this.controls = ref;
          }}
          toggleMute={() => this.toggleMute()}
          toggleFS={() => this.toggleFS()}
          togglePlay={() => this.togglePlay()}
          paused={paused}
          muted={muted}
          fullscreen={fullScreen}
          loading={loading}
          onSeek={(val) => this.seek(val)}
          onSeekRelease={(pos) => this.onSeekRelease(pos)}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          logo={null}
          theme="white"
        />
      </Animated.View>
    );
  }

  render() {
    if (this.state.renderError) return this.renderError();
    return this.renderPlayer();
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  cookies: PropTypes.object,
  navigation: PropTypes.object,
  onFullScreen: PropTypes.func,
};

export default withNavigation(VideoPlayer);
