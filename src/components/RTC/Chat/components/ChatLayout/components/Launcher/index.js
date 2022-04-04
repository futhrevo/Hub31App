import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Badge from './components/Badge';
import { setBadgeCount } from '../../../../../../../redux/iot/chatActions';
import "./styles.scss";

import openLauncher from '../../../../../../../assets/chat-open.svg';
import closeLauncher from '../../../../../../../assets/clear-button.svg';

const Launcher = ({ toggle, chatId, openLabel, closeLabel }) => {
  const dispatch = useDispatch();
  const { showChat, badgeCount } = useSelector((state) => ({
    showChat: state.IOT.chat.ux.showChat,
    badgeCount: state.IOT.chat.message.badgeCount
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat)
      dispatch(setBadgeCount(0));
  };

  return (
    <button type="button" className={`rcw-launcher ${showChat ? 'rcw-hide-sm' : ''}`} onClick={toggleChat} aria-controls={chatId}>
      {!showChat && <Badge badge={badgeCount} />}
      {showChat ?
        <img src={closeLauncher} className="rcw-close-launcher" alt={openLabel} /> :
        <img src={openLauncher} className="rcw-open-launcher" alt={closeLabel} />
      }
    </button>
  );
}

export default Launcher;
