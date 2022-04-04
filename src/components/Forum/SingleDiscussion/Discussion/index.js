import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import timeago from 'epoch-timeago';
import UserAvatar from 'react-user-avatar';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

import Tag from '../../Tag';
import './styles.scss';

import { deletePost, favPost, getStars } from '../../../../api/posts';

import { deletePostAction } from '../../../../redux/forums/postsActions';
import { favPostAction } from '../../../../redux/forums/postActions';

const Discussion = (props) => {
  const [loading, setLoading] = useState(true);
  const [isfav, setfav] = useState(false);
  const [favC, setFavC] = useState(props.discussion.favC);
  const [toggleingFavorite, setToggFav] = useState(false);
  const [deletingDiscussion, setDelDiscussion] = useState(false);

  useEffect(() => {
    async function fetchData(forum, slug) {
      try {
        const items = await getStars(forum, slug);
        setfav(items > 0);
      } catch (e) {

      } finally {
        setLoading(false);
      }
    }
    fetchData(props.discussion.forum, props.discussion.slug);
  }, [props.discussion.forum, props.discussion.slug]);

  const { history, delPost, updatefavPost, discussion, sub } = props;
  const {
    author,
    title,
    cAt,
    body,
    tags,
    userId,
    forum, slug
  } = discussion;

  const handleToggleFavorite = useCallback(async () => {
    setToggFav(true);
    try {
      await favPost(forum, slug, !isfav);
      if (isfav) {
        setFavC(favC - 1);
      } else {
        setFavC(favC + 1);
      }
      setfav(!isfav);
      const [courseId, fslug] = forum.split('_');
      updatefavPost(courseId, fslug, slug, !isfav);
    } catch (e) {

    } finally {
      setToggFav(false);
    }
  }, [favC, forum, isfav, slug, updatefavPost]);

  const handleDeletePost = useCallback(async () => {
    if (window.confirm('Are you sure? This is permanent!')) {
      setDelDiscussion(true);
      try {
        await deletePost(forum, slug);
        const [courseId, fslug] = forum.split('_');
        delPost(courseId, fslug, slug);
        history.goBack();
      } catch (e) {
        setDelDiscussion(false);
      }
    }
  }, [delPost, forum, slug, history]);

  const userFavorited = isfav;
  let favCount = '';
  if (toggleingFavorite) favCount = 'Toggling Favorite...';
  else if (userFavorited) favCount = `Favorited (${favC})`;
  else if (favC === 0) favCount = 'Make favorite';
  else if (favC === 1) favCount = '1 favorite';
  else favCount = `${favC} favorites`;
  const heartClass = `text-success fa${userFavorited ? 's' : 'r'} fa-heart`;

  // check if logged in user is owner of the discussion
  // const allowDelete = owner === Meteor.userId();
  const allowDelete = userId === sub;
  // check if user favorated the discussion
  return (
    <div className="discussion">
      <div className="infoContainer">
        <UserAvatar size="42" name={author || '31'} />
        <div className="columnOnSmallBP">
          <div className="userInfo">
            <div className="name">{author}</div>
          </div>
          <div className="dateInfo">{timeago(cAt)}</div>
        </div>
      </div>

      <div className="discTitle">{title}</div>
      <div className="discContent">
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>

      <Row className="discFooter">
        <Col className="tags">
          {tags && tags.map(tag => <Tag name={tag} key={tag} />)}
        </Col>
        <div className="w-100" />
        <Col className="text-right">
          <Button
            className="favoriteButton"
            variant="light"
            disabled={toggleingFavorite}
            onClick={() => {
              handleToggleFavorite();
            }}
          >
            <i className={heartClass} />
            {loading ? <span>Loading..</span> : <span>{favCount}</span>}
          </Button>

          {allowDelete && (
            <Button
              className="deleteButton"
              variant="light"
              onClick={() => {
                handleDeletePost();
              }}
            >
              <i className="fas fa-trash trashIcon text-danger" />
              <span>Delete</span>
            </Button>
          )}
        </Col>
      </Row>

      {deletingDiscussion && (
        <div className="deletingDiscussion">Deleting Discussion...</div>
      )}
    </div>
  );
}

Discussion.defaultProps = {
  discussion: {
    id: 0,
    userAvatar: '',
    author: 'User name',
    userGitHandler: 'github',
    title: 'Default Discussion Title',
    cAt: 'a day ago',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['react', 'redux', 'webkit'],
    favC: 1,
    owner: 'abcd',
  },
};

Discussion.propTypes = {
  discussion: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = (state, { discussion }) => {
  return {
    sub: state?.Accounts?.sub ?? '',
    id: `${discussion?.forum}_${discussion?.cAt}`
  }
}

const mapDispatchToProps = dispatch => ({
  delPost: (courseId, slug, pslug) => { dispatch(deletePostAction(courseId, slug, pslug)) },
  updatefavPost: (courseId, slug, pslug, fav) => { dispatch(favPostAction(courseId, slug, pslug, fav)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(Discussion));
