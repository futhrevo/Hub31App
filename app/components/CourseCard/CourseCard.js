import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import styles from './styles';

const CourseCard = (props) => (
  <TouchableOpacity onPress={() => null}>
    <Card
      featuredTitle={props.title}
      image={props.url}
      featuredSubtitle="0% completed"
      imageWrapperStyle={styles.imageWrapperStyle}
      imageStyle={styles.imageStyle}
      featuredTitleStyle={styles.titleStyle}
      featuredSubtitleStyle={styles.featuredSubtitleStyle}
      wrapperStyle={styles.wrapperStyle}
    />
  </TouchableOpacity>
);

CourseCard.propTypes = {
  url: PropTypes.number,
  title: PropTypes.string,
};
export default CourseCard;
