import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import timeago from 'epoch-timeago';

import Tag from '../Tag';
import './styles.scss';
import urlJoin from '../../../modules/url-join';
import isEmpty from '../../../modules/isEmpty';

const DiscussionBox = (props) => {
  const {
    cAt,
    title,
    author,
    tags,
    favC,
    comC,
    pinned,
  } = props.discussion;
  const { link, notfound } = props;
  if (notfound) {
    return null;
  }

  return (
    <div className="discussion-box">
      <NavLink to={link} className="text-decoration-none">
        <div className="p-3">
          <div className="dtitle">
            {pinned ? (
              <span>
                <i className="fas fa-thumbtack mr-3 text-primary" />
              </span>
            ) : null}
            {title}
          </div>

          <div className="posterInfo">
            Created by <span className="name">{author}</span>
          </div>

          <div className="boxFooter">
            <div className="tagsArea">
              {tags.map(tag => (
                <Tag key={tag} name={tag} />
              ))}
            </div>

            <div className="postInfo">
              <span className="info">{timeago(cAt)}</span>
              <span className="info">
                {favC} <i className="fas fa-thumbs-up ml-1" />
              </span>
              <span className="info">
                {comC} <i className="fas fa-comments ml-1" />
              </span>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

DiscussionBox.defaultProps = {
  discussion: {
    cAt: Date.now(),
    favC: 0,
    commentsCount: 0,
    owner: '',
    discussionId: 1,
    author: 'Hello World',
    userGitHandler: 'github',
    title: 'This is a default post title',
    tags: ['react', 'redux', 'nodejs'],
    userProfile: false,
  },
  notfound: false,
  link: '#'
};

DiscussionBox.propTypes = {
  discussion: PropTypes.object,
  link: PropTypes.string,
};

const mapStateToProps = (state, { discussionId, rootlink, courseId, fslug }) => {
  const discussion = state?.Courses[courseId]?.Forums?.byId[fslug]?.Posts?.byId[discussionId] ?? {};
  if (isEmpty(discussion)) {
    return { notfound: true, }
  }
  const link = urlJoin(rootlink, `discus/${discussion.slug}`)
  return {
    discussion, link
  }
}
export default connect(mapStateToProps)(DiscussionBox);
