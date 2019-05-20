import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Meteor, { withTracker } from 'react-native-meteor';
import PropTypes from 'prop-types';

import { Loading } from '../Loading';
import { NoData } from '../NoData';
import { connectAlert } from '../Alert';
import styles from './styles';

class DocumentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: new Date(),
    };
    this.markread = this.markread.bind(this);
  }

  markread() {
    const { eid, mat } = this.props;
    const { started } = this.state;
    const updoc = {
      material_id: mat._id,
      enrolled_course_id: eid,
      started,
    };
    Meteor.call('results.readdoc', updoc, (error) => {
      if (error) {
        this.props.alertWithType('error', 'Error', `${error.reason}`);
      }
    });
  }

  render() {
    const { loading, doc, res } = this.props;
    const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
    if (loading) {
      return <Loading />;
    }
    if (!doc) {
      return <NoData msg="No Document found" />;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.specText}>{doc && doc.title}</Text>
          <Text style={styles.paragraph}>{doc && doc.body}</Text>
          {!done ? (
            <Button
              buttonStyle={styles.actionBtn}
              title="Mark as Complete"
              onPress={() => this.markread()}
            />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

DocumentView.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  eid: PropTypes.string,
  mat: PropTypes.object,
  res: PropTypes.object,
  alertWithType: PropTypes.func,
};

export default withTracker((props) => {
  const documentId = props.mat.material_link;
  const subscription = Meteor.subscribe('documents.view', documentId);
  return {
    loading: !subscription.ready(),
    doc: Meteor.collection('Documents').findOne(documentId) || {},
    res: Meteor.collection('StuResults').findOne({ material_id: props.mat._id }) || {},
  };
})(withNavigation(connectAlert(DocumentView)));
/**
        <View style={styles.navbar}>
          <Button
            title="Previous"
            titleStyle={styles.navTitle}
            icon={<Icon name="chevron-left" type="entypo" />}
            clear
          />
          <Button
            title="Next"
            titleStyle={styles.navTitle}
            iconRight
            icon={<Icon name="chevron-right" type="entypo" />}
            clear
          />
        </View>
* */
