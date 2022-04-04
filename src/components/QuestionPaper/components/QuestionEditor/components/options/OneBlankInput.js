import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';

const OneBlankInput = (props) => {
  let { answers } = props;
  const {
    preview, id, qid, test, sid,
  } = props;
  if (preview) {
    return (
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Normal text"
          value={answers[0]}
          disabled
        />
      </FormGroup>
    );
  }
  if (test) {
    if (typeof answers === 'undefined') {
      answers = [];
    }
    if (typeof answers[sid] === 'undefined') {
      answers[sid] = [''];
    }
    return (
      <div>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Type answer here"
            onChange={event => props.onChange(event, 4, 0, qid, sid)}
            value={answers[sid][0]}
          />
        </FormGroup>
      </div>
    );
  }
  return (
    <div>
      <FormGroup>
        <FormControl
          type="text"
          name={`answers[${id}][0]`}
          placeholder="Type answer here"
          onChange={props.onChange}
          value={answers[0]}
        />
      </FormGroup>
    </div>
  );
};

export default OneBlankInput;

OneBlankInput.defaultProps = {
  preview: false,
};

OneBlankInput.propTypes = {
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  answers: PropTypes.array,
  id: PropTypes.number,
  qid: PropTypes.string,
  sid: PropTypes.number,
  test: PropTypes.bool,
};
