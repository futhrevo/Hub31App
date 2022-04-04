import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './styles.scss';

const Tag = (props) => {
  const { name, withRemove, removeAction } = props;
  let cx = 'tag';
  if (withRemove) cx += 'tagWithRemove';
  return (
    <div className={cx}>
      {name}
      {withRemove && (
        <Button variant="link" onClick={removeAction} className="removeButton">
          <i className="fa fa-times" />
        </Button>
      )}
    </div>
  );
};

Tag.defaultProps = {
  name: '',
  withRemove: false,
  removeAction: () => {},
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
  withRemove: PropTypes.bool,
  removeAction: PropTypes.func,
};

export default Tag;
