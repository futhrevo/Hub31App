import React from 'react';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import "./styles.scss";

const Conversation = ({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  disabledInput,
  autofocus,
  className,
  sendMessage,
  toggleChat,
  profileAvatar,
  titleAvatar,
  onQuickButtonClicked,
  onTextInputChange,
  sendButtonAlt,
  showTimeStamp,
  topic,
  online
}) => {
  return (
    <div className={`rcw-conversation-container ${className}`} aria-live="polite">
      <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
        online={online}
      />
      <Messages profileAvatar={profileAvatar} showTimeStamp={showTimeStamp} topic={topic} />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      <Sender
        sendMessage={sendMessage}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
        autofocus={autofocus}
        onTextInputChange={onTextInputChange}
        buttonAlt={sendButtonAlt}
      />
    </div>
  );
}

export default Conversation;
