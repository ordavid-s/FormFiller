import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";

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
  const onRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setChatgptInput((oldInput) => [
        ...oldInput,
        "Hi Joe how are you doing I’m ok really bored. That sucks im sorry to hear hopefully you can play some games later today I really hope so I have here a couple questions if you don’t mind sure how is your pain do you still have any yeah it hurts a bit when I walk could you give me level of pain from one to ten around a 4 have you managed to go to the bathroom at all no not yet I can’t rly walk too much any vomitting no none so far and is the medicine helping yeah it reduces the pain a lot thank you I really hope you feel better",
      ]);
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
