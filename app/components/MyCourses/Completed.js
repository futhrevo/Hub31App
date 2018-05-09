import React from 'react';
import { ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';
import _ from 'underscore';
import PropTypes from 'prop-types';

import { CourseCard } from '../CourseCard';
import { Loading } from '../Loading';
import { NoData } from '../NoData';

const joined = [
  {
    key: 1,
    url: require('../../../assets/F1.jpg'),
    title: 'F1 - Accountant in Business',
  },
  {
    key: 2,
    url: require('../../../assets/F2.jpg'),
    title: 'F2 - Management Accounting',
  },
];
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

export default createContainer(() => {
  const subscription = Meteor.subscribe('courses.viewJoined');
  const pref = Meteor.collection('EnCourses').find({ done: true }, { fields: { course_id: 1 } });
  let ids = [];
  if (pref) {
    ids = _.pluck(pref, 'course_id');
  }
  return {
    discovering: !subscription.ready(),
    docs: Meteor.collection('Courses').find({ _id: { $in: ids } }, { sort: { name: 1 } }),
  };
}, withNavigation(Completed));
