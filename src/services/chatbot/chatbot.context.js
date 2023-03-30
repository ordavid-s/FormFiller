import React, { useState, createContext, useEffect } from "react";

import {
  requestChatbotResponse,
  chatbotResponseTransform,
} from "./chatbot.service";

export const ChatbotContext = createContext();

export const ChatbotContextProvider = ({ children }) => {
  const [chatbotInput, setchatbotInput] = useState([]);
  const [chatbotResponse, setchatbotResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestChatAnswer = () => {
    setIsLoading(true);
    requestChatbotResponse(chatbotInput[chatbotInput.length - 1])
      .then(chatbotResponseTransform)
      .then((results) => {
        setchatbotResponse((oldResponses) => [...oldResponses, results]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err);
      });
  };
  useEffect(() => {
    requestChatAnswer();
  }, [chatbotInput]);

  return (
    <ChatbotContext.Provider
      value={{
        setchatbotInput,
        chatbotInput,
        chatbotResponse,
        isLoading,
        error,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
