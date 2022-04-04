import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useAlert } from 'react-alert';

import Opinion from '../Opinion';
import Loading from '../../../Loading';
import ReplyBox from '../ReplyBox';
import { delComments, listComments, addComment } from '../../../../api/comments';
import { updCommCountAction } from '../../../../redux/forums/postActions';

const CommentsList = ({ discussion, subtract, author, add, togglereply }) => {
  const alert = useAlert();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [openReply, setOpenReply] = useState(false);
  const [last, setLast] = useState(null);
  const [deletingComment, setDelComment] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    async function onLoad() {
      try {
        const postid = `${discussion.forum}_${discussion.cAt}`
        const { items, lastItem } = await listComments(postid, last, null);
        setComments(items);
        setLast(lastItem);
      } catch (error) {

      } finally {
        setLoading(false);
      }

    }
    onLoad();
  }, [discussion.forum, discussion.cAt, last]);

  const handleDeleteComment = useCallback(async id => {
    if (window.confirm('Are you sure? This is permanent!')) {
      const { forum, cAt, slug: pslug } = discussion;
      const postId = `${forum}_${cAt}`;
      setDelComment(id);
      const [courseId, fslug, , commentAt] = id.split('_');
      try {
        await delComments(postId, pslug, commentAt);
        subtract(courseId, fslug, pslug, false);
        setDelComment('');
        setComments(comments.filter(el => el.cAt !== Number(commentAt)));
      } catch (error) {

      }
    }
  }, [comments, discussion, subtract]);

  const handleAddComment = useCallback(async body => {
    const { forum, slug: pslug, cAt } = discussion;
    const post = `${forum}_${cAt}`
    const doc = {
      body,
      author,
    };
    setPosting(true);
    const [courseId, fslug] = forum.split('_');
    try {
      const postAt = await addComment(post, pslug, doc);
      add(courseId, fslug, pslug, true);
      doc.post = post;
      doc.cAt = postAt;
      doc.deleted = false;
      setComments([doc, ...comments])
      alert.success('Success');
      togglereply();
    } catch (error) {

    } finally {
      setPosting(false);
    }
  }, [add, alert, author, comments, discussion, togglereply]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className={`${openReply ? 'd-block' : 'd-none'}`}>
        <ReplyBox
          discussion={discussion}
          togglereply={() => setOpenReply(!openReply)}
          posting={posting}
          onPost={handleAddComment}
        />
      </div>
      <div className={`${openReply ? 'd-none' : 'd-block'}`}>
        <Button
          className="favoriteButton"
          variant="outline-secondary"
          onClick={() => setOpenReply(!openReply)}
          block
        >
          <i className="fas fa-reply text-secondary mr-3" />
          <span>Add Comment</span>
        </Button>
      </div>
      {comments &&
        comments.map(opinion => (
          <Opinion
            key={opinion.cAt}
            opinion={opinion}
            deletingOpinion={deletingComment}
            deleteAction={handleDeleteComment}
          />
        ))}
    </div>
  );
}


CommentsList.propTypes = {
  loading: PropTypes.bool,
  comments: PropTypes.array,
  discussion: PropTypes.object,
};
const mapStateToProps = (state) => ({
  author: `${state?.Accounts?.name ?? ''} ${state?.Accounts?.family_name ?? ''}`,

})
const mapDispatchToProps = dispatch => ({
  add: (id, slug, pslug, isInc) => { dispatch(updCommCountAction(id, slug, pslug, isInc)) },
  subtract: (index, isInc) => { dispatch(updCommCountAction(index, isInc)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
