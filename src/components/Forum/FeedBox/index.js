import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Badge } from 'react-bootstrap';

import DiscussionBox from '../DiscussionBox';
import Pagination from '../../Pagination/Pagination';
import { fetchPinnedPosts, fetchPosts } from '../../../redux/forums/postsActions';

import './styles.scss';

const FeedBox = ({ loading,
  discussions,
  link,
  onPageChanged,
  limit = 20,
  skip = 0,
  loadPinned,
  loadPosts,
  courseId,
  fslug,
  activeSortingMethod = 'date',
  onChangeSortingMethod,
  postC
}) => {

  useEffect(() => {
    if (fslug) {
      loadPinned(courseId, fslug, null);
      loadPosts(courseId, fslug, null, true, true);
    }
  }, [courseId, fslug, loadPinned, loadPosts]);

  function renderEmptyDiscussionLine(loading, discussions) {
    if (!loading) {
      if (!discussions || discussions.length === 0) {
        return <div className="loading">No discussions...</div>;
      }
    }
    return null;
  }

  function renderSort() {
    return (
      <div className="sort-list">
        <Button
          variant="link"
          className={`sort ${activeSortingMethod === 'date' ? 'sortActive' : ''
            }`}
          onClick={() => onChangeSortingMethod('date')}
          role="radio"
        >
          Latest
        </Button>
        <Button
          variant="link"
          className={`sort ${activeSortingMethod === 'popularity' ? 'sortActive' : ''
            }`}
          onClick={() => onChangeSortingMethod('popularity')}
          role="radio"
        >
          Popular
        </Button>
      </div>
    );
  }

  return (
    <div className="feed-box">
      <div className="header">
        <span className="title">
          Discussions{' '}
          <Badge variant="secondary">{postC}</Badge>
        </span>

        {renderSort()}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {renderEmptyDiscussionLine(loading, discussions)}
      {!loading && (
        <div className="discussions">
          {discussions
            && discussions.map(discussion => (
              <DiscussionBox
                key={discussion}
                courseId={courseId}
                fslug={fslug}
                discussionId={discussion}
                rootlink={link}
              />
            ))}
        </div>
      )}
      <div className="d-flex flex-row py-4 justify-content-center">
        <Pagination
          totalRecords={postC}
          pageLimit={limit}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </div>
    </div>
  );
}

FeedBox.defaultProps = {
  loading: true,
  discussions: [],
  activeSortingMethod: 'date',
  link: '',
  limit: 20,
};

FeedBox.propTypes = {
  activeSortingMethod: PropTypes.string,
  onChangeSortingMethod: PropTypes.func,
  loading: PropTypes.bool,
  discussions: PropTypes.array,
  link: PropTypes.string,
  onPageChanged: PropTypes.func,
  limit: PropTypes.number,
};

const mapStateToProps = (state, { courseId, fslug }) => {
  const pinned = state?.Courses[courseId]?.Forums?.byId[fslug]?.Posts?.pinned ?? [];
  const posts = state?.Courses[courseId]?.Forums?.byId[fslug]?.Posts?.byList ?? [];
  return {
    loading: state?.Courses[courseId]?.Forums?.byId[fslug]?.Posts?.pinPending || state?.Courses[courseId]?.Forums?.byId[fslug]?.Posts?.postPending,
    discussions: pinned.concat(posts),
    postC: state?.Courses[courseId]?.Forums?.byId[fslug]?.postC ?? 0
  }
};


const mapDispatchToProps = dispatch => {
  return {
    loadPinned: (forum, fslug, lastkey) => dispatch(fetchPinnedPosts(forum, fslug, lastkey)),
    loadPosts: (forum, fslug, lastkey, time, dir) => dispatch(fetchPosts(forum, fslug, lastkey, time, dir))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBox);

// export default withTracker((props) => {
//   const {
//     currentForum,
//     activeSortingMethod = 'date',
//     limit = 20,
//     skip = 0,
//   } = props;
//   // figure out sorting
//   const sort = {};
//   sort.pinned = -1;
//   const sorting_method = activeSortingMethod === 'date';
//   if (sorting_method) {
//     sort.cAt = -1;
//   } else {
//     sort.favC = -1;
//   }
//   const sub = Meteor.subscribe(
//     'getDiscussions',
//     currentForum.id,
//     sorting_method,
//     limit,
//     skip,
//   );
//   return {
//     loading: !sub.ready(),
//     discussions: Posts.find({ forumid: currentForum.id }, { sort }).fetch(),
//   };
// })(FeedBox);
