import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";
import {
  SectionEnd,
  Section,
} from "../../../components/utility/containers.styles";
import {
  SentMessageContainer,
  ReceivedMessageContainer,
  MessageStatusContainer,
  MessageText,
} from "./chat-message.styles";
import { Spacer } from "../../../components/spacer/spacer.component";

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

const MessageContainer = ({ isReceived, children }) => {
  return isReceived ? (
    <ReceivedMessageContainer>{children}</ReceivedMessageContainer>
  ) : (
    <SectionEnd>
      <SentMessageContainer>{children}</SentMessageContainer>
    </SectionEnd>
  );
};

const StatusMark = ({ message }) => {
  const iconSize = 16;
  if (message.isRead) {
    return (
      <Ionicons name="checkmark-done-outline" size={iconSize} color="blue" />
    );
  }
  if (message.isDelivered) {
    return (
      <Ionicons name="checkmark-done-outline" size={iconSize} color="grey" />
    );
  } else {
    return <Ionicons name="checkmark-outline" size={iconSize} color="grey" />;
  }
};

const MessageStatus = ({ message, isReceived }) => {
  return (
    <MessageStatusContainer>
      <Text variant="caption">{getTimeString(message.dateCreated)}</Text>
      {isReceived ? null : <StatusMark message={message} />}
    </MessageStatusContainer>
  );
};

export const ChatMessage = ({ message, isReceived, isGroupChat }) => {
  return (
    <Section>
      <MessageContainer isReceived={isReceived}>
        {isGroupChat && isReceived && (
          <Spacer position="bottom" size="small">
            <Text variant="caption">
              {message.user.name.first} {message.user.name.last}
            </Text>
          </Spacer>
        )}

        <MessageText>{message.message}</MessageText>
        <MessageStatus message={message} isReceived={isReceived} />
      </MessageContainer>
    </Section>
  );
};
