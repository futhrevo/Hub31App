import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';

import { CourseCoverImage } from '../CourseCoverImage';
import { Loading } from '../Loading';
import { NoData } from '../NoData';
import { connectAlert } from '../Alert';
import Images from '../Images';

import styles from './styles';

class CourseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleJoinCourse() {
    const { _id } = this.props.doc;
    if (this.props.isBought) {
      this.props.navigation.navigate('Classroom', { documentId: _id });
    } else {
      Meteor.call('courses.join', _id, (error) => {
        if (error) {
          this.props.alertWithType('error', 'Error', error.reason);
        } else {
          this.props.alertWithType('success', 'Success', 'Joined Course');
        }
      });
    }
  }

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const {
      error,
      loading,
      doc,
      isBought,
      spec,
      outline,
      createdby,
      taughtby,
      csession,
    } = this.props;
    if (error) {
      return <NoData msg="Course Info not found" />;
    }
    if (loading) {
      return <Loading />;
    }
    const url = doc.name.substring(0, 2);
    return (
      <View style={styles.container}>
        <ScrollView>
          <CourseCoverImage url={Images[url]} title={`${doc.name} - ${doc.profession}`} />

          <Text style={styles.specText}>{spec.name}</Text>
          <Divider style={styles.divider} />
          <View style={styles.body}>
            <Text style={styles.specText}>Introduction</Text>
            <Text style={styles.paragraph}>{doc.content}</Text>
            <Text style={styles.specText}>Outline</Text>
            <FlatList
              data={outline}
              renderItem={({ item }) => <ListItem title={item.description} />}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.footer} onPress={() => this.handleJoinCourse()}>
          <Text style={styles.footerText}>{isBought ? 'GO TO CLASSROOM' : 'Enroll'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

CourseView.propTypes = {
  navigation: PropTypes.object,
  error: PropTypes.bool,
  doc: PropTypes.object,
  spec: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  isBought: PropTypes.bool.isRequired,
  outline: PropTypes.array,
  createdby: PropTypes.object,
  taughtby: PropTypes.object,
  csession: PropTypes.object,
  alertWithType: PropTypes.func,
};

export default createContainer((props) => {
  const { documentId, specId } = props;
  if (documentId === '') {
    return {
      error: true,
    };
  }
  const subscription = Meteor.subscribe('courses.view', documentId);
  const sub1 = Meteor.subscribe('specialization.view', specId);
  const sub2 = Meteor.subscribe('encourses.view', documentId);
  return {
    error: false,
    loading: !subscription.ready() && !sub1.ready() && !sub2.ready(),
    doc: Meteor.collection('Courses').findOne(documentId) || {},
    spec: Meteor.collection('Specializations').findOne(specId) || { name: '' },
    isBought:
      Meteor.collection('EnCourses', { cursoredFind: true })
        .find({ course_id: documentId })
        .count() > 0 || false,
    outline: Meteor.collection('Chapters').find(
      { course_id: documentId },
      { sort: { chapter_no: 1 } },
    ),
    createdby: Meteor.collection('CreatedBy').findOne({ course_id: documentId }) || {},
    taughtby: Meteor.collection('OnCourse').findOne({ course_id: documentId }) || {},
    csession: Meteor.collection('CSessions').findOne({ course_id: documentId }) || {},
  };
}, withNavigation(connectAlert(CourseView)));
