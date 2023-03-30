import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styled from "styled-components";

const ButtonContainer = styled(TouchableOpacity)`
  padding: ${(props) => props.theme.space[2]};
  margin-right: 10px;
`;

export const SendButton = ({ isPressable, onPress }) => {
  return (
    <ButtonContainer disabled={!isPressable} onPress={onPress}>
      {isPressable ? (
        <FontAwesome name="send" size={24} color="blue" />
      ) : (
        <FontAwesome name="send-o" size={24} color="grey" />
      )}
    </ButtonContainer>
  );
};
