import React, { useState, useEffect } from "react";
import { Text } from "react-native-paper";
import styled from "styled-components";
import Voice from "@react-native-voice/voice";

import { SpeechToTextContext } from "../../../services/speechToText/speechToText.context";
import { ChatGptContext } from "../../../services/chatgpt/chatgpt.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
// import Voice from "@react-native-voice/voice";

const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TaskScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <ScreenContainer>
        <Text>hi</Text>
      </ScreenContainer>
    </SafeArea>
  );
};
