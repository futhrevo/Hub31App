import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Container } from '../Container';

import styles from './styles';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }
  render() {
    const { checked } = this.state;
    return (
      <Container safe>
        <ScrollView contentContainerStyle={styles.container}>
          <ListItem
            title="RAKESH"
            subtitle="First Name"
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            bottomDivider
            chevron
          />
          <ListItem
            title="KALYANKAR"
            subtitle="Last Name"
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            bottomDivider
            chevron
          />
          <ListItem
            title="admin@hub31.com"
            subtitle="E mail"
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            bottomDivider
            chevron
          />
          <ListItem
            title="Notifications"
            switch={{
              value: checked,
              onValueChange: () => this.setState({ checked: !checked }),
              onTintColor: '#ff8100',
            }}
            titleStyle={styles.titleStyle}
            bottomDivider
          />
        </ScrollView>
      </Container>
    );
  }
}

export default MyProfile;
