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

export const RecordButton = ({ status, onPress }) => {
  let icon = status ? "square" : "microphone";
  let color = status ? "red" : "black";
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
        <MaterialCommunityIcons name={icon} size={100} color={color} />
      </Animated.View>
    </ButtonContainer>
  );
};
