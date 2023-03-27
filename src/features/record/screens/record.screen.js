import React from "react";
import styled from "styled-components";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RecordButton } from "../components/record-button.component";

const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RecordScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <ScreenContainer>
        <RecordButton />
      </ScreenContainer>
    </SafeArea>
  );
};
