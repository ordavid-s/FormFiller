import React from "react";
import styled from "styled-components/native";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useHeaderHeight } from "@react-navigation/elements";

export const ChatList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const ChatDateContainer = styled.View`
  margin-left: auto;
  margin-right: auto;
  opacity: 0.5;
`;

export const TextBoxContainer = styled(KeyboardAvoidingView).attrs({
  behavior: Platform.OS === "ios" ? "padding" : "height",
})`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[1]};
  flex-direction: row;
  margin-bottom: auto;
  margin-top: auto;
  justify-content: flex-end;
  align-items: center;
`;

export const TextBox = styled(TextInput).attrs({
  dense: true,
  mode: "outlined",
  theme: { roundness: 20 },
})`
  flex: 1;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
