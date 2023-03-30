import styled from "styled-components";
import { Colors } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";

export const ReceivedMessageContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 10px;
  background: ${Colors.white};
  max-width: 70%;
`;

export const SentMessageContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 10px;
  background: ${Colors.yellow100};
  max-width: 70%;
`;

export const MessageStatusContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const MessageText = styled(Text).attrs({ variant: "label" })`
  margin-right: 20px;
`;
