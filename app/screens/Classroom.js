import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import Meteor, { createContainer } from 'react-native-meteor';

import { Container } from '../components/Container';
import { CourseChapter } from '../components/CourseChapter';
import { Loading } from '../components/Loading';
import { NoData } from '../components/NoData';

class Classroom extends React.Component {
  static navigationOptions = {
    title: 'Outline',
  };

  render() {
    const {
      error, loading, loading2, ...props
    } = this.props;
    if (error) {
      return <NoData msg="Course Info not found" />;
    }
    if (loading && loading2) {
      return <Loading />;
    }
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <CourseChapter {...props} />
      </Container>
    );
  }
}

Classroom.propTypes = {
  error: PropTypes.bool,
  loading: PropTypes.bool,
  loading2: PropTypes.bool,
  doc: PropTypes.object,
  chaps: PropTypes.object,
  mats: PropTypes.array,
  loadingMats: PropTypes.bool,
  doc2: PropTypes.object,
  loadingRlts: PropTypes.bool,

  rlts: PropTypes.array,
};

export default createContainer((props) => {
  const documentId = props.navigation.getParam('documentId', '');
  if (documentId === '') {
    return {
      error: true,
    };
  }
  let chapterId = documentId;

  const subscription = Meteor.subscribe('courses.view', documentId);
  const encourseSub = Meteor.subscribe('encourses.view', documentId);
  const materialsub = Meteor.subscribe('materials.view', documentId);
  const resultsSub = Meteor.subscribe('sturesults.view', documentId);
  if (subscription.ready() && encourseSub.ready()) {
    const encourse = Meteor.collection('EnCourses').findOne({ course_id: documentId });
    if (Object.prototype.hasOwnProperty.call(encourse, 'status_id')) {
      const status = encourse.status_id;
      const [chapter] = status;
      chapterId = Meteor.collection('Chapters').findOne(
        { course_id: documentId, chapter_no: chapter },
        { fields: { _id: 1 } },
      )._id;
    }
  }
  return {
    error: false,
    loading: !subscription.ready(),
    loading2: !encourseSub.ready(),
    loadingMats: !materialsub.ready(),
    loadingRlts: !resultsSub.ready(),
    doc: Meteor.collection('Courses').findOne(documentId) || {},
    doc2: Meteor.collection('EnCourses').findOne({ course_id: documentId }) || {},
    chaps: Meteor.collection('Chapters').findOne({ _id: chapterId }) || {},
    mats:
      chapterId === documentId
        ? []
        : Meteor.collection('Materials').find(
          { chapter_id: chapterId },
          { sort: { material_no: 1 } },
        ),
    rlts: [],
  };
}, Classroom);
