import React, { useState, createContext, useEffect } from "react";

import {
  requestChatgptResponse,
  chatgptResponseTransform,
} from "./chatgpt.service";

const key2url = {
  hackathon: "https://free3d.com/3d-model/nimbasa-city-9452.html",
  dinosaurs:
    "https://mywebar.com/p/Project_0_ur1wnhcojn?_ga=2.85657052.414931257.1680202510-2146608335.1680202510",
  city: "https://mywebar.com/p/Project_2_n0ntgkxkk4?_ga=2.180973026.414931257.1680202510-2146608335.1680202510",
  forest:
    "https://mywebar.com/p/Project_1_lrj06ksu8y?_ga=2.181510626.414931257.1680202510-2146608335.1680202510",
};

export const ChatGptContext = createContext();

export const ChatGptContextProvider = ({ children }) => {
  const [chatgptInput, setChatgptInput] = useState([]);
  const [chatgptResponse, setChatgptResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");

  const requestChatAnswer = () => {
    setIsLoading(true);
    requestChatgptResponse(chatgptInput[chatgptInput.length - 1])
      .then(chatgptResponseTransform)
      .then((results) => {
        setChatgptResponse((oldResponses) => [
          ...oldResponses,
          results.toLowerCase(),
        ]);
        setUrl(key2url[results.toLowerCase()]);
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
        url,
        error,
      }}
    >
      {children}
    </ChatGptContext.Provider>
  );
};
