import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import Icon from '../../../Icon';
import { getMaterialGlyph } from '../../../../modules/getMaterialGlyph';

// https://bootstrapious.com/
const MaterialItem = ({ res = {}, mat, selected, onSelect }) => {
  const glyph = getMaterialGlyph(mat.mtype);
  const done = res && (res.p === mat.points);
  let mclass = '';
  if (mat.id === selected) {
    mclass += ' active';
  }

  return (
    <ListGroup.Item className={mclass} onClick={() => onSelect(mat.id)} action>
      <Icon iconStyle="solid" icon={glyph} className="mr-2" />
      {mat.title}
      {done ? (
        <Icon iconStyle="solid" icon="check" className="ml-2" />
      ) : (
        ''
      )}
    </ListGroup.Item>
  );
}




MaterialItem.propTypes = {
  mat: PropTypes.object,
  res: PropTypes.object,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
};

// export default (MaterialItemContainer = withTracker(props => ({
//   res: StuResults.findOne({ materialid: props.mat.id }) || {},
// }))(MaterialItem));

export default MaterialItem;
