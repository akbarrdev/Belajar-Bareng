import fs from "fs";
import config from "./config";

function getConversationFromData() {
  const data = fs.readFileSync("./conversation.json", "utf8");
  return JSON.parse(data);
}

async function saveConversationToData(conversation) {
  const data = JSON.stringify(conversation, null, 2);
  fs.writeFileSync("./conversation.json", data);
}

async function NewConversationFromData(newMessage) {
  const conversation = getConversationFromData();
  conversation.push(newMessage);
  saveConversationToData(conversation);
  return conversation;
}

async function chatWithAI(userMessage) {
  const url = "https://api.x.ai/v1/chat/completions";

  const askPayload = {
    role: "user",
    content: userMessage,
  };

  console.log("Asking AI:", askPayload);

  const data = {
    messages: await NewConversationFromData(askPayload),
    model: "grok-beta",
    stream: false,
    temperature: 0,
  };

  console.log("Sending request to AI:", data);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.xkey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0].message;
    const conversation = await NewConversationFromData(content);
    return conversation;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // pertanyaanmu
    const message =
      "Oke, sekarang tolong buatkan rangkuman percakapan kita dari awal.";

    const response = await chatWithAI(message);
    console.log("AI Response:", response);
  } catch (error) {
    console.error("Failed to get AI response:", error);
  }
}

main();
