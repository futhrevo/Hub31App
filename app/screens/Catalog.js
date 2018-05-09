import React from 'react';
import { StatusBar, ScrollView, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Container } from '../components/Container';
// import { CourseTile } from '../components/CourseTile';
import { CourseLists } from '../components/CourseLists';

const styles = EStyleSheet.create({
  titleStyle: {
    fontSize: '1rem',
    margin: 10,
    fontWeight: 'bold',
    color: '$tetra1',
  },
});

export default () => (
  <Container safe>
    <StatusBar translucent={false} barStyle="light-content" />
    <ScrollView>
      <Text style={styles.titleStyle}>ACCA - FUNDAMENTALS LEVEL</Text>
      <CourseLists specId="19" />
      <CourseLists specId="20" />
      <Text style={styles.titleStyle}>ACCA - PROFESSIONAL LEVEL</Text>
      <CourseLists specId="21" />
      <CourseLists specId="22" />
    </ScrollView>
  </Container>
);
