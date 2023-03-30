import React, { useEffect } from "react";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Permissions } from "expo";
import * as permissions from "react-native-permissions";
// you may also import just the functions or constants that you will use from this library
import { request, PERMISSIONS } from "react-native-permissions";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";

// import { Navigation } from "./src/infrastructure/navigation";

const requestCameraPermission = async () => {
  try {
    request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    ).then((result) => {
      console.log(result);
    });
  } catch (err) {
    console.warn(err);
  }
};

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  // ask for permissions (android)
  useEffect(() => {
    const askPermAudio = async () => {
      const { status, expires, permissions } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      if (status !== "granted") {
        //Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
        console.log("android permission for audio granted");
      } else {
        console.log("android permission for audio denied");
      }
      askPermAudio();
    };
    requestCameraPermission();
  }, []);

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
}
