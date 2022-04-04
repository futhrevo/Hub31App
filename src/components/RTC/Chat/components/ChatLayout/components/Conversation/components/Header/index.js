import React from 'react';
import cn from 'classnames';

import "./styles.scss";
import close from '../../../../../../../../../assets/clear-button.svg';

const Header = ({ title, subtitle, toggleChat, showCloseButton, titleAvatar, online }) => {
  return (
    <div className="rcw-header">
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      <h4 className="rcw-title text-light">
        {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
        {title}
      </h4>
      <div className="d-flex justify-content-center align-items-center">
        <div className={cn('rcw-status-dot', { on: online })}></div>
        {subtitle}
      </div>
    </div>
  );
}

export default Header;
