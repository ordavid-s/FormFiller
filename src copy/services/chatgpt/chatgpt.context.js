import React, { useState, createContext, useEffect } from "react";

import {
  requestChatgptResponse,
  chatgptResponseTransform,
} from "./chatgpt.service";

export const ChatGptContext = createContext();

export const ChatGptContextProvider = ({ children }) => {
  const [chatgptInput, setChatgptInput] = useState([]);
  const [chatgptResponse, setChatgptResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestChatAnswer = () => {
    setIsLoading(true);
    requestChatgptResponse(chatgptInput[chatgptInput.length - 1])
      .then(chatgptResponseTransform)
      .then((results) => {
        setChatgptResponse((oldResponses) => [...oldResponses, results]);
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
  }, [chatgptInput]);

  return (
    <ChatGptContext.Provider
      value={{
        setChatgptInput,
        chatgptInput,
        chatgptResponse,
        isLoading,
        error,
      }}
    >
      {children}
    </ChatGptContext.Provider>
  );
};
