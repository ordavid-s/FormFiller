import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Button } from "react-native";

import { SpeechToTextContextProvider } from "../../services/speechToText/speechToText.context";
import { ChatGptContextProvider } from "../../services/chatgpt/chatgpt.context";
import { RecordScreen } from "../../features/record/screens/record.screen";
import { SafeArea } from "../../components/utility/safe-area.component";
import { TaskScreen } from "../../features/tasks/screens/tasks.screen";

const Tab = createBottomTabNavigator();

const EmptyView = () => {
  return (
    <SafeArea>
      <Button
        title="logout"
        onPress={() => {
          return;
        }}
      >
        Logout
      </Button>
    </SafeArea>
  );
};

const TAB_ICON = {
  Record: "microphone",
  Form: "form-select",
  Tasks: "format-list-checks",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  const headerShown = route.name === "Settings" ? false : false;
  return {
    tabBarIcon: ({ size, color }) => (
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    ),
    headerShown: headerShown,
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export const AppNavigator = () => (
  <ChatGptContextProvider>
    <SpeechToTextContextProvider>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen name="Record" component={RecordScreen} />
        <Tab.Screen name="Form" component={EmptyView} />
        <Tab.Screen name="Tasks" component={TaskScreen} />
      </Tab.Navigator>
    </SpeechToTextContextProvider>
  </ChatGptContextProvider>
);
