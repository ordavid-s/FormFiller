import React, { useState, useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import Voice from "@react-native-voice/voice";

import { SpeechToTextContext } from "../../../services/speechToText/speechToText.context";
import { ChatGptContext } from "../../../services/chatgpt/chatgpt.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RecordButton } from "../components/record-button.component";
// import Voice from "@react-native-voice/voice";

const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RecordScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const { setChatgptInput, chatgptInput, chatgptResponse } =
    useContext(ChatGptContext);

  const { startRecognizing, stopRecognizing, results } =
    useContext(SpeechToTextContext);

  const onRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecognizing();
    } else {
      const recFunc = async () => {
        stopRecognizing();
      };
      recFunc().then(() => {
        setChatgptInput((oldInput) => results);
        // function sleep(ms) {
        //   return new Promise((resolve) => setTimeout(resolve, ms));
        // }
        // sleep(2000);

        // navigation.navigate("AR");
        console.log(`rec results: ${results}`);
      });
    }
  };
  return (
    <SafeArea>
      <ScreenContainer>
        <RecordButton status={isRecording} onPress={onRecord} />
      </ScreenContainer>
    </SafeArea>
  );
};
