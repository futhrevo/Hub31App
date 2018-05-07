import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Container } from '../Container';

import styles from './styles';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container safe>
        <ScrollView contentContainerStyle={styles.container}>
          <ListItem title="RAKESH" subtitle="First Name" />
          <ListItem title="KALYANKAR" subtitle="Last Name" />
          <ListItem title="admin@hub31.com" subtitle="E mail" />
        </ScrollView>
      </Container>
    );
  }
}

export default MyProfile;
