import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const CourseCard = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('CoursePage')}>
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
};

CourseCard.propTypes = {
  url: PropTypes.number,
  title: PropTypes.string,
  navigation: PropTypes.object,
};
export default withNavigation(CourseCard);
