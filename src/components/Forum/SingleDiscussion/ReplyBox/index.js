import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { PlainTextEditor } from '../../../TextEditor';

const ReplyBox = (props) => {
  const [body, setBody] = useState((props.doc && props.doc.body) || '');

  const { togglereply, posting, onPost } = props;


  if (posting) return <div className="loadingWrapper">Posting your opinion...</div>;
  return (
    <div>
      <PlainTextEditor
        plainStr={body}
        placeholder="Type Comment here..."
        onChange={setBody}
      />
      <div className="d-flex flex-column">
        <ButtonGroup className="mt-3">
          <Button
            variant="outline-dark"
            onClick={() => onPost(body)}
          >
            Reply
            </Button>
          <Button variant="outline-danger" onClick={() => togglereply()}>
            Cancel
            </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

ReplyBox.propTypes = {
  doc: PropTypes.object,
  togglereply: PropTypes.func,
  discussion: PropTypes.object,
};


export default ReplyBox;
