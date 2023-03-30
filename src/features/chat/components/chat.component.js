import React, { useContext, useState, useEffect, useCallback } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { Text } from "../../../components/typography/text.component";
import { ChatMessage } from "./chat-message.component";
import {
  ChatDateContainer,
  TextBoxContainer,
  TextBox,
  MessageContainer,
} from "./chat.styles";
import { SendButton } from "./send-button.component";

const THIS_USER = 1;

const getDateString = (date) => {
  const [year, month, day] = [
    date.getUTCFullYear().toString().slice(-2),
    date.getUTCMonth(),
    date.getUTCDate(),
  ];
  return `${day}/${month}/${year}`;
};

export const Chat = ({ onSend, messages }) => {
  const [text, setText] = useState("");
  const sendText = () => {
    onSend(text);
    setText("");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.messageContainer}>
        {item.isFirstAtDate && (
          <ChatDateContainer>
            <Text variant="caption">{getDateString(item.dateCreated)}</Text>
          </ChatDateContainer>
        )}
        <ChatMessage
          message={item}
          isGroupChat={false}
          isReceived={item.sentBy !== THIS_USER}
        />
      </View>
    );
  };
  const height = useHeaderHeight();
  const keyExtractor = (item, index) => `${item.chatroomid}-${index}`;

  return (
    <>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        inverted
      />
      {/*+ Constants.statusBarHeight to add nav bar */}
      <TextBoxContainer keyboardVerticalOffset={height + 10}>
        <TextBox value={text} onChangeText={setText} />
        <SendButton isPressable={!!text} onPress={() => sendText()} />
      </TextBoxContainer>
    </>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
  },
});
