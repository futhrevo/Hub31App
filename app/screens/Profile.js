import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Meteor from 'react-native-meteor';
import { ButtonGroup } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import { styles as styled } from '../components/MyCourses';
import { Container } from '../components/Container';
import { MyProfile } from '../components/MyProfile';
import { ChangePassword } from '../components/ChangePassword';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = EStyleSheet.create({
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '$positive',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ selectedIndex });
  }

  renderContent() {
    const { selectedIndex } = this.state;
    switch (selectedIndex) {
      case 0:
        return <MyProfile />;
      case 1:
        return <Text>Hello Courses</Text>;
      case 2:
        return <ChangePassword />;
      default:
        return <Text>Hello Profile</Text>;
    }
  }

  render() {
    const buttons = ['PROFILE', 'COURSES', 'PASSWORD'];
    const { selectedIndex } = this.state;
    return (
      <Container>
        <ButtonGroup
          containerStyle={[styled.containerStyle, { marginTop: 50 }]}
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedButtonStyle={styled.selectedButtonStyle}
          textStyle={styled.textStyle}
          underlayColor="white"
        />
        {this.renderContent()}
        <TouchableOpacity style={styles.footer}>
          <Text style={styles.footerText}>LOG OUT</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Profile;
