import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Meteor, { withTracker } from 'meteorjs-client';
import PropTypes from 'prop-types';

import WebViewAutoHeight from '../WebViewAutoHeight/WebViewAutoHeight';
import { Loading } from '../Loading';
import { NoData } from '../NoData';
import { connectAlert } from '../Alert';
import styles from './styles';

class DocumentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: new Date(),
      doc: {},
      isFetched: false,
    };
    this.markread = this.markread.bind(this);
  }

  componentDidMount() {
    const { documentId } = this.props;
    Meteor.call('documents.getdoc', documentId, (err, res) => {
      if (err) {
        this.props.alertWithType('error', 'Error', `${err.reason}`);
      } else {
        this.setState({ doc: res, isFetched: true });
      }
    });
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
    const { loading, res } = this.props;
    const { doc, isFetched } = this.state;
    const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
    if (loading) {
      return <Loading />;
    }
    if (!isFetched) {
      return <Loading />;
    }
    if (Object.keys(doc).length === 0 && doc.constructor === Object) {
      return <NoData msg="No Document found" />;
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.specText}>{doc && doc.title}</Text>
          {!done ? (
            <Button
              buttonStyle={styles.actionBtn}
              title="Mark as Complete"
              onPress={() => this.markread()}
            />
          ) : null}
          <WebViewAutoHeight source={{ html: `<body>${doc.body}</body>` }} />
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
  const documentId = props.mat._id;
  if (typeof documentId === 'undefined') {
    return {
      loading: true,
    };
  }
  return {
    loading: false,
    documentId,
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
