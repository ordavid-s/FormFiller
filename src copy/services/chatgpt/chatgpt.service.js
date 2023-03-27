const ENDPOINT_URL =
  "https://us-central1-prefab-fabric-269300.cloudfunctions.net/chatgpt_req";

export const requestChatgptResponse = async (message) => {
  if (!message) {
    return new Promise((resolve, reject) => reject("no message"));
  }
  console.log(`input: ${message}`);
  const data = {
    message: message,
  };
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(ENDPOINT_URL, config);
};

export const chatgptResponseTransform = (response) => {
  console.log(`output: ${JSON.stringify(response)}`);
  let data = response.json();

  /* parse data as needed */

  return JSON.parse(data.response);
};
