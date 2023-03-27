const ENDPOINT_URL =
  "https://europe-west1-prefab-fabric-269300.cloudfunctions.net/chatgpt_req";

export const requestChatgptResponse = async (message) => {
  if (!message) {
    return new Promise((resolve, reject) => reject("no message"));
  }
  console.log(`input:    ${message}\n`);
  return fetch(ENDPOINT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log("Response:", json);
      return json;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const chatgptResponseTransform = (response) => {
  console.log(`output:   ${JSON.stringify(JSON.parse(response.response))}\n`);
  /* parse data as needed */

  return JSON.parse(response.response);
};
