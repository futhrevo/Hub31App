import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Animated, BackHandler, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const Win = Dimensions.get('window');

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      loading: false,
      fullScreen: false,
      inlineHeight: Win.width * 0.5625,
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
  }

  onRotated({ window: { width, height } }) {
    if (width > height) {
      this.props.navigation.setParams({
        fullscreen: true,
      });
      this.setState({ fullScreen: true }, () => {
        this.animToFullscreen(height);
      });
    } else {
      this.props.navigation.setParams({
        fullscreen: false,
      });
      this.setState({ fullScreen: false }, () => {
        this.animToInline();
      });
    }
  }

  BackHandler() {
    if (this.state.fullScreen) {
      this.setState({ fullScreen: false }, () => {
        this.animToInline();
      });
      return true;
    }
    return false;
  }

  animToFullscreen(height) {
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: height, duration: 200 }),
      Animated.timing(this.animInline, { toValue: height, duration: 200 }),
    ]).start();
  }

  animToInline(height) {
    const newHeight = height || this.state.inlineHeight;
    Animated.parallel([
      Animated.timing(this.animFullscreen, { toValue: newHeight, duration: 100 }),
      Animated.timing(this.animInline, { toValue: this.state.inlineHeight, duration: 100 }),
    ]).start();
  }

  render() {
    const { paused, fullScreen, inlineHeight } = this.state;
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
          muted={false} // Mutes the audio entirely.
          paused={paused}
          style={fullScreen ? styles.fullScreen : inline}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  cookies: PropTypes.object,
  navigation: PropTypes.object,
};

export default withNavigation(VideoPlayer);
