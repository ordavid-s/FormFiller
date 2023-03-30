import React from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

const ImagePickerContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const ImagePicker = () => {
  return (
    <ImagePickerContainer>
      <FontAwesome name="photo" size={32} color="black" />
    </ImagePickerContainer>
  );
};
