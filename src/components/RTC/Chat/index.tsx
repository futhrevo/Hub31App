import { useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getChatTopic, getControlTopic, sendChatMsg } from "../../../redux/iot/topicUtils";
import { RootState } from "../../../redux/store";
import { addSubs, delSubs } from '../../../redux/iot/actions';
import ChatWidget from "./ChatWidget";
import { useChatService } from './useChatService';

const Chat = ({ channel }: { channel: string }) => {
  const dispatch = useDispatch();
  const chatTopic = useMemo(() => getChatTopic(channel), [channel]);
  const ctrlTopic = useMemo(() => getControlTopic(channel), [channel]);

  const { ctrlMsg, identity, dname, online } = useSelector((state: RootState) => ({
    online: state.IOT.iot.connect,
    identity: state.Accounts.identityId,
    dname: state.Accounts.dname,
    ctrlMsg: state.IOT?.topics[ctrlTopic]?.messages
  }));

  useChatService(ctrlMsg);

  useEffect(() => {
    dispatch(addSubs([chatTopic, ctrlTopic]));
    return () => {
      dispatch(delSubs([chatTopic, ctrlTopic]));
    }
  }, [chatTopic, ctrlTopic, dispatch]);

  const handleNewUserMessage = useCallback((newMessage) => {
    const payload = {
      i: identity,
      n: dname,
      m: newMessage
    }
    sendChatMsg(channel, payload);
    // Now send the message throught the backend API
  }, [dname, identity, channel]);

  return (
    <ChatWidget
      online={online}
      title="Queries"
      subtitle={dname}
      topic={chatTopic}
      handleNewUserMessage={handleNewUserMessage}
    />
  );
}

export default Chat;
