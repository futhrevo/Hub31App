import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import Images from '../Images';

const CourseCard = (props) => {
  const { data } = props;
  const url = data.name.substring(0, 2);

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('CoursePage')}>
      <Card
        featuredTitle={`${data.name} - ${data.profession}`}
        image={Images[url]}
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
  navigation: PropTypes.object,
  data: PropTypes.object,
};
export default withNavigation(CourseCard);
