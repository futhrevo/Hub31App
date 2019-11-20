import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Meteor, { withTracker } from 'meteorjs-client';
import PropTypes from 'prop-types';
import CookieManager from 'react-native-cookies';
import _ from 'underscore';

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
      isSuffixFetched: false,
      isHeadFetched: false,
      video: {},
      showError: false,
      error: {},
      cookies: {},
      gotCookies: false,
      fullScreen: false,
    };
    this.displayError = this.displayError.bind(this);
    this.updateSuffix = this.updateSuffix.bind(this);
    this.getHeader = this.getHeader.bind(this);
  }

  componentDidMount() {
    this.updateSuffix();
    this.getHeader();
    this.timer = setInterval(() => this.updateSuffix(), 25000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getHeader() {
    const { _id } = this.props.mat;
    Meteor.call('videos.auth', _id, (error, res) => {
      if (error) {
        this.props.alertWithType('error', 'Error', `${error.reason}`);
      } else {
        const exp = new Date(new Date().getTime() + 1500000);
        const cookie = `Hub_auth=${res}; path=/sentry.key; expires=${exp.toGMTString()}; HttpOnly;`;
        CookieManager.setFromResponse('http://hub31.com', cookie).then(
          (result) => {
            // `res` will be true or false depending on success.
            console.log('CookieManager.setFromResponse =>', result);
            this.setState({ isHeadFetched: true });
          },
        );
      }
    });
  }

  updateSuffix() {
    const { _id } = this.props.mat;
    Meteor.call('vcookies.get', _id, true, (error, response) => {
      if (error) {
        this.props.alertWithType('error', 'Error', `${error.reason}`);
      } else if (
        Object.prototype.hasOwnProperty.call(response, 'signedCookies')
      ) {
        const promises = [];
        const exp = new Date(new Date().getTime() + 45000);
        _.each(response.signedCookies, (val, key) => {
          const cookie = `${key}=${val}; secure; expires=${exp.toGMTString()}; HttpOnly;`;
          console.log(cookie);
          const promise = CookieManager.setFromResponse(
            'https://media.hub31.com',
            cookie,
          );
          promises.push(promise);
        });
        Promise.all(promises).then((res) => {
          console.log(res);
          if (
            response &&
            Object.prototype.hasOwnProperty.call(response, 'vid')
          ) {
            this.setState({ video: response.vid, isSuffixFetched: true });
          }
        });
      } else {
        console.log('no response for vcookies');
      }
    });
  }

  setFullScreen = (truth) => {
    this.setState({ fullScreen: truth });
  };

  displayError(error) {
    this.setState({ error, showError: true });
  }

  render() {
    const { res, mat } = this.props;
    const {
      isSuffixFetched,
      video,
      showError,
      error,
      isHeadFetched,
      fullScreen,
    } = this.state;
    const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
    if (!isSuffixFetched || !isHeadFetched) {
      return <Loading />;
    }
    if (
      typeof video === 'undefined' ||
      !Object.prototype.hasOwnProperty.call(video, 'link')
    ) {
      return <NoData msg="No Video found" />;
    }
    // console.log(vid.link);
    return (
      <Container>
        <VideoPlayer
          debug
          url={
            'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-aes.ism/.m3u8'
          }
          onFullScreen={this.setFullScreen}
          poster={video.poster}
        />
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

export default withTracker((props) => {
  const videoId = props.mat.material_link;
  const subscription = Meteor.subscribe('videos.view', videoId);
  return {
    loading: !subscription.ready(),
    vid: Meteor.collection('Videos').findOne(videoId) || {},
    res:
      Meteor.collection('StuResults').findOne({ material_id: props.mat._id }) ||
      {},
  };
})(withNavigation(connectAlert(VideoView)));
