import React, { useContext, useEffect, useState } from "react";

import { ChatContext } from "../../../services/chat/chat.context";
import { LoadingWheel } from "../../../components/loading/loading.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Chat } from "../components/chat.component";

export const ChatroomScreen = ({ route, navigation }) => {
  const { isLoading, currentChatMessages, sendText, updateChat } =
    useContext(ChatContext);
  const [messages, setMessages] = useState(currentChatMessages);

  useEffect(() => {
    setMessages(currentChatMessages);
    updateChat();
  }, [currentChatMessages]);

  const onSend = (newMessage) => {
    sendText(newMessage, 1);
    updateChat();
    setMessages(currentChatMessages);
  };
  return (
    <>
      <SafeArea>
        {isLoading ? (
          <LoadingWheel />
        ) : (
          <>
            <Chat messages={messages} onSend={onSend} />
          </>
        )}
      </SafeArea>
    </>
  );
};
