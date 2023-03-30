const ENDPOINT_URL1 =
  "https://us-central1-prefab-fabric-269300.cloudfunctions.net/function-3";

export const requestChatbotResponse = async (messages) => {
  if (!messages) {
    return new Promise((resolve, reject) => reject("no message"));
  }
  console.log(`input:    ${JSON.stringify({ messages })}\n`);
  return fetch(ENDPOINT_URL1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  })
    .then((response) => {
      console.log("my response: ", response);
      response.json();
    })
    .then((json) => {
      console.log("Response:", json);
      return json;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const chatbotResponseTransform = (response) => {
  console.log(`output:   ${JSON.stringify(JSON.parse(response.response))}\n`);
  /* parse data as needed */

  return JSON.parse(response.response);
};
