/* eslint-disable jsx-a11y/media-has-caption */
import { Row } from 'react-bootstrap';

const ClassVideoNonMS = ({ video, mat }) => {
  return (
    <Row>
      <div className="center-block class-video">
      </div>
      <div className="embed-responsive embed-responsive-16by9">
        <video
          className="embed-responsive-item"
          src={video.link}
          poster={video.poster}
          controls
        >
          <p>
            If you are reading this, it is because your browser does not
            support the HTML5 video element.
            </p>
        </video>
      </div>
      <h2 className="text-left pt-3 pl-3">{mat && mat.title}</h2>
    </Row>
  );
}
export default ClassVideoNonMS;
// class ClassVideoNonMS extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSuffixFetched: false,
//       isHeadFetched: false,
//       video: {},
//       showError: false,
//       error: {},
//     };
//     this.displayError = this.displayError.bind(this);
//     this.updateSuffix = this.updateSuffix.bind(this);
//     this.getHeader = this.getHeader.bind(this);
//   }

//   componentDidMount() {
//     this.updateSuffix();
//     this.getHeader();
//     this.timer = setInterval(() => this.updateSuffix(), 25000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }

//   getHeader() {
//     // const { id } = this.props.mat;
//     // Meteor.call('videos.auth', id, (error, res) => {
//     //   if (error) {
//     //     Bert.alert(error.reason, 'danger');
//     //   } else {
//     //     jsCookie.set('Hub_auth', res, {
//     //       expires: 1,
//     //       // secure: true,
//     //       path: '/sentry.key',
//     //     });
//     //     this.setState({ isHeadFetched: true });
//     //   }
//     // });
//   }

//   updateSuffix() {
//     // const { id } = this.props.mat;
//     // Meteor.call('vcookies.get', id, true, (error, res) => {
//     //   if (error) {
//     //     Bert.alert(error.reason, 'danger');
//     //   } else if (
//     //     res &&
//     //     Object.prototype.hasOwnProperty.call(res, 'signedCookies')
//     //   ) {
//     //     const response = res.signedCookies;
//     //     if (
//     //       response &&
//     //       Object.prototype.hasOwnProperty.call(response, 'CloudFront-Policy')
//     //     ) {
//     //       const options = {
//     //         secure: true,
//     //         domain: '.hub31.com',
//     //         expires: new Date(new Date().getTime() + 45000),
//     //       };
//     //       Object.keys(response).forEach((key) => {
//     //         jsCookie.set(key, response[key], options);
//     //         // console.log(
//     //         //   `document.cookie = "${key}=${
//     //         //     response[key]
//     //         //   };expires=${options.expires.toGMTString()};domain=${
//     //         //     options.domain
//     //         //   };"`,
//     //         // );
//     //       });
//     //     } else {
//     //       console.log('no response for vcookies');
//     //     }
//     //     if (res && Object.prototype.hasOwnProperty.call(res, 'vid')) {
//     //       this.setState({ video: res.vid, isSuffixFetched: true });
//     //     }
//     //   }
//     // });
//   }

//   displayError(error) {
//     this.setState({ error, showError: true });
//   }

//   // mirror changes to ClassVideo
//   render() {
//     const { res, mat } = this.props;
//     const {
//       isSuffixFetched,
//       video,
//       showError,
//       error,
//       isHeadFetched,
//     } = this.state;
//     const handleDismiss = () => this.setState({ showError: false });

//     // eslint-disable-next-line no-unused-vars
//     const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
//     if (!isSuffixFetched || !isHeadFetched) {
//       return <Loading />;
//     }
//     if (
//       typeof video === 'undefined' ||
//       !Object.prototype.hasOwnProperty.call(video, 'link')
//     ) {
//       return <NotFound />;
//     }
//     return (
//       <Row>
//         <div className="center-block class-video">
//           {showError && (
//             <Alert variant="danger" onClose={handleDismiss} dismissible>
//               {`Code: ${error.code} ${error.message}`}
//             </Alert>
//           )}
//         </div>
//         <div className="embed-responsive embed-responsive-16by9">
//           <video
//             className="embed-responsive-item"
//             src={video.link}
//             poster={video.poster}
//             controls
//           >
//             <p>
//               If you are reading this, it is because your browser does not
//               support the HTML5 video element.
//             </p>
//           </video>
//         </div>
//         <h2 className="text-left pt-3 pl-3">{mat && mat.title}</h2>
//       </Row>
//     );
//   }
// }



// check if video has courseId in its document
// export default withTracker(props => ({
//   res: StuResults.findOne({ materialid: props.mat.id }) || {},
// }))(ClassVideoNonMS);
