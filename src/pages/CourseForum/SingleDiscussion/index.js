import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import CommentsList from '../../../components/Forum/SingleDiscussion/CommentsList';
import Discussion from '../../../components/Forum/SingleDiscussion/Discussion';
import Pagination from '../../../components/Pagination/Pagination';
import { fetchPost } from '../../../redux/forums/postsActions';
import ErrorBoundary from '../../ErrorBoundary';
import NewDiscussion from '../NewDiscussion';
import './styles.scss';

const SingleDiscussion = (props) => {

  const [editDiscussion, setEdit] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const {
    discussion, loading, error, history, opinionError, courseId, fetchdata, fslug, pslug
  } = props;

  useEffect(() => {
    fetchdata(courseId, fslug, pslug);
  }, [courseId, fslug, pslug, fetchdata]);

  if (error) {
    return <div className="errorMsg">{error}</div>;
  }

  // return loading status if discussion is not fetched yet
  if (loading) {
    return <div className="loadingWrapper">Loading discussion ...</div>;
  }

  function handlePageChange(data) {
    const { currentPage } = data;
    setSkip((currentPage - 1) * limit);
  }

  return (
    <ErrorBoundary>
      <div className="single-discussion">
        <div className="d-flex justify-content-end">
          <Button
            variant="light"
            className="mr-2"
            onClick={() => {
              setEdit(!editDiscussion);
            }}
          >
            <i className="fas fa-edit text-info" />
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (editDiscussion) {
                setEdit(!editDiscussion);
              } else {
                history.goBack();
              }
            }}
          >
            {editDiscussion ? 'Cancel Edit' : 'Cancel'}
          </Button>
        </div>
        {editDiscussion ? (
          <NewDiscussion
            courseId={courseId}
            discussion={discussion}
            history={history}
            fslug={fslug}
            toggleEdit={() => {
              setEdit(!editDiscussion);
            }}
          />
        ) : (
          <Discussion
            discussion={discussion}
            history={history}
          />
        )}

        {opinionError && <div className="errorMsg">{opinionError}</div>}

        <CommentsList discussion={discussion} limit={limit} skip={skip} />
        <div className="d-flex flex-row py-4 justify-content-center">
          <Pagination
            totalRecords={discussion.comC}
            pageLimit={limit}
            pageNeighbours={1}
            onPageChanged={handlePageChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

SingleDiscussion.propTypes = {
  history: PropTypes.object,
  discussion: PropTypes.any,
  loading: PropTypes.bool,
};

SingleDiscussion.defaultProps = {
  loading: true
}

const mapStateToProps = (state, { match, courseId }) => {
  const { forum_slug, discus_slug } = match.params;
  const discussion = state?.Courses[courseId]?.Forums?.byId[forum_slug]?.Posts?.byId[discus_slug] ?? 0;
  let loading = true;
  if (discussion) loading = false;
  return {
    discussion,
    loading,
    fslug: forum_slug,
    pslug: discus_slug
  }
}

const mapDispatchToProps = dispatch => ({
  fetchdata: (courseId, fslug, pslug) => { dispatch(fetchPost(courseId, fslug, pslug)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleDiscussion);

