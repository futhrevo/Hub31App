import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import styles from './styles';

const CourseTile = (props) => {
  if (props.Header) {
    return (
      <Card containerStyle={[styles.container, styles.containerHeader]}>
        <Text style={[styles.text, styles.textHeader]}>{props.Header}</Text>
      </Card>
    );
  }
  return (
    <TouchableOpacity onPress={() => null}>
      <Card image={props.url} containerStyle={styles.container} imageStyle={styles.imageStyle}>
        <Text style={styles.text}>{props.title}</Text>
      </Card>
    </TouchableOpacity>
  );
};

CourseTile.propTypes = {
  url: PropTypes.number,
  title: PropTypes.string,
  Header: PropTypes.string,
};

export default CourseTile;
