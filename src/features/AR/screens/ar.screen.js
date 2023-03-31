import React, { useContext } from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ChatGptContext } from "../../../services/chatgpt/chatgpt.context";
import { LoadingWheel } from "../../../components/loading/loading.component";

export const MyWeb = () => {
  const { isLoading, url } = useContext(ChatGptContext);

  return (
    <SafeArea>
      {!isLoading ? (
        <WebView
          source={{
            uri: url,
          }}
        />
      ) : (
        <LoadingWheel />
      )}
    </SafeArea>
  );
};
