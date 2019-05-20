import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

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
    const { user } = this.props;
    const firstName = (user && user.profile && user.profile.name && user.profile.name.first) || '';
    const lastName = (user && user.profile && user.profile.name && user.profile.name.last) || '';
    const email = (user && user.emails && user.emails[0].address) || '';
    return (
      <Container safe>
        <ScrollView contentContainerStyle={styles.container}>
          <ListItem
            title={firstName}
            subtitle="First Name"
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            bottomDivider
            chevron
          />
          <ListItem
            title={lastName}
            subtitle="Last Name"
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            bottomDivider
            chevron
          />
          <ListItem
            title={email}
            subtitle="E mail"
            titleStyle={styles.titleStyle}
            subtitleStyle={styles.subtitleStyle}
            bottomDivider
          />
          <ListItem
            title="Notifications"
            switch={{
              value: checked,
              onValueChange: () => this.setState({ checked: !checked }),
              trackColor: '#ff8100',
            }}
            titleStyle={styles.titleStyle}
            bottomDivider
          />
        </ScrollView>
      </Container>
    );
  }
}

MyProfile.propTypes = {
  user: PropTypes.object,
};

export default MyProfile;
