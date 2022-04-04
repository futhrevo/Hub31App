import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import {
  Form,
  FormControl,
  Button,
  InputGroup,
  FormGroup,
} from 'react-bootstrap';

import Icon from '../../../../../Icon';
import './CommonInputStyles.scss';
import FormErrorMsg from '../../../../../FormErrorMsg';
/*
  id: index from original component loop or question number
  sid: index from sections loop
  qid: id for the question in mongodb
  preview: readonly mode
  test: test mode with modifyable radios
 */
function getNewAnswers(answers, index, checked) {
  if (checked) {
    return answers.concat(index).sort((a, b) => a - b);
  }
  return answers.filter(e => e !== index).sort((a, b) => a - b);
}

const MultiSelectList = (props) => {
  let { answers } = props;
  const {
    preview, items, id, qid, test, sid,
  } = props;
  if (preview) {
    return (
      <div>
        <FormGroup>
          {items.map((opt, index) => (
            <Form.Check
              type="checkbox"
              key={index}
              checked={answers.indexOf(index) > -1}
              disabled
              label={opt}
            />
          ))}
        </FormGroup>
      </div>
    );
  }

  if (test) {
    if (typeof answers === 'undefined') {
      answers = [];
    }
    if (typeof answers[sid] === 'undefined') {
      answers[sid] = [];
    }
    return (
      <div>
        <FormGroup>
          {items.map((opt, index) => (
            <Form.Check
              type="checkbox"
              key={index}
              id={`mcqAnswer${qid}${id}${sid}${index}`}
              checked={answers[sid].indexOf(index) > -1}
              onChange={event => props.onChange(event, 1, index, qid, sid)}
              label={opt}
            />
          ))}
        </FormGroup>
      </div>
    );
  }
  return (
    <div>
      <div>
        {items.map((opt, index) => (
          <FormGroup key={index}>
            <InputGroup key={index} bsPrefix="input-group input-group-margin">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  aria-label="..."
                  name={`question[${id}].mcqAnswer${id}`}
                  onChange={e =>
                    props.setFieldValue(
                      `answers[${id}]`,
                      getNewAnswers(answers, index, e.target.checked),
                    )
                  }
                  checked={answers.indexOf(index) > -1}
                />
              </InputGroup.Prepend>
              <FormControl
                type="text"
                name={`question[${id}].mcqinputs[${index}]`}
                placeholder="New Option"
                value={opt}
                onChange={props.onChange}
                className="optionClass"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-dark"
                  onClick={() => props.onRemove(index)}
                >
                  <Icon
                    iconStyle="solid"
                    icon="trash-alt"
                    className="danger-glyph"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <ErrorMessage
              component={FormErrorMsg}
              name={`question[${id}].mcqinputs[${index}]`}
            />
          </FormGroup>
        ))}
        <Button onClick={props.onAdd} block>
          Add new option item
        </Button>
      </div>
    </div>
  );
};

export default MultiSelectList;

MultiSelectList.defaultProps = {
  preview: false,
};

MultiSelectList.propTypes = {
  items: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  answers: PropTypes.array,
  id: PropTypes.number,
  test: PropTypes.bool,
  qid: PropTypes.string,
  sid: PropTypes.number,
  setFieldValue: PropTypes.func,
};
