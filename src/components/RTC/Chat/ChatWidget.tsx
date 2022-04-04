// Inspired from https://github.com/Wolox/react-chat-widget
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ChatLayout from './components/ChatLayout';
import { toggleChat } from '../../../redux/iot/chatActions';

type ChatWidgetType = {
  handleNewUserMessage?: (input: any) => void;
  handleQuickButtonClicked?: (input: any) => void;
  handleTextInputChange?: () => void;
  handleSubmit?: (input: any) => void;
  customLauncher?: any;
  titleAvatar?: any;
  profileAvatar?: any;
} & typeof defaultProps;
const ChatWidget = ({ title,
  titleAvatar,
  subtitle,
  senderPlaceHolder,
  profileAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  handleNewUserMessage,
  handleQuickButtonClicked,
  handleTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  handleSubmit,
  topic,
  online
}: ChatWidgetType) => {
  const dispatch = useDispatch();

  const toggleConversation = useCallback(() => {
    dispatch(toggleChat());
  }, [dispatch]);

  const handleMessageSubmit = useCallback((event) => {
    event.preventDefault();
    const userInput = event.target.message.value;
    if (!userInput.trim()) {
      return;
    }
    handleSubmit === null || handleSubmit === void 0 ? void 0 : handleSubmit(userInput);
    // TODO: dispatch(addUserMessage(userInput));
    handleNewUserMessage?.(userInput);
    event.target.message.value = '';
  }, [handleSubmit, handleNewUserMessage]);

  const onQuickButtonClicked = useCallback((event, value) => {
    event.preventDefault();
    handleQuickButtonClicked === null || handleQuickButtonClicked === void 0 ? void 0 : handleQuickButtonClicked(value);
  }, [handleQuickButtonClicked]);

  return (
    <ChatLayout
      onToggleConversation={toggleConversation}
      onSendMessage={handleMessageSubmit}
      onQuickButtonClicked={onQuickButtonClicked}
      title={title}
      titleAvatar={titleAvatar}
      subtitle={subtitle}
      senderPlaceHolder={senderPlaceHolder}
      profileAvatar={profileAvatar}
      showCloseButton={showCloseButton}
      fullScreenMode={fullScreenMode}
      autofocus={autofocus}
      customLauncher={customLauncher}
      onTextInputChange={handleTextInputChange}
      chatId={chatId}
      launcherOpenLabel={launcherOpenLabel}
      launcherCloseLabel={launcherCloseLabel}
      sendButtonAlt={sendButtonAlt}
      showTimeStamp={showTimeStamp}
      imagePreview={imagePreview}
      zoomStep={zoomStep}
      topic={topic}
      online={online}
    />
  );
}

const defaultProps = {
  title: 'Welcome',
  subtitle: 'This is your chat subtitle',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: true,
  fullScreenMode: false,
  autofocus: true,
  chatId: 'rcw-chat-container',
  launcherOpenLabel: 'Open chat',
  launcherCloseLabel: 'Close chat',
  sendButtonAlt: 'Send',
  showTimeStamp: true,
  imagePreview: false,
  zoomStep: 80,
  topic: 'chat/test',
  online: true
}
ChatWidget.defaultProps = defaultProps;
export default ChatWidget;
