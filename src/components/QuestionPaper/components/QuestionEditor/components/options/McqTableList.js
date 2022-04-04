import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, Form, InputGroup, Button, ButtonGroup,
} from 'react-bootstrap';
import { ErrorMessage } from 'formik';

import Icon from '../../../../../Icon';
import './CommonInputStyles.scss';
import FormErrorMsg from '../../../../../FormErrorMsg';

// function getNewAnswers(answers, row, index) {
//   const newArray = answers.slice();
//   newArray[row] = index;
// }

const McqTableList = (props) => {
  let { answers } = props;
  const {
    preview, colItems, rowItems, id, qid, test, sid,
  } = props;
  if (preview) {
    return (
      <div>
        <Form.Group>
          <Table responsive>
            <thead>
              <tr>
                <th />
                {colItems.map((opt, index) => (
                  <th key={index}>{opt}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowItems.map((opt, index) => (
                <tr key={index}>
                  <td>{opt}</td>
                  {colItems.map((opt1, index1) => (
                    <td key={index1}>
                      <Form.Check
                        type="radio"
                        name={`table${sid}${index}`}
                        checked={answers[index] === index1}
                        disabled
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Form.Group>
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
        <Form.Group>
          <Table responsive>
            <thead>
              <tr>
                <th />
                {colItems.map((opt, index) => (
                  <th key={index}>{opt}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowItems.map((opt, index) => (
                <tr key={index}>
                  <td>{opt}</td>
                  {colItems.map((opt1, index1) => (
                    <td key={index1}>
                      <Form.Check
                        type="radio"
                        name={`table${qid}${sid}${index}`}
                        checked={answers[sid][index] === index1}
                        onChange={event => props.onChange(event, 3, index1, qid, sid)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Form.Group>
      </div>
    );
  }
  return (
    <div>
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th />
              {colItems.map((opt, index) => (
                <th key={index}>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control
                        name={`question[${id}].mcqtable[0][${index}]`}
                        type="text"
                        placeholder="New Coloumn"
                        value={opt}
                        onChange={props.onChange}
                        className="optionClass"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-dark"
                          onClick={() => props.onRemoveCol(index)}
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
                      name={`question[${id}].mcqtable[0][${index}]`}
                    />
                  </Form.Group>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowItems.map((opt, index) => (
              <tr key={index}>
                <td>
                  <Form.Group>
                    <InputGroup>
                      <Form.Control
                        name={`question[${id}].mcqtable[1][${index}]`}
                        type="text"
                        placeholder="New Row"
                        value={opt}
                        onChange={props.onChange}
                        className="optionClass"
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-dark"
                          onClick={() => props.onRemoveRow(index)}
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
                      name={`question[${id}].mcqtable[1][${index}]`}
                    />
                  </Form.Group>
                </td>
                {colItems.map((opt1, index1) => (
                  <td key={index1}>
                    <Form.Check
                      type="radio"
                      name={`question[${id}].table${id}${index}`}
                      onChange={() => props.setFieldValue(`answers[${id}][${index}]`, index1)
                      }
                      checked={answers[index] === index1}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonGroup>
          <Button onClick={() => props.onAddRow()}>Add Row</Button>
          <Button onClick={() => props.onAddCol()}>Add Coloumn</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default McqTableList;

McqTableList.propTypes = {
  rowItems: PropTypes.array,
  colItems: PropTypes.array,
  onAddRow: PropTypes.func,
  onRemoveRow: PropTypes.func,
  onAddCol: PropTypes.func,
  onRemoveCol: PropTypes.func,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  answers: PropTypes.array,
  id: PropTypes.number,
  test: PropTypes.bool,
  qid: PropTypes.string,
  sid: PropTypes.number,
  setFieldValue: PropTypes.func,
};
