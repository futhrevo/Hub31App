import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, Modal } from 'react-bootstrap';
import TagsInput from 'react-tagsinput';

import McqList from './QuestionEditor/components/options/McqList';
import MultiSelectList from './QuestionEditor/components/options/MultiSelectList';
import McqTableList from './QuestionEditor/components/options/McqTableList';
import OneBlankInput from './QuestionEditor/components/options/OneBlankInput';
import 'react-tagsinput/react-tagsinput.css';

const RenderQPreview = ({ doc, show, onHide }) => {
  if (!show) {
    return null;
  }
  if (!doc) {
    return null;
  }
  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Question Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="renderQpreview">
          {doc &&
            doc.question.map((opt, index) => {
              const { optionsIndex } = opt;
              return (
                <div key={index}>
                  <Card>
                    {opt.section ? (
                      <Card.Header>{opt.section}</Card.Header>
                    ) : null}
                    <Card.Body>
                      <div dangerouslySetInnerHTML={{ __html: opt.question }} />
                      {optionsIndex === 0 ? (
                        <McqList
                          items={opt.mcqinputs}
                          answers={doc.answers[index]}
                          sid={index}
                          preview
                        />
                      ) : (
                        ' '
                      )}
                      {optionsIndex === 1 ? (
                        <MultiSelectList
                          items={opt.mcqinputs}
                          answers={doc.answers[index]}
                          sid={index}
                          preview
                        />
                      ) : (
                        ' '
                      )}
                      {optionsIndex === 2 ? (
                        <McqTableList
                          colItems={opt.mcqtable[0]}
                          rowItems={opt.mcqtable[1]}
                          answers={doc.answers[index]}
                          sid={index}
                          preview
                        />
                      ) : (
                        ' '
                      )}
                      {optionsIndex === 3 ? (
                        <OneBlankInput
                          answers={doc.answers[index]}
                          sid={index}
                          preview
                        />
                      ) : (
                        ' '
                      )}
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
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
};

RenderQPreview.propTypes = {
  doc: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

RenderQPreview.defaultProps = {
  doc: {}
}
export default RenderQPreview;
// withTracker((props) => {
//   const documentId = props.id;
//   return {
//     doc: Questions.findOne(documentId),
//   };
// })(RenderQPreview);
