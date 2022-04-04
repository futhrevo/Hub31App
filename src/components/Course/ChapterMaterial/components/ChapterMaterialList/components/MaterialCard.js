import React, { useState, Fragment } from 'react';

import PropTypes from 'prop-types';
import { Button, Modal, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ChapterAddMaterial from './ChapterAddMaterial';
import Icon from '../../../../../Icon';
import {
  getMaterialGlyph,
  getmaterialPath,
} from '../../../../../../modules/getMaterialGlyph';

const MaterialCard = (props) => {
  const {
    ind, material, edit, courseId, chapterId, handleRemove, handleUp, handleDown
  } = props;
  const [modify, toggleModify] = useState(false);
  const glyph = getMaterialGlyph(material.mtype);
  return (
    <Fragment>
      <div>
        <div className="border mb-3 card1">
          <div className="ml-3 py-2 d-flex flex-row">
            <span>
              <Icon iconStyle="solid" icon={glyph} className="pr-3" />
            </span>
            <div style={{ overflow: 'hidden' }} className="d-flex flex-1">
              <Link
                to={{ pathname: getmaterialPath(courseId, chapterId, material.id, material.mtype, material.link), state: { courseId, chapterId, material } }}
                className="text-decoration-none truncated-text flex-1"
              >
                {material.title}
              </Link>
            </div>
            {edit && (
              <div className="ml-3">
                <ButtonGroup aria-label="Material actions">
                  <Button
                    size="sm"
                    variant="link"
                    className="mb-2"
                    onClick={() => handleUp(material.id, chapterId, courseId, ind)}
                  >
                    <Icon iconStyle="solid" icon="angle-double-up" />
                  </Button>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => handleDown(material.id, chapterId, courseId, ind)}
                  >
                    <Icon iconStyle="solid" icon="angle-double-down" />
                  </Button>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => toggleModify(true)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRemove(material.id, chapterId, courseId, ind)}>Delete</Dropdown.Item>
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
          <ChapterAddMaterial
            courseId={courseId}
            chapterId={chapterId}
            doc={material}
            onSuccess={() => toggleModify(false)}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

MaterialCard.propTypes = {
  ind: PropTypes.number,
  material: PropTypes.object,
  edit: PropTypes.bool,
  courseId: PropTypes.string,
  chapterId: PropTypes.string,
};
export default MaterialCard;
