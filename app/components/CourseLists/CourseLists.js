import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Meteor, { withTracker } from 'meteorjs-client';

import { CourseTile } from '../CourseTile';
import { Loading } from '../Loading';
import styles from './styles';

const CourseLists = (props) => {
  const { doc, courses, loading } = props;
  if (loading) {
    return <Loading />;
  }
  return (
    <View>
      <FlatList
        horizontal
        data={courses}
        renderItem={({ item }) => <CourseTile course={item} />}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={<CourseTile Header={doc.name} />}
      />
    </View>
  );
};

CourseLists.propTypes = {
  doc: PropTypes.object,
  courses: PropTypes.array,
  loading: PropTypes.bool,
};
export default withTracker((props) => {
  const { specId } = props;
  if (typeof specId === 'undefined') {
    return {
      loading: true,
    };
  }
  const sub = Meteor.subscribe('courses.list', specId);
  Meteor.subscribe('specialization.view', specId);
  return {
    loading: !sub.ready(),
    courses: Meteor.collection('Courses').find(
      { specialization_id: specId },
      { sort: { name: 1 } },
    ),
    doc: Meteor.collection('Specializations').findOne({ _id: specId }) || {
      name: '',
      description: '',
    },
  };
})(withNavigation(CourseLists));
