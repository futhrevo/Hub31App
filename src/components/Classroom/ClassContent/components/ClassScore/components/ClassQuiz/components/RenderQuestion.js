import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Card } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';

import McqList from '../../../../../../../QuestionPaper/components/QuestionEditor/components/options/McqList';
import MultiSelectList from '../../../../../../../QuestionPaper/components/QuestionEditor/components/options/MultiSelectList';
import McqTableList from '../../../../../../../QuestionPaper/components/QuestionEditor/components/options/McqTableList';
import OneBlankInput from '../../../../../../../QuestionPaper/components/QuestionEditor/components/options/OneBlankInput';

// TODO: Prevent edits once test is done and submissions
class RenderQuestion extends Component {
  getClassName(index, id) {
    const { review, truth } = this.props;
    let qclassName = '';
    if (review) {
      // class quiz
      if (truth && typeof truth[0] === 'string') {
        if (truth && truth.indexOf(id) > -1) {
          qclassName = `${qclassName} renderTrue`;
        } else {
          qclassName = `${qclassName} renderFalse`;
        }
        return qclassName;
      }
      // group quiz
      if (truth && truth[id] > 0) {
        qclassName = `${qclassName} renderTrue`;
      } else {
        qclassName = `${qclassName} renderFalse`;
      }
    }
    return qclassName;
  }

  render() {
    const {
      doc, id, qid, onChange, answers,
    } = this.props;
    return (
      <li className="renderQuestion">
        {doc &&
          doc.question.map((opt, index) => {
            const { optionsIndex } = opt;
            return (
              <div key={index}>
                <Card className={this.getClassName(index, doc.id)}>
                  {opt.section ? (
                    <Card.Header>{opt.section}</Card.Header>
                  ) : null}
                  <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: opt.question }} />
                    <form>
                      {optionsIndex === 0 ? (
                        <McqList
                          items={opt.mcqinputs}
                          answers={answers}
                          id={id}
                          qid={qid}
                          sid={index}
                          onChange={onChange}
                          test
                        />
                      ) : (
                        ' '
                      )}
                      {optionsIndex === 1 ? (
                        <MultiSelectList
                          items={opt.mcqinputs}
                          answers={answers}
                          id={id}
                          qid={qid}
                          sid={index}
                          onChange={onChange}
                          test
                        />
                      ) : (
                        ' '
                      )}
                      {optionsIndex === 2 ? (
                        <McqTableList
                          colItems={opt.mcqtable[0]}
                          rowItems={opt.mcqtable[1]}
                          answers={answers}
                          id={id}
                          qid={qid}
                          sid={index}
                          onChange={onChange}
                          test
                        />
                      ) : (
                        ' '
                      )}
                      {optionsIndex === 3 ? (
                        <OneBlankInput
                          answers={answers}
                          id={id}
                          qid={qid}
                          sid={index}
                          onChange={onChange}
                          test
                        />
                      ) : (
                        ' '
                      )}
                    </form>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        {doc && doc.explain ? (
          <Alert variant="info">
            <strong>Explaination</strong>
            <div>{doc.explain}</div>
          </Alert>
        ) : (
          ''
        )}
        {doc && doc.tags ? (
          <TagsInput
            value={doc.tags}
            disabled
            inputProps={{ placeholder: '' }}
          />
        ) : (
          ''
        )}
      </li>
    );
  }
}

RenderQuestion.propTypes = {
  doc: PropTypes.object,
  preview: PropTypes.bool,
  id: PropTypes.number,
  qid: PropTypes.string,
  onChange: PropTypes.func,
  answers: PropTypes.array,
  review: PropTypes.bool,
};

export default RenderQuestion;
