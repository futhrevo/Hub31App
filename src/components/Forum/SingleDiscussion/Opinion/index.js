import React from 'react';
import timeago from 'epoch-timeago';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import UserAvatar from 'react-user-avatar';
import { connect } from 'react-redux';

import './styles.scss';

const Opinion = (props) => {
  const { deleteAction, deletingOpinion, opinion, sub, id } = props;
  const {
    author, cAt, body, userId,
  } = opinion;

  const allowDelete = userId === sub;

  return (
    <div className="opinion mt-3 mx-3">
      <div className="m-3">
        <div className="infoContainer">
          <UserAvatar size="36" name={author} />
          <div className="userInfo">
            <div className="name">{author}</div>
          </div>
          <div className="dateInfo">{timeago(cAt)}</div>
          {allowDelete && (
            <Button
              className="ml-1"
              variant="outline-danger"
              size="sm"
              onClick={() => {
                deleteAction(id);
              }}
            >
              <i className="fa fa-trash trashIcon" />
            </Button>
          )}
        </div>

        <div className="opContent">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>

        {deletingOpinion === id && (
          <div className="deletingOpinion">Deleting Opinion ...</div>
        )}
      </div>
    </div>
  );
};

Opinion.defaultProps = {
  opinion: {
    id: '12345',
    userAvatar: '',
    author: 'User name',
    cAt: 'a day ago',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    owner: '12345',
  },
  deleteAction: () => { },
  deletingOpinion: '',
};

Opinion.propTypes = {
  opinion: PropTypes.object,
  deleteAction: PropTypes.func,
  deletingOpinion: PropTypes.string,
};

const mapStateToProps = (state, { opinion }) => {
  return {
    sub: state?.Accounts?.sub || '',
    id: `${opinion.post}_${opinion.cAt}`
  }
}

export default connect(mapStateToProps)(Opinion);
