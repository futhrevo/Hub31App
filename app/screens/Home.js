import React from 'react';
import { StatusBar } from 'react-native';
// import Meteor, { createContainer } from 'react-native-meteor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { MyCourses } from '../components/MyCourses';
import { Loading } from '../components/Loading';

import { getJoinedCourses, fetchJoinedCourses } from '../redux/ui/home/action';

class Home extends React.Component {
  static navigationOptions = {
    title: 'My Courses',
  };

  componentDidMount() {
    this.props.fetchData();
    this.props.readData();
  }
  render() {
    const { discovering } = this.props;
    return (
      <Container safe>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated />
        {discovering ? <Loading /> : <MyCourses />}
      </Container>
    );
  }
}

Home.propTypes = {
  discovering: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
  readData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchJoinedCourses()),
    readData: () => dispatch(getJoinedCourses()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
