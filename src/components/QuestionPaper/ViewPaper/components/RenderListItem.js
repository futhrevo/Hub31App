import PropTypes from 'prop-types';
import { ListGroup, ButtonToolbar, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import isEmpty from '../../../../modules/isEmpty';
/**
 * Provide id or doc to render as two line list item
 *
 */
const RenderListItem = ({
  edit,
  onClickEdit,
  id,
  onSelect,
  onClickUp,
  onClickDown,
  move = false,
  doc
}) => {
  const qDoc = useSelector(state => state.QPaper.bank[id]) || doc;
  if (isEmpty(qDoc)) {
    return (<ListGroup.Item>
      <div className="list-text" onClick={() => onSelect(id)}
        role="button"
        aria-hidden>*Item deleted*</div>
    </ListGroup.Item>)
  }
  return (
    <ListGroup.Item>
      <div
        className="list-text"
        onClick={() => onSelect(qDoc)}
        role="button"
        aria-hidden
      >
        {qDoc.question[0] ? (
          <strong>{qDoc.question[0].section}</strong>
        ) : (
          <strong>No question entered</strong>
        )}
        {qDoc.question[0] && (
          <div
            dangerouslySetInnerHTML={{ __html: qDoc.question[0].question }}
          />
        )}
      </div>
      <ButtonToolbar className="d-flex justify-content-end">
        {edit ? (
          <Button size="sm" variant="link" onClick={() => onClickEdit(id)}>
            EDIT
          </Button>
        ) : null}
        {move ? (
          <Button size="sm" variant="link" onClick={() => onClickUp(id)}>
            UP
          </Button>
        ) : null}
        {move ? (
          <Button size="sm" variant="link" onClick={() => onClickDown(id)}>
            DOWN
          </Button>
        ) : null}
      </ButtonToolbar>
    </ListGroup.Item>
  );
}

RenderListItem.propTypes = {
  id: PropTypes.string,
  doc: PropTypes.object,
  onSelect: PropTypes.func,
  edit: PropTypes.bool,
  onClickEdit: PropTypes.func,
  onClickUp: PropTypes.func,
  onClickDown: PropTypes.func,
};

RenderListItem.defaultProps = {

}
export default RenderListItem;
