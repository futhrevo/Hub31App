import React from 'react';
import { View, Image, Keyboard, Animated, Platform, StyleSheet } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };
  }

  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardDidShowListener = Keyboard.addListener(
      `keyboard${name}Show`,
      this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      `keyboard${name}Hide`,
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = () => {
    Animated.parallel([
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  render() {
    const imageStyles = [
      styles.logoImage,
      { width: this.state.imageWidth, height: this.state.imageWidth },
    ];
    return (
      <View style={styles.container}>
        <Animated.View style={styles.logobox}>
          <Animated.Image
            resizeMode="contain"
            style={imageStyles}
            source={require('../../../assets/logo.png')}
          />
        </Animated.View>
      </View>
    );
  }
}

export default Logo;
