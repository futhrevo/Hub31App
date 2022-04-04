/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Card,
  InputGroup,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

import { ErrorMessage } from 'formik';
import Icon from '../../../../Icon';
import McqList from './options/McqList';
import MultiSelectList from './options/MultiSelectList';
import McqTableList from './options/McqTableList';
import OneBlankInput from './options/OneBlankInput';
import { TextEditor } from '../../../../TextEditor';
import FormErrorMsg from '../../../../FormErrorMsg';

// const mcq = 1;
// const mcqTableCol = 2;
// const mcqTablerow = 3;
// const blank = 4;

const optionTypes = [
  { title: 'MCQ' },
  { title: 'Multi Select MCQ' },
  { title: 'Table MCQ' },
  { title: 'Blanks' },
];

const defaultInputs = {
  mcqinputs: ['', '', ''],
  mcqtable: [['', ''], ['', '']],
};

export default class QuestionSection extends React.Component {
  constructor(props) {
    super(props);
    this.appendMcqInput = this.appendMcqInput.bind(this);
    this.removeMcqInput = this.removeMcqInput.bind(this);
    this.addMcqTableRow = this.addMcqTableRow.bind(this);
    this.removeMcqTableRow = this.removeMcqTableRow.bind(this);
    this.addMcqTableCol = this.addMcqTableCol.bind(this);
    this.removeMcqTableCol = this.removeMcqTableCol.bind(this);
  }

  changeOptionsType(optionsIndex) {
    const { values, setFieldValue, sid } = this.props;
    const value = {
      ...defaultInputs,
      ...values.question[sid],
      ...{ optionsIndex },
    };
    setFieldValue(`question[${sid}]`, value);
    setFieldValue(`answers[${sid}]`, [0]);
  }

  appendMcqInput() {
    const { values, setFieldValue, sid } = this.props;
    const value = values.question[sid];
    const newArray = value.mcqinputs.slice();
    newArray.push('');
    setFieldValue(`question[${sid}].mcqinputs`, newArray);
  }

  removeMcqInput(index) {
    const { values, setFieldValue, sid } = this.props;
    const value = values.question[sid];
    const newArray = value.mcqinputs.slice();
    newArray.splice(index, 1);
    setFieldValue(`question[${sid}].mcqinputs`, newArray);
  }

  addMcqTableRow() {
    const { values, setFieldValue, sid } = this.props;
    const value = values.question[sid];
    const newArray = value.mcqtable.slice();
    newArray[1].push('');
    setFieldValue(`question[${sid}].mcqtable`, newArray);
  }

  removeMcqTableRow(index) {
    const { values, setFieldValue, sid } = this.props;
    const value = values.question[sid];
    const newArray = value.mcqtable.slice();
    newArray[1].splice(index, 1);
    setFieldValue(`question[${sid}].mcqtable`, newArray);
  }

  addMcqTableCol() {
    const { values, setFieldValue, sid } = this.props;
    const value = values.question[sid];
    const newArray = value.mcqtable.slice();
    newArray[0].push('');
    setFieldValue(`question[${sid}].mcqtable`, newArray);
  }

  removeMcqTableCol(index) {
    const { values, setFieldValue, sid } = this.props;
    const value = values.question[sid];
    const newArray = value.mcqtable.slice();
    newArray[0].splice(index, 1);
    setFieldValue(`question[${sid}].mcqtable`, newArray);
  }

  render() {
    const {
      values, sid, handleChange, setFieldValue, id,
    } = this.props;
    const value = values.question[sid];
    const marks = values.marks[sid];
    const answers = values.answers[sid];

    const { optionsIndex } = value;
    return (
      <Container>
        <Card variant="primary">
          <Card.Header>
            {
              <Form.Group>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Add section name"
                    name={`question[${sid}]section`}
                    id="section"
                    value={value.section}
                    onChange={handleChange}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="info"
                      onClick={() => this.props.onUp(values, setFieldValue, id)}
                    >
                      <Icon iconStyle="solid" icon="arrow-up" />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => this.props.onDown(values, setFieldValue, id)
                      }
                    >
                      <Icon iconStyle="solid" icon="arrow-down" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.props.onDelSection(values, setFieldValue, sid)
                      }
                    >
                      <Icon iconStyle="solid" icon="trash-alt" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <ErrorMessage
                  component={FormErrorMsg}
                  name={`question[${sid}].section`}
                />
              </Form.Group>
            }
          </Card.Header>
          <Card.Body>
            <Row className="show-grid">
              <Col xs={12} sm={12} md={12}>
                <Form.Group>
                  <Form.Label>Question</Form.Label>
                  <TextEditor
                    html={value.question}
                    onChange={e => setFieldValue(`question[${sid}].question`, e)}
                    placeholder="Provide Question here..."
                  />
                  <ErrorMessage
                    component={FormErrorMsg}
                    name={`question[${sid}].question`}
                  />
                </Form.Group>
                <Form.Group style={{ textAlign: 'center' }}>
                  <Form.Label>
                    Marks
                    <ToggleButtonGroup
                      type="radio"
                      value={marks}
                      onChange={e => setFieldValue(`marks[${sid}]`, e)}
                      name={`marks[${sid}]`}
                      style={{ marginLeft: '40px' }}
                    >
                      <ToggleButton value={1}>&nbsp;1&nbsp;</ToggleButton>
                      <ToggleButton value={2}>&nbsp;2&nbsp;</ToggleButton>
                      <ToggleButton value={3}>&nbsp;3&nbsp;</ToggleButton>
                      <ToggleButton value={4}>&nbsp;4&nbsp;</ToggleButton>
                      <ToggleButton value={5}>&nbsp;5&nbsp;</ToggleButton>
                    </ToggleButtonGroup>
                  </Form.Label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Options Type
                    <DropdownButton
                      variant="default"
                      title={optionTypes[value.optionsIndex].title}
                      id="dropdown-options"
                      style={{ marginLeft: '40px' }}
                    >
                      {optionTypes.map((opt, index) => (
                        <Dropdown.Item
                          key={index}
                          eventKey={index}
                          active={index === value.optionsIndex}
                          onClick={() => this.changeOptionsType(index)}
                        >
                          {optionTypes[index].title}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </Form.Label>
                  <ErrorMessage
                    component={FormErrorMsg}
                    name={`answers[${sid}]`}
                  />
                  {optionsIndex === 0 ? (
                    <McqList
                      items={value.mcqinputs}
                      onAdd={this.appendMcqInput}
                      onRemove={this.removeMcqInput}
                      onChange={handleChange}
                      answers={answers}
                      id={id}
                      setFieldValue={setFieldValue}
                    />
                  ) : (
                    ' '
                  )}
                  {optionsIndex === 1 ? (
                    <MultiSelectList
                      items={value.mcqinputs}
                      onAdd={this.appendMcqInput}
                      onRemove={this.removeMcqInput}
                      onChange={handleChange}
                      answers={answers}
                      id={id}
                      setFieldValue={setFieldValue}
                    />
                  ) : (
                    ' '
                  )}
                  {optionsIndex === 2 ? (
                    <McqTableList
                      colItems={value.mcqtable[0]}
                      rowItems={value.mcqtable[1]}
                      onAddRow={this.addMcqTableRow}
                      onRemoveRow={this.removeMcqTableRow}
                      onAddCol={this.addMcqTableCol}
                      onRemoveCol={this.removeMcqTableCol}
                      onChange={handleChange}
                      answers={answers}
                      id={id}
                      setFieldValue={setFieldValue}
                    />
                  ) : (
                    ' '
                  )}
                  {optionsIndex === 3 ? (
                    <OneBlankInput
                      onChange={handleChange}
                      answers={answers}
                      id={id}
                    />
                  ) : (
                    ' '
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

QuestionSection.propTypes = {
  id: PropTypes.number,
  onDelSection: PropTypes.func,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  values: PropTypes.object,
  sid: PropTypes.number,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
};
