import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Animated } from "react-native";

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

const MicIconContainer = styled(MaterialCommunityIcons)`
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
  border-radius: 100px;
  justify-content: center;
`;

const MicCover = styled.View`
  overflow: hidden;
`;

const MicIcon = styled(MaterialCommunityIcons)`
  position: absolute;
`;

export const RecordButton = ({ status, onPress, voiceScale }) => {
  let icon = status ? "square" : "microphone";
  let color = status ? "red" : "black";
  if (!voiceScale) {
    voiceScale = 0.5;
  }
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status) {
      Animated.timing(scale, { toValue: 0.5, useNativeDriver: true }).start();
    }
  }, [status]);

  return (
    <ButtonContainer
      onPress={() => {
        scale.setValue(1);

        onPress();
      }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <MicIconContainer>
          <MicIcon name={icon} size={100} color={color} />
        </MicIconContainer>
      </Animated.View>
    </ButtonContainer>
  );
};
