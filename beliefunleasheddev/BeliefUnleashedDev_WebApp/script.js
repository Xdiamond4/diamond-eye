
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userText = input.value;
  if (!userText) return;
  appendMessage("You", userText);
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are BeliefUnleashedDev, a software development expert AI." },
        { role: "user", content: userText }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Error: No reply.";
  appendMessage("BeliefUnleashedDev", reply);
}

function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("mb-2");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}
