import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const ButtonContainer = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[3]};
  width: 150px;
  height: 150px;
  border-width:3px;
  border-color:black
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

export const RecordButton = () => {
  return (
    <ButtonContainer>
      <MaterialCommunityIcons name={"microphone"} size={100} color={"black"} />
    </ButtonContainer>
  );
};
