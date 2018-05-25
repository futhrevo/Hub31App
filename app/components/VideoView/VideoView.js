import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';
import PropTypes from 'prop-types';

import { Container } from '../Container';
import { VideoPlayer } from '../VideoPlayer';
import { Loading } from '../Loading';
import { NoData } from '../NoData';
import { connectAlert } from '../Alert';
import styles from './styles';

class VideoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookies: {},
      gotCookies: false,
      fullScreen: false,
    };
  }

  componentDidMount() {
    Meteor.call('vcookies.get', 'tester', (error, response) => {
      if (error) {
        this.props.alertWithType('error', 'Error', error.reason);
      } else if (Object.prototype.hasOwnProperty.call(response, 'CloudFront-Policy')) {
        const options = {
          secure: true,
          domain: 'hub31.com',
          path: '/',
        };
        console.log('setting cooker');
        this.setState({ gotCookies: true, cookies: response });
        // console.log(response);

        // for (let cid in response) {
        //   if (response.hasOwnProperty(cid)) {
        //     cookies.set(cid, response[cid], options);
        //   }
        // }
      } else {
        console.log('no response for vcookies');
      }
    });
  }

  setFullScreen = (truth) => {
    this.setState({ fullScreen: truth });
  };

  render() {
    const { gotCookies, cookies, fullScreen } = this.state;
    const { loading, vid, res } = this.props;
    const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
    if (loading || !gotCookies) {
      return <Loading />;
    }
    if (typeof vid === 'undefined' || !Object.prototype.hasOwnProperty.call(vid, 'link')) {
      return <NoData msg="No Video found" />;
    }
    // console.log(vid.link);
    return (
      <Container>
        <VideoPlayer debug url={vid.link} cookies={cookies} onFullScreen={this.setFullScreen} />
        {fullScreen ? <View style={styles.iphonex} /> : null}
        <ScrollView>
          <Text style={styles.specText}> React Native Video </Text>
        </ScrollView>
      </Container>
    );
  }
}
VideoView.propTypes = {
  loading: PropTypes.bool,
  vid: PropTypes.object,
  res: PropTypes.object,
  alertWithType: PropTypes.func,
};

export default createContainer((props) => {
  const videoId = props.mat.material_link;
  const subscription = Meteor.subscribe('videos.view', videoId);
  return {
    loading: !subscription.ready(),
    vid: Meteor.collection('Videos').findOne(videoId) || {},
    res: Meteor.collection('StuResults').findOne({ material_id: props.mat._id }) || {},
  };
}, withNavigation(connectAlert(VideoView)));
