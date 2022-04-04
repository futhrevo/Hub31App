import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserAvatar from 'react-user-avatar';

import Loader from './components/Loader';
import Message from './components/Message';

import { scrollToBottom } from '../../../../../../../../../modules/utils';
import { setBadgeCount, markAllMessagesRead } from '../../../../../../../../../redux/iot/chatActions';

import "./styles.scss";
// const mock = [
//   {
//     author: 'TEST',
//     time: Date.now() + 100,
//     text: 'Test Message'
//   },
//   {
//     author: 'TEST',
//     time: Date.now(),
//     text: 'Test Message'
//   },
//   {
//     author: 'TEST',
//     time: Date.now() + 200,
//     text: 'Test Message Test Message Test Message Test MessageTest Message Test Message Test Message'
//   },
//   {
//     id: 'ap-south-1:5d73b519-bf03-4d09-9e1b-67248c9856a8',
//     author: 'TEST',
//     time: Date.now() + 300,
//     text: 'Test Message'
//   },
//   {
//     author: 'TESTER',
//     time: Date.now() + 400,
//     text: 'Test Message'
//   },
//   {
//     author: 'TEST',
//     time: Date.now() + 500,
//     text: 'Test Message'
//   },
//   {
//     author: 'TESTERISGREAT',
//     time: Date.now() + 600,
//     text: 'Test Message'
//   },
//   {
//     id: 'ap-south-1:5d73b519-bf03-4d09-9e1b-67248c9856a8',
//     author: 'TESTER TESTER',
//     time: Date.now() + 700,
//     text: 'Test Message'
//   },
// ];
const Messages = ({ profileAvatar, showTimeStamp, topic }) => {
  const dispatch = useDispatch();
  const { messages, typing, showChat, badgeCount, owner } = useSelector((state) => ({
    messages: (state.IOT.topics[topic] || {}).messages || [],
    badgeCount: state.IOT.chat.message.badgeCount,
    typing: state.IOT.chat.ux.messageLoader,
    showChat: state.IOT.chat.ux.showChat,
    owner: state.Accounts.identityId,
  }));

  const messageRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messageRef.current);
    if (showChat && badgeCount)
      dispatch(markAllMessagesRead(topic));
    else
      dispatch(setBadgeCount(messages.filter((message) => message.unread).length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div id="messages" className="rcw-messages-container" ref={messageRef}>
      {messages.map((el, index) => <div key={el.time} className="rcw-message">
        {el.id === owner && <UserAvatar size="30" className="rcw-avatar" name={el.author} />}

        <Message message={el} own={el.id === owner} />
      </div>)}
      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
