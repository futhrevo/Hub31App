import React from 'react';
import timeago from 'epoch-timeago';


import './styles.scss';

import { ReactComponent as Sent } from '../../../../../../../../../../../assets/sent-ear.svg';
import { ReactComponent as Recv } from '../../../../../../../../../../../assets/recv-ear.svg';

const Message = ({ message, own }) => {
  return (
    <>
      {own && <span className="rcw-tail sent"><Sent /></span>}
      <div className={`rcw-${own}`}>
        <div className="rcw-author mr-5">{own ? 'ME' : message.author}</div>
        <div className="rcw-message-text"><b>{message.text}</b></div>
        <div className="rcw-timestamp">{timeago(message.time)}</div>
      </div>
      {!own && <span className="rcw-tail recv"><Recv /></span>}
    </>

  );
}

export default Message;
