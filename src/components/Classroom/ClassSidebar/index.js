import React from 'react';
import PropTypes from 'prop-types';

import MaterialItemContainer from './components/MaterialItem';

const ClassSidebar = ({ hidden, chap, mats, selected, onSelect, results }) => {

  return (
    <nav className={`sidebar left ${hidden ? 'hidden' : null}`}>
      <div className="sidebar-header">
        <h6 className="light">{chap && `${chap.desc}`}</h6>
      </div>
      <ul className="list-group">
        {mats
          && mats.map((mat, index) => (
            <MaterialItemContainer
              key={index}
              mat={mat}
              res={results[mat.id]}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
      </ul>
    </nav>
  );
}

ClassSidebar.propTypes = {
  hidden: PropTypes.bool,
  chap: PropTypes.object,
  mats: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
};

export default ClassSidebar;
