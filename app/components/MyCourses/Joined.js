import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CourseCard } from '../CourseCard';
import { Loading } from '../Loading';
import { NoData } from '../NoData';
import { getJoinedCourses } from '../../redux/selectors/getJoinedCourses';

const Joined = (props) => {
  const { docs, discovering } = props;
  if (discovering) {
    return <Loading />;
  }
  if (docs.length === 0) {
    return <NoData msg="No Courses Joined yet" />;
  }
  return <ScrollView>{docs.map((data) => <CourseCard key={data._id} data={data} />)}</ScrollView>;
};

Joined.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    docs: getJoinedCourses(state) || [],
  };
};

export default connect(
  mapStateToProps,
  null,
)(withNavigation(Joined));
