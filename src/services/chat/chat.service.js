import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  requestChatbotResponse,
  chatbotResponseTransform,
} from "../chatbot/chatbot.service";
export const requestMessages = async (setFunc) => {
  try {
    const value = await AsyncStorage.getItem("@messages");
    if (value !== null) {
      // We have data!!

      const fVal = value != null ? JSON.parse(value) : null;
      for (let i = 0; i < fVal.length; i++) {
        fVal[i].dateCreated = new Date(fVal[i].dateCreated);
      }
      return fVal.reverse();
      // setFunc((old) => fVal);
    } else {
      await AsyncStorage.setItem("@messages", JSON.stringify([]));
    }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};

export const requestChatroomUpdate = async (chatroomId, newData) => {};

export const getChatbotText = async (chatSet) => {
  try {
    const value = await AsyncStorage.getItem("@messages");
    if (value !== null) {
      // We have data!!

      const fVal = value != null ? JSON.parse(value) : null;
      let chatgptMessages = [
        { role: "system", content: "you are a medical chatbot" },
      ];
      for (let i = 0; i < fVal.length; i++) {
        if (fVal[i].user === 1) {
          chatgptMessages.push({ role: "user", content: fVal[i].message });
        } else {
          chatgptMessages.push({ role: "assistant", content: fVal[i].message });
        }
      }
      console.log(JSON.stringify(chatgptMessages));
      return chatgptMessages;
    }
  } catch (error) {
    // Error saving data
  }
};

export const requestTextSend = async (message, user) => {
  try {
    const value = await AsyncStorage.getItem("@messages");
    if (value !== null) {
      // We have data!!

      const fVal = value != null ? JSON.parse(value) : null;
      for (let i = 0; i < fVal.length; i++) {
        fVal[i].dateCreated = new Date(fVal[i].dateCreated);
      }
      const msg1 = {
        sentBy: 1,
        user: { first: "Or", last: "Shafran" },
        message: message,
        dateCreated: new Date(),
        isFirstAtDate: false,
      };
      let texts = await getChatbotText();
      requestChatbotResponse(texts)
        .then(chatbotResponseTransform)
        .then(async (results) => {
          const msg2 = {
            sentBy: 0,
            user: { first: "Or", last: "Shafran" },
            message: results,
            dateCreated: new Date(),
            isFirstAtDate: false,
          };

          const jsonValue = JSON.stringify([...fVal, msg1, msg2]);
          console.log("jsonValue");
          await AsyncStorage.setItem("@messages", jsonValue);
          // save results
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await AsyncStorage.setItem("@messages", JSON.stringify([]));
    }
  } catch (error) {
    // Error saving data
  }
};
