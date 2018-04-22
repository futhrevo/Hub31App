import React from 'react';
import { PropTypes } from 'prop-types';
import { ImageBackground, View, Text } from 'react-native';

import styles from './styles';

const CourseCoverImage = (props) => {
  return (
    <ImageBackground style={styles.coverImage} source={props.url}>
      <View style={styles.overlay}>
        <View style={styles.overlayText}>
          <Text adjustsFontSizeToFit style={styles.title}>
            {props.title}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

CourseCoverImage.propTypes = {
  url: PropTypes.number,
  title: PropTypes.string,
};

export default CourseCoverImage;
