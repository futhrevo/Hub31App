/* eslint no-lonely-if: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Alert } from 'react-bootstrap';

import HlsPlayer from '../../../../../../HlsPlayer';
import Loading from '../../../../../../Loading';
import NotFound from '../../../../../../../pages/NotFound';
// import useVidSuffix from './components/useVidSuffix';
// import ReactPlayerView from './components/ReactPlayerView';


const ClassVideoView = (props) => {
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({});

  const displayError = (error) => {
    setError(error);
    setShowError(true);
  }

  const { res, mat } = props;
  // eslint-disable-next-line no-unused-vars
  const done = res && !!Object.prototype.hasOwnProperty.call(res, 'ended');
  // const { video, head, suffix, ready } = useVidSuffix(props.courseId, props.chapId, props.mat.id)
  if (!ready) {
    return <Loading />;
  }
  if (
    typeof video === 'undefined' ||
    !Object.prototype.hasOwnProperty.call(video, 'link')
  ) {
    return <NotFound />;
  }
  console.log(video.link);
  return (
    <Row>
      <div className="center-block class-video">
        {showError && (
          <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            {`Code: ${error.code} ${error.message}`}
          </Alert>
        )}

        <ReactPlayerView link={video.link} suffix={suffix} head={head} />
        <h2 className="text-left pt-3 pl-3">{mat && mat.title}</h2>
      </div>
    </Row>
  );
}

ClassVideoView.propTypes = {
  res: PropTypes.object,
  mat: PropTypes.object,
};

export default ClassVideoView;
// check if video has courseId in its document
// export default withTracker(props => ({
//   res: StuResults.findOne({ materialid: props.mat.id }) || {},
// }))(ClassVideo);

/*
    const videoJsOptions = {
      autoplay: false,
      fluid: true,
      controls: true,
      sources: [
        {
          src: video.link,
          type: 'application/vnd.apple.mpegurl',
        },
      ],
    };
<VideoPlayer suffix={suffix} {...videoJsOptions} />
*/
