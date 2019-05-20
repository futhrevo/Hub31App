// import React from 'react';
// import {
//   View,
//   Animated,
//   Dimensions,
//   TouchableWithoutFeedback,
//   NetInfo,
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
//   Slider,
//   StatusBar,
// } from 'react-native';
// import { Video, Audio, ScreenOrientation } from 'expo';
// import PropTypes from 'prop-types';
// import timer from 'react-native-timer';
// import { Entypo } from '@expo/vector-icons';
// import { withNavigation } from 'react-navigation';

// import styles from './styles';

// // UI states
// const CONTROL_STATES = {
//   SHOWN: 'SHOWN',
//   SHOWING: 'SHOWING',
//   HIDDEN: 'HIDDEN',
//   HIDING: 'HIDDING',
// };

// const PLAYBACK_STATES = {
//   LOADING: 'LOADING',
//   PLAYING: 'PLAYING',
//   PAUSED: 'PAUSED',
//   BUFFERING: 'BUFFERING',
//   ERROR: 'ERROR',
//   ENDED: 'ENDED',
// };

// const SEEK_STATES = {
//   NOT_SEEKING: 'NOT_SEEKING',
//   SEEKING: 'SEEKING',
//   SEEKED: 'SEEKED',
// };
// // Don't show the Spinner for very short periods of buffering
// const BUFFERING_SHOW_DELAY = 200;

// class VideoPlayer extends React.Component {
//   static navigationOptions = ({ navigation }) => ({
//     header: navigation.state.params ? navigation.state.params.header : undefined,
//   });

//   constructor(props) {
//     super(props);
//     this.state = {
//       // Playback state
//       playbackState: PLAYBACK_STATES.LOADING,
//       lastPlaybackStateUpdate: Date.now(),
//       // Seeking state
//       seekState: SEEK_STATES.NOT_SEEKING,
//       // State comes from the playbackCallback
//       playbackInstancePosition: null,
//       playbackInstanceDuration: null,
//       shouldPlay: false,
//       isPortrait: true,
//       // Error message if we are in PLAYBACK_STATES.ERROR
//       error: null,
//       // Controls display state
//       controlsOpacity: new Animated.Value(props.showControlsOnLoad ? 1 : 0),
//       controlsState: props.showControlsOnLoad ? CONTROL_STATES.SHOWN : CONTROL_STATES.HIDDEN,
//     };
//     this._showControls = this._showControls.bind(this);
//     this._hideControls = this._hideControls.bind(this);
//     this._toggleControls = this._toggleControls.bind(this);
//     this._resetControlsTimer = this._resetControlsTimer.bind(this);
//     this._setupNetInfoListener = this._setupNetInfoListener.bind(this);
//     this._onTimerDone = this._onTimerDone.bind(this);
//     this.orientationChangeHandler = this.orientationChangeHandler.bind(this);
//     this._onConnectionChange = this._onConnectionChange.bind(this);
//     this._togglePlay = this._togglePlay.bind(this);
//     this._playbackCallback = this._playbackCallback.bind(this);
//     this._replay = this._replay.bind(this);
//     this._onSliderLayout = this._onSliderLayout.bind(this);
//     this._onSeekBarTap = this._onSeekBarTap.bind(this);
//     this.switchToLandscape = this.switchToLandscape.bind(this);
//     this.switchToPortrait = this.switchToPortrait.bind(this);
//   }

//   async componentDidMount() {
//     this._setupNetInfoListener();

//     if (this.state.controlsState === CONTROL_STATES.SHOWN) {
//       this._resetControlsTimer();
//     }

//     Dimensions.addEventListener('change', this.orientationChangeHandler);

//     // Set audio mode to play even in silent mode (like the YouTube app)
//     try {
//       Audio.setAudioModeAsync({
//         allowsRecordingIOS: false,
//         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//         playsInSilentModeIOS: true,
//         shouldDuckAndroid: true,
//         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//       });
//     } catch (e) {
//       this.props.errorCallback({
//         type: 'NON_FATAL',
//         message: 'setAudioModeAsync error',
//         obj: e,
//       });
//     }
//   }

//   componentWillUnmount() {
//     timer.clearTimeout(this);
//     NetInfo.removeEventListener('connectionChange', this._onConnectionChange);
//     Dimensions.removeEventListener('change', this.orientationChangeHandler);
//   }

//   orientationChangeHandler(dims) {
//     const { width, height } = dims.window;
//     const isLandscape = width > height;
//     if (this._playbackInstance != null) {
//       if (isLandscape) {
//         this.switchToLandscape();
//       } else {
//         this.switchToPortrait();
//       }
//     }
//     this.setState({ isPortrait: !isLandscape });
//     // this.props.navigation.setParams({ tabBarHidden: isLandscape });
//     ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
//   }

//   switchToLandscape() {
//     if (this._playbackInstance != null) {
//       this._playbackInstance.presentFullscreenPlayer();
//     }
//   }

//   switchToPortrait() {
//     if (this._playbackInstance != null) {
//       this._playbackInstance.dismissFullscreenPlayer();
//     }
//   }

//   // Listen for changes in network connectivity
//   _setupNetInfoListener() {
//     NetInfo.getConnectionInfo().then((connectionInfo) => {
//       this.props.debug && console.log('[networkState]', connectionInfo.type);
//       this.setState({ networkState: connectionInfo.type });
//     });
//     NetInfo.addEventListener('connectionChange', this._onConnectionChange);
//   }

//   _onConnectionChange(connectionInfo) {
//     this.props.debug && console.log('[networkState]', connectionInfo.type);
//     this.setState({ networkState: connectionInfo.type });
//   }

//   // Handle events during playback
//   _setPlaybackState(playbackState) {
//     if (this.state.playbackState !== playbackState) {
//       this.props.debug &&
//         console.log(
//           '[playback]',
//           this.state.playbackState,
//           ' -> ',
//           playbackState,
//           ' [seek] ',
//           this.state.seekState,
//           ' [shouldPlay] ',
//           this.state.shouldPlay,
//         );

//       this.setState({ playbackState, lastPlaybackStateUpdate: Date.now() });
//     }
//   }

//   _setSeekState(seekState) {
//     this.props.debug &&
//       console.log(
//         '[seek]',
//         this.state.seekState,
//         ' -> ',
//         seekState,
//         ' [playback] ',
//         this.state.playbackState,
//         ' [shouldPlay] ',
//         this.state.shouldPlay,
//       );

//     this.setState({ seekState });

//     // Don't keep the controls timer running when the state is seeking
//     if (seekState === SEEK_STATES.SEEKING) {
//       if (timer.timeoutExists(this, 'controlsTimer')) {
//         timer.clearTimeout(this, 'controlsTimer');
//       }
//     } else {
//       // Start the controls timer anew
//       this._resetControlsTimer();
//     }
//   }

//   _playbackCallback(playbackStatus) {
//     try {
//       this.props.playbackCallback(playbackStatus);
//     } catch (e) {
//       console.error('Uncaught error when calling props.playbackCallback', e);
//     }

//     if (!playbackStatus.isLoaded) {
//       if (playbackStatus.error) {
//         this._setPlaybackState(PLAYBACK_STATES.ERROR);
//         const errorMsg = `Encountered a fatal error during playback: ${playbackStatus.error}`;
//         this.setState({
//           error: errorMsg,
//         });
//         this.props.errorCallback({ type: 'FATAL', message: errorMsg, obj: {} });
//       }
//     } else {
//       // Update current position, duration, and `shouldPlay`
//       this.setState({
//         playbackInstancePosition: playbackStatus.positionMillis,
//         playbackInstanceDuration: playbackStatus.durationMillis,
//         shouldPlay: playbackStatus.shouldPlay,
//       });

//       /* Figure out what state should be next (only if we are not seeking, other the seek
//         action handlers control the playback state, not this callback)
//        */
//       if (
//         this.state.seekState === SEEK_STATES.NOT_SEEKING &&
//         this.state.playbackState !== PLAYBACK_STATES.ENDED
//       ) {
//         if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
//           this._setPlaybackState(PLAYBACK_STATES.ENDED);
//         } else if (this.state.networkState === 'none' && playbackStatus.isBuffering) {
//           // If the video is buffering but there is no Internet, you go to the ERROR state
//           this._setPlaybackState(PLAYBACK_STATES.ERROR);
//           this.setState({
//             error:
//               'You are probably offline. Please make sure you are connected to the Internet to watch this video',
//           });
//         } else {
//           this._setPlaybackState(this._isPlayingOrBufferingOrPaused(playbackStatus));
//         }
//       }
//     }
//   }

//   // Seeking
//   _getSeekSliderPosition() {
//     if (
//       this._playbackInstance != null &&
//       this.state.playbackInstancePosition != null &&
//       this.state.playbackInstanceDuration != null
//     ) {
//       return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
//     }
//     return 0;
//   }

//   _onSeekSliderValueChange = () => {
//     if (this._playbackInstance != null && this.state.seekState !== SEEK_STATES.SEEKING) {
//       this._setSeekState(SEEK_STATES.SEEKING);
//       /* A seek might have finished (SEEKED) but since we are not in NOT_SEEKING yet,
//       the `shouldPlay` flag is still false, but we really want it be the stored value from
//       before the previous seek */
//       this.shouldPlayAtEndOfSeek =
//         this.state.seekState === SEEK_STATES.SEEKED
//           ? this.shouldPlayAtEndOfSeek
//           : this.state.shouldPlay;
//       // Pause the video
//       this._playbackInstance.setStatusAsync({ shouldPlay: false });
//     }
//   };

//   _onSeekSliderSlidingComplete = async (value) => {
//     if (this._playbackInstance != null) {
//       // Seeking is done, so go to SEEKED, and set playbackState to BUFFERING
//       this._setSeekState(SEEK_STATES.SEEKED);
//       // If the video is going to play after seek, the user expects a spinner.
//       // Otherwise, the user expects the play button
//       this._setPlaybackState(this.shouldPlayAtEndOfSeek ? PLAYBACK_STATES.BUFFERING : PLAYBACK_STATES.PAUSED);
//       this._playbackInstance
//         .setStatusAsync({
//           positionMillis: value * this.state.playbackInstanceDuration,
//           shouldPlay: this.shouldPlayAtEndOfSeek,
//         })
//         .then((playbackStatus) => {
//           /**
//            * The underlying <Video> has successfully updated playback position
//            * TODO: If `shouldPlayAtEndOfSeek` is false, should we still set the playbackState to PAUSED?
//            * But because we setStatusAsync(shouldPlay: false), so the playbackStatus return value will be PAUSED.
//            * * */
//           this._setSeekState(SEEK_STATES.NOT_SEEKING);
//           this._setPlaybackState(this._isPlayingOrBufferingOrPaused(playbackStatus));
//         })
//         .catch((message) => {
//           this.props.debug && console.log('Seek error: ', message);
//         });
//     }
//   };

//   _isPlayingOrBufferingOrPaused = (playbackStatus) => {
//     if (playbackStatus.isPlaying) {
//       return PLAYBACK_STATES.PLAYING;
//     }

//     if (playbackStatus.isBuffering) {
//       return PLAYBACK_STATES.BUFFERING;
//     }

//     return PLAYBACK_STATES.PAUSED;
//   };

//   _onSeekBarTap = (evt) => {
//     if (
//       !(
//         this.state.playbackState === PLAYBACK_STATES.LOADING ||
//         this.state.playbackState === PLAYBACK_STATES.ENDED ||
//         this.state.playbackState === PLAYBACK_STATES.ERROR ||
//         this.state.controlsState !== CONTROL_STATES.SHOWN
//       )
//     ) {
//       const value = evt.nativeEvent.locationX / this.state.sliderWidth;
//       this._onSeekSliderValueChange();
//       this._onSeekSliderSlidingComplete(value);
//     }
//   };

//   // Capture the width of the seekbar slider for use in `_onSeekbarTap`
//   _onSliderLayout = (evt) => {
//     this.setState({ sliderWidth: evt.nativeEvent.layout.width });
//   };

//   // Controls view
//   _getMMSSFromMillis(millis) {
//     const totalSeconds = millis / 1000;
//     const seconds = Math.floor(totalSeconds % 60);
//     const minutes = Math.floor(totalSeconds / 60);

//     const padWithZero = (number) => {
//       const string = number.toString();
//       if (number < 10) {
//         return `0${string}`;
//       }
//       return string;
//     };
//     return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
//   }

//   // Controls Behavior
//   _replay() {
//     this._playbackInstance
//       .setStatusAsync({
//         shouldPlay: true,
//         positionMillis: 0,
//       })
//       .then(() => {
//         // Update playbackState to get out of ENDED state
//         this.setState({ playbackState: PLAYBACK_STATES.PLAYING });
//       });
//   }

//   _togglePlay() {
//     this.state.playbackState === PLAYBACK_STATES.PLAYING
//       ? this._playbackInstance.setStatusAsync({ shouldPlay: false })
//       : this._playbackInstance.setStatusAsync({ shouldPlay: true });
//   }

//   _onSeekBarTap = (evt) => {
//     if (
//       !(
//         this.state.playbackState === PLAYBACK_STATES.LOADING ||
//         this.state.playbackState === PLAYBACK_STATES.ENDED ||
//         this.state.playbackState === PLAYBACK_STATES.ERROR ||
//         this.state.controlsState !== CONTROL_STATES.SHOWN
//       )
//     ) {
//       const value = evt.nativeEvent.locationX / this.state.sliderWidth;
//       this._onSeekSliderValueChange();
//       this._onSeekSliderSlidingComplete(value);
//     }
//   };

//   _toggleControls() {
//     switch (this.state.controlsState) {
//       case CONTROL_STATES.SHOWN:
//         // If the controls are currently shown, a tap should hide controls quickly
//         this.setState({ controlsState: CONTROL_STATES.HIDING });
//         this._hideControls(true);
//         break;
//       case CONTROL_STATES.HIDDEN:
//         // If the controls are currently, show controls with fade-in animation
//         this._showControls();
//         this.setState({ controlsState: CONTROL_STATES.SHOWING });
//         break;
//       case CONTROL_STATES.HIDING:
//         // If controls are fading out, a tap should reverse, and show controls
//         this.setState({ controlsState: CONTROL_STATES.SHOWING });
//         this._showControls();
//         break;
//       case CONTROL_STATES.SHOWING:
//         // A tap when the controls are fading in should do nothing
//         break;
//       default:
//         break;
//     }
//   }

//   _showControls() {
//     this.showingAnimation = Animated.timing(this.state.controlsOpacity, {
//       toValue: 1,
//       duration: this.props.fadeInDuration,
//       useNativeDriver: true,
//     });

//     this.showingAnimation.start(({ finished }) => {
//       if (finished) {
//         this.setState({ controlsState: CONTROL_STATES.SHOWN });
//         this._resetControlsTimer();
//       }
//     });
//   }

//   _hideControls(immediate = false) {
//     if (timer.timeoutExists(this, 'controlsTimer')) {
//       timer.clearTimeout(this, 'controlsTimer');
//     }
//     this.hideAnimation = Animated.timing(this.state.controlsOpacity, {
//       toValue: 0,
//       duration: immediate ? this.props.quickFadeOutDuration : this.props.fadeOutDuration,
//       useNativeDriver: true,
//     });
//     this.hideAnimation.start(({ finished }) => {
//       if (finished) {
//         this.setState({ controlsState: CONTROL_STATES.HIDDEN });
//       }
//     });
//   }

//   _onTimerDone() {
//     // After the controls timer runs out, fade away the controls slowly
//     this.setState({ controlsState: CONTROL_STATES.HIDING });
//     this._hideControls();
//   }

//   _resetControlsTimer() {
//     if (timer.timeoutExists(this, 'controlsTimer')) {
//       timer.clearTimeout(this, 'controlsTimer');
//     }
//     timer.setTimeout(
//       this,
//       'controlsTimer',
//       () => this._onTimerDone(),
//       this.props.hideControlsTimerDuration,
//     );
//   }

//   render() {
//     const { width, height } = Dimensions.get('window');
//     const videoWidth = width;
//     let videoHeight = videoWidth * (9 / 16);
//     const containerStyles = [styles.container, { paddingTop: 0 }];
//     // Landscape
//     if (width > height) {
//       videoHeight = height;
//       containerStyles.push({ paddingTop: 0 });
//     }

//     const centeredContentWidth = 60;

//     const Control = ({
//       callback, center, children, ...otherProps
//     }) => (
//       <TouchableOpacity
//         {...otherProps}
//         onPress={() => {
//           callback();
//           this._resetControlsTimer();
//         }}
//       >
//         <View
//           style={
//             center
//               ? {
//                   backgroundColor: 'rgba(0, 0, 0, 0.4)',
//                   justifyContent: 'center',
//                   width: centeredContentWidth,
//                   height: centeredContentWidth,
//                   borderRadius: centeredContentWidth,
//                 }
//               : {}
//           }
//         >
//           {children}
//         </View>
//       </TouchableOpacity>
//     );

//     const CenteredView = ({ children, style, ...otherProps }) => (
//       <Animated.View
//         {...otherProps}
//         style={[
//           {
//             position: 'absolute',
//             left: (videoWidth - centeredContentWidth) / 2,
//             top: (videoHeight - centeredContentWidth) / 2,
//             width: centeredContentWidth,
//             height: centeredContentWidth,
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           style,
//         ]}
//       >
//         {children}
//       </Animated.View>
//     );

//     const ErrorText = ({ text }) => (
//       <View
//         style={{
//           position: 'absolute',
//           top: videoHeight / 2,
//           width: videoWidth - 40,
//           marginRight: 20,
//           marginLeft: 20,
//         }}
//       >
//         <Text style={[this.props.textStyle, { textAlign: 'center' }]}>{text}</Text>
//       </View>
//     );
//     const { url } = this.props;
//     return (
//       <TouchableWithoutFeedback onPress={() => this._toggleControls()}>
//         <View style={containerStyles}>
//           {!this.state.isPortrait ? <StatusBar hidden /> : null}
//           <Video
//             source={{ uri: url }}
//             ref={(component) => {
//               this._playbackInstance = component;
//             }}
//             onPlaybackStatusUpdate={(status) => this._playbackCallback(status)}
//             shouldPlay={false}
//             resizeMode={Video.RESIZE_MODE_CONTAIN}
//             style={{ width: videoWidth, height: videoHeight }}
//             useNativeControls={false}
//           />

//           {/* Spinner */}
//           {((this.state.playbackState === PLAYBACK_STATES.BUFFERING &&
//             Date.now() - this.state.lastPlaybackStateUpdate > BUFFERING_SHOW_DELAY) ||
//             this.state.playbackState === PLAYBACK_STATES.LOADING) && (
//             <CenteredView>
//               <ActivityIndicator size="small" color="#00ff00" />
//             </CenteredView>
//           )}

//           {/* Play/pause buttons */}
//           {(this.state.seekState === SEEK_STATES.NOT_SEEKING ||
//             this.state.seekState === SEEK_STATES.SEEKED) &&
//             (this.state.playbackState === PLAYBACK_STATES.PLAYING ||
//               this.state.playbackState === PLAYBACK_STATES.PAUSED) && (
//               <CenteredView
//                 style={{
//                   opacity:
//                     this.state.playbackState === PLAYBACK_STATES.PAUSED
//                       ? 1
//                       : this.state.controlsOpacity,
//                 }}
//               >
//                 <Control center callback={this._togglePlay}>
//                   {this.state.playbackState === PLAYBACK_STATES.PLAYING ? (
//                     <Entypo
//                       name="controller-paus"
//                       size={36}
//                       color="#fff"
//                       style={{ alignSelf: 'center' }}
//                     />
//                   ) : (
//                     <Entypo
//                       name="controller-play"
//                       size={36}
//                       color="#fff"
//                       style={{ alignSelf: 'center' }}
//                     />
//                   )}
//                 </Control>
//               </CenteredView>
//             )}

//           {/* Replay button to show at the end of a video */}
//           {this.state.playbackState === PLAYBACK_STATES.ENDED && (
//             <CenteredView>
//               <Control center callback={this._replay}>
//                 <Entypo name="ccw" size={24} color="#fff" style={{ alignSelf: 'center' }} />
//               </Control>
//             </CenteredView>
//           )}

//           {/* Error display */}
//           {this.state.playbackState === PLAYBACK_STATES.ERROR && (
//             <ErrorText text={this.state.error} />
//           )}

//           {/* Bottom bar */}
//           <Animated.View
//             pointerEvents={this.state.controlsState === CONTROL_STATES.HIDDEN ? 'none' : 'auto'}
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               width: videoWidth,
//               opacity: this.state.controlsOpacity,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginBottom: 10,
//             }}
//           >
//             {/* Current time display */}
//             <Text
//               style={[this.props.textStyle, { backgroundColor: 'transparent', marginLeft: 10 }]}
//             >
//               {this._getMMSSFromMillis(this.state.playbackInstancePosition)}
//             </Text>

//             {/* Seek bar */}
//             <TouchableWithoutFeedback onLayout={this._onSliderLayout} onPress={this._onSeekBarTap}>
//               <Slider
//                 style={styles.slider}
//                 value={this._getSeekSliderPosition()}
//                 onValueChange={this._onSeekSliderValueChange}
//                 onSlidingComplete={this._onSeekSliderSlidingComplete}
//                 disabled={
//                   this.state.playbackState === PLAYBACK_STATES.LOADING ||
//                   this.state.playbackState === PLAYBACK_STATES.ENDED ||
//                   this.state.playbackState === PLAYBACK_STATES.ERROR ||
//                   this.state.controlsState !== CONTROL_STATES.SHOWN
//                 }
//               />
//             </TouchableWithoutFeedback>

//             {/* Duration display */}
//             <Text
//               style={[this.props.textStyle, { backgroundColor: 'transparent', marginRight: 10 }]}
//             >
//               {this._getMMSSFromMillis(this.state.playbackInstanceDuration)}
//             </Text>

//             {/* Fullscreen control */}
//             {this.props.showFullscreenButton && (
//               <Control
//                 style={{ backgroundColor: 'transparent', margin: 5 }}
//                 center={false}
//                 callback={this.state.isPortrait ? this.switchToLandscape : this.switchToPortrait}
//               >
//                 {this.state.isPortrait ? (
//                   <Entypo
//                     name="resize-full-screen"
//                     size={24}
//                     color="#fff"
//                     style={{ alignSelf: 'center' }}
//                   />
//                 ) : (
//                   <Entypo
//                     name="resize-100-"
//                     size={24}
//                     color="#fff"
//                     style={{ alignSelf: 'center' }}
//                   />
//                 )}
//               </Control>
//             )}
//           </Animated.View>
//         </View>
//       </TouchableWithoutFeedback>
//     );
//   }
// }

// VideoPlayer.propTypes = {
//   /**
//    * How long should the fadeIn animation for the controls run? (in milliseconds)
//    * Default value is 200.
//    *
//    */
//   fadeInDuration: PropTypes.number,
//   /**
//    * How long should the fadeOut animation run? (in milliseconds)
//    * Default value is 1000.
//    *
//    */
//   fadeOutDuration: PropTypes.number,
//   /**
//    * How long should the fadeOut animation run when the screen is tapped
//    * when the controls are visible? (in milliseconds)
//    * Default value is 200.
//    *
//    */
//   quickFadeOutDuration: PropTypes.number,
//   /**
//    * If the user has not interacted with the controls, how long should the
//    * controls stay visible? (in milliseconds)
//    * Default value is 4000.
//    *
//    */
//   hideControlsTimerDuration: PropTypes.number,

//   /**
//    * Callback that gets passed `playbackStatus` objects for the underlying video element
//    */
//   playbackCallback: PropTypes.func,

//   /**
//    * Error callback (lots of errors are non-fatal and the video will continue to play)
//    */
//   errorCallback: PropTypes.func,

//   // Icons
//   playIcon: PropTypes.func,
//   pauseIcon: PropTypes.func,
//   spinner: PropTypes.func,
//   fullscreenEnterIcon: PropTypes.func,
//   fullscreenExitIcon: PropTypes.func,

//   showFullscreenButton: PropTypes.bool,

//   /**
//    * Style to use for the all the text in the videoplayer including seek bar times
//    * and error messages
//    */
//   textStyle: PropTypes.object,

//   /**
//    * Props to use into the underlying <Video>. Useful for configuring autoplay, playback speed,
//    * and other Video properties.
//    * See Expo documentation on <Video>. `source` is required.
//    */
//   videoProps: PropTypes.object,

//   /**
//    * Write internal logs to console
//    */
//   debug: PropTypes.bool,

//   // Dealing with fullscreen
//   isPortrait: PropTypes.bool,
//   switchToLandscape: PropTypes.func,
//   switchToPortrait: PropTypes.func,

//   showControlsOnLoad: PropTypes.bool,
//   navigation: PropTypes.object,
//   url: PropTypes.string,
// };

// VideoPlayer.defaultProps = {
//   // Animations
//   fadeInDuration: 200,
//   fadeOutDuration: 500,
//   quickFadeOutDuration: 200,
//   hideControlsTimerDuration: 4000,
//   // Appearance (assets and styles)
//   showFullscreenButton: true,
//   textStyle: {
//     color: '#FFFFFF',
//     fontSize: 12,
//   },
//   // Callbacks
//   playbackCallback: () => {},
//   errorCallback: (error) => {
//     console.log('Error: ', error.message, error.type, error.obj);
//   },
//   debug: false,
//   switchToLandscape: () => {
//     console.warn('Pass in this function `switchToLandscape` in props to enable fullscreening');
//   },
//   switchToPortrait: () => {
//     console.warn('Pass in this function `switchToLandscape` in props to enable fullscreening');
//   },
//   showControlsOnLoad: false,
//   url: 'http://www.streambox.fr/playlists/test_001/stream.m3u8',
// };
// export default withNavigation(VideoPlayer);
