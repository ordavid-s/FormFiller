import React, { useContext } from "react";
import { View } from "react-native";
import { Avatar, Colors } from "react-native-paper";
import styled from "styled-components";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Text } from "../../../components/typography/text.component";
import { UserContext } from "../../../services/user/user.context";

const ChatContainer = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space[2]}
  flex-direction: row;
`;

const ChatDateContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const getTimeString = (date) => {
  const [hour, minutes] = [
    date
      .getHours()
      .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }),
    date
      .getMinutes()
      .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }),
  ];
  return `${hour}:${minutes}`;
};

const getDateString = (date) => {
  const [year, month, day] = [
    date.getUTCFullYear().toString().slice(-2),
    date.getUTCMonth(),
    date.getUTCDate(),
  ];
  return `${day}/${month}/${year}`;
};

const isSameDay = (d1, d2) => {
  return (
    d1.getUTCFullYear() == d2.getUTCFullYear() &&
    d1.getUTCMonth() == d2.getUTCMonth() &&
    d1.getUTCDate() == d2.getUTCDate()
  );
};

export const ChatPreview = ({ chatroom }) => {
  const { currentUser } = useContext(UserContext);

  const otherUser = chatroom.participants.find(
    (usr) => usr.uid !== currentUser.uid
  );
  const getIcon = () => {
    if (chatroom.isGroupChat) {
      return chatroom.groupchatImage ? (
        <Avatar.Image size={64} source={chatroom.groupchatImage} />
      ) : (
        <Avatar.Icon
          size={64}
          icon="account-group"
          backgroundColor={Colors.black}
        />
      );
    } else {
      return otherUser.profilePhoto ? (
        <Avatar.Image size={64} source={{ uri: otherUser.profilePhoto }} />
      ) : (
        <Avatar.Icon size={64} icon="human" backgroundColor={Colors.black} />
      );
    }
  };

  return (
    <ChatContainer>
      <Spacer position="right" size="extraLarge">
        {getIcon()}
      </Spacer>
      <View>
        <Spacer position="bottom" size="large">
          {chatroom.isGroupChat ? (
            <Text variant="body">{chatroom.roomName}</Text>
          ) : (
            <Text variant="body">
              {otherUser.name.first} {otherUser.name.last}
            </Text>
          )}
        </Spacer>
        <Text variant="label">{chatroom.lastMessage}</Text>
      </View>
      <ChatDateContainer>
        <Text variant="caption">
          {isSameDay(new Date(), chatroom.lastDateWroteTo.toDate())
            ? getTimeString(chatroom.lastDateWroteTo.toDate())
            : getDateString(chatroom.lastDateWroteTo.toDate())}
        </Text>
      </ChatDateContainer>
    </ChatContainer>
  );
};
