import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Dropdown, ButtonGroup } from 'react-bootstrap';

import CourseAddChapter from './CourseAddChapter';
import Icon from '../../../Icon';

const ChapterCard = (props) => {
  const {
    ind, chapter, edit, courseId, handleUp, handleDown, handleRemove
  } = props;

  const [modify, toggleModify] = useState(false);
  return (
    <Fragment>
      <div>
        <div className="border mb-3 card1">
          <div className="ml-3 py-2 d-flex flex-row">
            <span className="pr-3">{ind + 1}.</span>
            <div style={{ overflow: 'hidden' }} className="d-flex flex-1">
              {chapter.desc}
            </div>
            {edit && (
              <div className="ml-3">
                <ButtonGroup aria-label="Chapter actions">
                  <Button
                    size="sm"
                    variant="link"
                    className="mb-2"
                    onClick={() => handleUp(chapter.id, courseId, ind,)}
                  >
                    <Icon iconStyle="solid" icon="angle-double-up" />
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => handleDown(chapter.id, courseId, ind)}
                  >
                    <Icon iconStyle="solid" icon="angle-double-down" />
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => toggleModify(true)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRemove(chapter.id, courseId, ind)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={modify} onHide={() => toggleModify(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Chapter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseAddChapter
            courseId={courseId}
            doc={chapter}
            onSuccess={() => toggleModify(false)}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

ChapterCard.propTypes = {
  ind: PropTypes.number,
  chapter: PropTypes.object,
  edit: PropTypes.bool,
  courseId: PropTypes.string,
};

export default ChapterCard;
