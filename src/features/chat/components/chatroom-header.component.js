import React, { useContext } from "react";
import styled from "styled-components";
import { HeaderTitle } from "@react-navigation/elements";
import { Avatar, Colors } from "react-native-paper";
import { TouchableWithoutFeedback } from "react-native";

import { Text } from "../../../components/typography/text.component";
import { ChatContext } from "../../../services/chat/chat.context";
import { UserContext } from "../../../services/user/user.context";
import { Spacer } from "../../../components/spacer/spacer.component";

const HeaderContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

const getIcon = (chatroom, otherUser) => {
  const iconSize = 32;
  if (chatroom.isGroupChat) {
    return chatroom.groupchatImage ? (
      <Avatar.Image size={iconSize} source={{ uri: chatroom.groupchatImage }} />
    ) : (
      <Avatar.Icon
        size={iconSize}
        icon="account-group"
        backgroundColor={Colors.black}
      />
    );
  } else {
    return otherUser.profilePhoto ? (
      <Avatar.Image size={iconSize} source={{ uri: otherUser.profilePhoto }} />
    ) : (
      <Avatar.Icon
        size={iconSize}
        icon="human"
        backgroundColor={Colors.black}
      />
    );
  }
};

export const ChatroomHeader = ({ navigation }) => {
  const { currentChatroom } = useContext(ChatContext);
  const { currentUser } = useContext(UserContext);
  const otherUser = currentChatroom.participants.find(
    (usr) => usr.uid !== currentUser.uid
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (currentChatroom.isGroupChat) {
          navigation.navigate("GroupchatParticipants", {
            participants: currentChatroom.participants,
          });
        } else {
          navigation.navigate("ChatProfile");
        }
      }}
    >
      <HeaderContainer>
        <Spacer position="right" size="large">
          {getIcon(currentChatroom, otherUser)}
        </Spacer>
        <HeaderTitle>
          {currentChatroom.isGroupChat
            ? currentChatroom.roomName
            : `${otherUser.name.first} ${otherUser.name.last}`}
        </HeaderTitle>
      </HeaderContainer>
    </TouchableWithoutFeedback>
  );
};
