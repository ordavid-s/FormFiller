import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RecordButton } from "../components/record-button.component";
import Voice from "@react-native-voice/voice";

const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RecordScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const onRecord = () => {
    setIsRecording(!isRecording);
    alert(`available voice: ${Voice.isAvailable()}`);
  };
  return (
    <SafeArea>
      <ScreenContainer>
        <RecordButton status={isRecording} onPress={onRecord} />
      </ScreenContainer>
    </SafeArea>
  );
};
