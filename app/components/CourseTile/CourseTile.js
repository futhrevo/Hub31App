import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import Images from '../Images';
import styles from './styles';

const CourseTile = (props) => {
  if (props.Header) {
    return (
      <Card containerStyle={[styles.container, styles.containerHeader]}>
        <Text style={[styles.text, styles.textHeader]}>{props.Header}</Text>
      </Card>
    );
  }
  if (!props.course) {
    return null;
  }
  const { course } = props;
  const url = course.name.substring(0, 2);
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('CoursePage', {
          course,
        });
      }}
    >
      <Card image={Images[url]} containerStyle={styles.container} imageStyle={styles.imageStyle}>
        <Text style={styles.text}>{`${course.name} - ${course.profession}`}</Text>
      </Card>
    </TouchableOpacity>
  );
};

CourseTile.propTypes = {
  course: PropTypes.object,
  Header: PropTypes.string,
  navigation: PropTypes.object,
};

export default withNavigation(CourseTile);
