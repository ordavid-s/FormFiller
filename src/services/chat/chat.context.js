import React, { useState, createContext, useEffect, useContext } from "react";

import {
  requestTextSend,
  requestMessages,
  sendChatbotText,
} from "./chat.service";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentChatMessages, setCurrentChatMessages] = useState([]);

  const retrieveMessages = () => {
    requestMessages(setCurrentChatMessages).then((res) => {
      setCurrentChatMessages((old) => res);
      setIsLoading(false);
    });
  };

  const sendText = (message, user) => {
    requestTextSend(message, user);
  };

  const updateChat = () => {
    retrieveMessages();
  };

  useEffect(() => {
    retrieveMessages();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        isLoading,
        updateChat,
        error,
        currentChatMessages,
        sendText,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
