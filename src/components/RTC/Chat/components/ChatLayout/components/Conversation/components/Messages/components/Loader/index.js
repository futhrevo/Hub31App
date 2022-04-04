import React from 'react';
import cn from 'classnames';

import './styles.scss';

const Loader = ({ typing }) => {
  return (
    <div className={cn('loader', { active: typing })}>
      <div className="loader-container">
        <span className="loader-dots"></span>
        <span className="loader-dots"></span>
        <span className="loader-dots"></span>
      </div>
    </div>
  );
}

export default Loader;
