import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CourseCard } from '../CourseCard';
import { Loading } from '../Loading';
import { NoData } from '../NoData';
import { getCompletedCourses } from '../../redux/selectors/getCompletedCourses';

const Completed = (props) => {
  const { docs, discovering } = props;
  if (discovering) {
    return <Loading />;
  }
  if (docs.length === 0) {
    return <NoData msg="No Courses Completed yet" />;
  }
  return <ScrollView>{docs.map((data) => <CourseCard key={data._id} data={data} />)}</ScrollView>;
};

Completed.propTypes = {
  docs: PropTypes.array,
  discovering: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    docs: getCompletedCourses(state) || [],
  };
};

export default connect(
  mapStateToProps,
  null,
)(withNavigation(Completed));
