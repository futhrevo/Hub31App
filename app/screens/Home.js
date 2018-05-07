import React from 'react';
import { StatusBar } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import PropTypes from 'prop-types';

import { Container } from '../components/Container';
import { MyCourses } from '../components/MyCourses';
import { Loading } from '../components/Loading';

class Home extends React.Component {
  static navigationOptions = {
    title: 'My Courses',
  };

  render() {
    const { discovering } = this.props;
    return (
      <Container safe>
        <StatusBar translucent={false} barStyle="light-content" />
        {discovering ? <Loading /> : <MyCourses />}
      </Container>
    );
  }
}

Home.propTypes = {
  discovering: PropTypes.bool,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('courses.viewJoinedVerb');
  return {
    discovering: !subscription.ready(),
  };
}, Home);
