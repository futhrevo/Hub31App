import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FeedBox from '../../../components/Forum/FeedBox';
import urlJoin from '../../../modules/url-join';
import ErrorBoundary from '../../ErrorBoundary';

const ForumFeed = (props) => {
  const { error, link, courseId, forum_slug } = props;
  const [sorting_method, setMethod] = useState('date');
  const [limit] = useState(20);
  const [skip, setSkip] = useState(0);

  if (error) {
    return <div className="errorMsg">{error}</div>;
  }

  function handleSortingChange(mode) {
    if (mode === 'date') {
      setMethod('date');
    } else {
      setMethod('popularity');
    }
  }

  function handlePageChange(data) {
    const { currentPage } = data;
    setSkip((currentPage - 1) * limit);
  }

  function renderNewDiscussionButtion() {
    const newlink = urlJoin(link, 'new');
    return (
      <div className="newDiscussionBtn d-flex justify-content-end">
        <Link to={newlink}>
          <Button variant="outline-primary">New Discussion</Button>
        </Link>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="contentArea">
        <div className="primaryContent">
          {renderNewDiscussionButtion()}
          <FeedBox
            courseId={courseId}
            fslug={forum_slug}
            limit={limit}
            skip={skip}
            link={link}
            activeSortingMethod={sorting_method}
            onChangeSortingMethod={handleSortingChange}
            onPageChanged={handlePageChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

ForumFeed.propTypes = {
  error: PropTypes.string,
  link: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  const { match, courseId } = props;
  const { forum_slug } = match.params;
  const currentForum = state?.Courses[courseId]?.Forums ?? {};
  if (Object.keys(currentForum).length === 0) {
    return {
      error: 'No Discussions Yet in this forum',
    };
  }
  let link = '';
  if (forum_slug) {
    link = `${match.url}`;
  }
  return {
    link, courseId, forum_slug
  }
}

export default connect(mapStateToProps)(ForumFeed);
// export default withTracker((props) => {
//   const { match } = props;
//   const { forum } = match.params;
//   const { courseId } = props;
//   let currentForum = null;
//   if (forum) {
//     currentForum = Forums.findOne({ forum_slug: forum });
//   } else {
//     currentForum = Forums.findOne(
//       { courseId: courseId },
//       { sort: { createdAt: 1 } },
//     );
//   }
//   if (!currentForum) {
//     return {
//       error: 'No Discussions Yet in this forum',
//     };
//   }
//   let link = '';
//   if (forum) {
//     link = `${match.url}`;
//   } else {
//     link = urlJoin(match.url, currentForum.forum_slug);
//   }
//   return {
//     currentForum,
//     link,
//   };
// })(ForumFeed);
