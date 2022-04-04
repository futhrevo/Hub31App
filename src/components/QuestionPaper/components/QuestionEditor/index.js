/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonToolbar, Modal, Card, Form,
} from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { Formik } from 'formik';
import { withAlert } from 'react-alert';
import set from 'lodash.set';

import McqList from './components/options/McqList';
import MultiSelectList from './components/options/MultiSelectList';
import McqTableList from './components/options/McqTableList';
import OneBlankInput from './components/options/OneBlankInput';
import QuestionSection from './components/QuestionSection';
import rearrangeArray from '../../../../modules/rearrangeArray';
import {
  nameRule,
  tagRule,
  titleRule,
  answerRule,
} from '../../../../modules/forg-rules';
import FormErrorMsg from '../../../FormErrorMsg';
import { updateQuestion } from '../../../../api/questions';
import { paperAddQ } from '../../../../api/questionpapers';

const initialSection = {
  optionsIndex: 0,
  mcqinputs: ['', '', ''],
  mcqtable: [['', ''], ['', '']],
  question: '',
  section: '',
};

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
    };
    this.removeSection = this.removeSection.bind(this);
    this.onMoveUp = this.onMoveUp.bind(this);
    this.onMoveDown = this.onMoveDown.bind(this);
  }

  onMove(values, setFieldValue, oldIndex, position) {
    const { question, marks, answers } = values;
    const len = question.length;
    if (oldIndex > -1) {
      let newIndex = oldIndex + position;
      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= len) {
        newIndex = len.length;
      }
      setFieldValue('question', rearrangeArray(question, oldIndex, newIndex));
      setFieldValue('answers', rearrangeArray(answers, oldIndex, newIndex));
      setFieldValue('marks', rearrangeArray(marks, oldIndex, newIndex));
    }
  }

  onMoveUp(values, setFieldValue, key) {
    this.onMove(values, setFieldValue, key, -1);
  }

  onMoveDown(values, setFieldValue, key) {
    this.onMove(values, setFieldValue, key, 1);
  }

  addSection(values, setFieldValue) {
    const { question } = values;
    const sum = question.length;
    setFieldValue(`question[${sum}]`, initialSection);
    setFieldValue(`answers[${sum}]`, []);
    setFieldValue(`marks[${sum}]`, 1);
  }

  removeSection(values, setFieldValue, sid) {
    const filteredQs = values.question.filter((_, i) => i !== sid);
    const filteredAs = values.answers.filter((_, i) => i !== sid);
    const filteredMs = values.marks.filter((_, i) => i !== sid);
    setFieldValue('question', filteredQs);
    setFieldValue('answers', filteredAs);
    setFieldValue('marks', filteredMs);
  }

  closePreview() {
    this.setState({ showPreview: false });
  }

  openPreview() {
    this.setState({ showPreview: true });
  }

  renderPreview(values) {
    if (!this.state.showPreview) {
      return '';
    }
    return (
      <form>
        {values.question.map((opt, index) => (
          <div key={index}>
            <Card>
              {opt.section ? <Card.Header>{opt.section}</Card.Header> : null}
              <Card.Body>
                <div dangerouslySetInnerHTML={{ __html: opt.question }} />
                {opt.optionsIndex === 0 ? (
                  <McqList
                    items={opt.mcqinputs}
                    answers={values.answers[index]}
                    sid={index}
                    preview
                  />
                ) : (
                  ' '
                )}
                {opt.optionsIndex === 1 ? (
                  <MultiSelectList
                    items={opt.mcqinputs}
                    answers={values.answers[index]}
                    sid={index}
                    preview
                  />
                ) : (
                  ' '
                )}
                {opt.optionsIndex === 2 ? (
                  <McqTableList
                    colItems={opt.mcqtable[0]}
                    rowItems={opt.mcqtable[1]}
                    answers={values.answers[index]}
                    sid={index}
                    preview
                  />
                ) : (
                  ' '
                )}
                {opt.optionsIndex === 3 ? (
                  <OneBlankInput
                    answers={values.answers[index]}
                    sid={index}
                    preview
                  />
                ) : (
                  ' '
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </form>
    );
  }

  render() {
    const { doc, alert, history, paper } = this.props;
    return (
      <Formik
        initialValues={{
          tags: (doc && doc.tags) || [],
          explain: (doc && doc.explain) || '',
          question: (doc && doc.question) || [initialSection],
          answers: (doc && doc.answers) || [[0]],
          marks: (doc && doc.marks) || [1],
        }}
        onSubmit={async (values, { setSubmitting, dirty }) => {
          if (dirty) {
            // Bert.alert('check provided inputs', 'danger');
            return;
          }
          console.log('onSubmit');
          setSubmitting(true);
          const existingDocument = doc && doc.id;

          values.question.forEach((q) => {
            switch (q.optionsIndex) {
              case 2:
                delete q.mcqinputs;
                break;
              case 3:
                delete q.mcqinputs;
                delete q.mcqtable;
                break;
              default:
                delete q.mcqtable;
                break;
            }
          });
          try {
            const response = existingDocument ? await updateQuestion(doc.id, values) : await paperAddQ(paper, values);
            const confirmation = existingDocument ? 'Question updated!' : 'Question added!';
            alert.success(confirmation);
            const { onSuccess } = this.props;
            onSuccess(history, existingDocument ? doc.id : response.qid, values);
          } catch (e) {
            setSubmitting(false);
            alert.error("Unable to save changes");
            console.log(e);
          }
        }}

        validate={(values) => {
          const errors = {};
          if (values.tags) {
            values.tags.forEach((value, index) => {
              if (!tagRule.test(values.tags[index])) {
                errors.tags = 'Min 2 letters, max 20 letters';
              }
            });
          }
          if (values.explain) {
            if (!titleRule.test(values.explain)) {
              errors.explain = 'Atleast 5 letters';
            }
          }
          if (values.question.length === 0) {
            errors.body = 'Atleast one question is required';
          } else {
            // TODO: validate invalid indexes in answers
            values.question.forEach((q, i) => {
              if (!titleRule.test(q.question)) {
                // errors.question[i].question = 'Question needs to be long';
                set(
                  errors,
                  `question[${i}].question`,
                  'Question needs to be long',
                );
              }
              if (!answerRule.test(values.answers[i])) {
                set(errors, `answers[${i}]`, 'Provide answers');
                return;
              }
              if (q.optionsIndex < 2) {
                // errors.question[i].mcqinputs = [];
                q.mcqinputs.forEach((m, j) => {
                  if (!nameRule.test(m)) {
                    // errors.question[i].mcqinputs[j] = 'Required';
                    set(errors, `question[${i}].mcqinputs[${j}]`, 'Required');
                  }
                });
                if (Math.max(...values.answers[i]) > q.mcqinputs.length - 1) {
                  set(errors, `answers[${i}]`, 'Provide valid answers');
                }
              } else if (q.optionsIndex === 2) {
                q.mcqtable[0].forEach((r, k) => {
                  if (!nameRule.test(r)) {
                    // errors.question[i].mcqtable[0][k] = 'Required';
                    set(errors, `question[${i}].mcqtable[0][${k}]`, 'Required');
                  }
                });
                q.mcqtable[1].forEach((r, k) => {
                  if (!nameRule.test(r)) {
                    // errors.question[i].mcqtable[1][k] = 'Required';
                    set(errors, `question[${i}].mcqtable[1][${k}]`, 'Required');
                  }
                });
                if (q.mcqtable[1].length !== values.answers[i].length) {
                  set(errors, `answers[${i}]`, 'Provide all answers');
                }
                if (Math.max(...values.answers[i]) > q.mcqtable[0].length - 1) {
                  set(errors, `answers[${i}]`, 'Provide valid answers');
                }
              } else if (q.optionsIndex === 3) {
                if (values.answers[i][0] === '') {
                  set(errors, `answers[${i}]`, 'Provide an answers');
                }
              }
            });
          }
          return errors;
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          isValid,
          errors,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit} validated={isValid}>
            <FormErrorMsg>{errors.body}</FormErrorMsg>
            {values.question.map((opt, index) => (
              <QuestionSection
                key={index}
                id={index}
                onDelSection={this.removeSection}
                onUp={this.onMoveUp}
                onDown={this.onMoveDown}
                sid={index}
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            ))}
            <Form.Group>
              <Form.Label>Explanation</Form.Label>
              <Form.Control
                as="textarea"
                name="explain"
                id="explanation"
                value={values.explain}
                onChange={handleChange}
                placeholder="Enter Explanation for the Question here"
                className="explanationClass"
                isInvalid={touched.explain && errors.explain}
              />
              <Form.Control.Feedback type="invalid">
                {errors.explain}
              </Form.Control.Feedback>
            </Form.Group>
            <TagsInput
              value={values.tags}
              onChange={tags => setFieldValue('tags', tags)}
            />
            <div className="invalid-feedback d-block">{errors.tags}</div>
            <ButtonToolbar className="justify-content-center">
              <Button
                variant="primary"
                onClick={() => this.addSection(values, setFieldValue)}
                style={{ margin: '0.5em', float: 'none' }}
              >
                Add Section
              </Button>
              <Button
                variant="primary"
                onClick={() => this.openPreview()}
                style={{ margin: '0.5em', float: 'none' }}
              >
                Preview
              </Button>
              <Button
                type="submit"
                variant="success"
                style={{ margin: '0.5em', float: 'none' }}
                disabled={isSubmitting}
              >
                {doc && doc.id ? 'Save Changes' : 'Add Question'}
              </Button>
            </ButtonToolbar>
            <Modal
              show={this.state.showPreview}
              onHide={() => this.closePreview()}
            >
              <Modal.Header closeButton>
                <Modal.Title>Question Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.renderPreview(values)}</Modal.Body>
            </Modal>
          </Form>
        )}
      </Formik>
    );
  }
}

// FIXME: Preview overflowing screen
QuestionEditor.propTypes = {
  paper: PropTypes.string,
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
};

export default withAlert()(QuestionEditor);
