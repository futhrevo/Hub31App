import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import "./styles.scss";
import send from '../../../../../../../../../assets/send-button.svg';

const Sender = ({ sendMessage, placeholder, disabledInput, autofocus, onTextInputChange, buttonAlt }) => {
  const showChat = useSelector((state) => state.IOT.chat.ux.showChat);
  const inputRef = useRef(null);

  useEffect(() => {
    var _a; if (showChat)
      (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
  }, [showChat]);

  return (
    <form className="rcw-sender" onSubmit={sendMessage}>
      <input
        type="text"
        className="rcw-new-message"
        name="message"
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabledInput}
        autoFocus={autofocus}
        autoComplete="off"
        onChange={onTextInputChange}
      />
      <button type="submit" className="rcw-send">
        <img src={send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
    </form>
  );
}

export default Sender;
