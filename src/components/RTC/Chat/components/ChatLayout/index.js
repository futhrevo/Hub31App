import cn from 'classnames';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openFullscreenPreview } from '../../../../../redux/iot/chatActions';
import { Conversation, FullScreenPreview, Launcher } from './components';
import "./styles.scss";


const ChatLayout = ({
  title,
  titleAvatar,
  subtitle,
  onSendMessage,
  onToggleConversation,
  senderPlaceHolder,
  onQuickButtonClicked,
  profileAvatar,
  showCloseButton,
  fullScreenMode,
  autofocus,
  customLauncher,
  onTextInputChange,
  chatId,
  launcherOpenLabel,
  launcherCloseLabel,
  sendButtonAlt,
  showTimeStamp,
  imagePreview,
  zoomStep,
  topic,
  online
}) => {
  const dispatch = useDispatch();
  const { showChat, disableInput, visible } = useSelector((state) => ({
    showChat: state.IOT.chat.ux.showChat,
    disableInput: state.IOT.chat.ux.disabledInput,
    visible: state.IOT.chat.fs.visible
  }));

  const messageRef = useRef(null);
  useEffect(() => {
    if (showChat) {
      messageRef.current = document.getElementById('messages');
    }
    return () => {
      messageRef.current = null;
    };
  }, [showChat]);

  const eventHandle = useCallback(evt => {
    if (evt.target && evt.target.className === 'rcw-message-img') {
      const { src, alt, naturalWidth, naturalHeight } = evt.target;
      const obj = {
        src: src,
        alt: alt,
        width: naturalWidth,
        height: naturalHeight,
      };
      dispatch(openFullscreenPreview(obj));
    }
  }, [dispatch]);

  /**
    * Previewer needs to prevent body scroll behavior when fullScreenMode is true
    */
  useEffect(() => {
    const target = messageRef?.current;
    if (imagePreview && showChat) {
      target === null || target === void 0 ? void 0 : target.addEventListener('click', eventHandle, false);
    }
    return () => {
      target === null || target === void 0 ? void 0 : target.removeEventListener('click', eventHandle);
    };
  }, [imagePreview, showChat, eventHandle]);

  useEffect(() => {
    document.body.setAttribute('style', `overflow: ${visible || fullScreenMode ? 'hidden' : 'auto'}`);
  }, [fullScreenMode, visible]);

  return (
    <div className={cn('rcw-widget-container', {
      'rcw-full-screen': fullScreenMode,
      'rcw-previewer': imagePreview
    })
    }>
      {showChat &&
        <Conversation
          title={title}
          subtitle={subtitle}
          sendMessage={onSendMessage}
          senderPlaceHolder={senderPlaceHolder}
          profileAvatar={profileAvatar}
          toggleChat={onToggleConversation}
          showCloseButton={showCloseButton}
          disabledInput={disableInput}
          autofocus={autofocus}
          titleAvatar={titleAvatar}
          className={showChat ? 'active' : 'hidden'}
          onQuickButtonClicked={onQuickButtonClicked}
          onTextInputChange={onTextInputChange}
          sendButtonAlt={sendButtonAlt}
          showTimeStamp={showTimeStamp}
          topic={topic}
          online={online}
        />
      }
      {!fullScreenMode &&
        <Launcher
          toggle={onToggleConversation}
          chatId={chatId}
          openLabel={launcherOpenLabel}
          closeLabel={launcherCloseLabel}
        />
      }
      {
        imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />
      }
    </div>
  );
}

export default ChatLayout;
