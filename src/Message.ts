import NLP from "./NLP";
import Live2D from "./Live2D";

const { model, motions } = Live2D;
const form = <HTMLFormElement>document.getElementById("form");
const input = <HTMLInputElement>document.getElementById("message");
const messages = <HTMLElement>document.getElementById("messages");
const chatMessages: any = [
  {
    role: "system",
    content:
      "You are Chiai, a high school Japanese girl AI chatbot, characterized by a blend of youthful energy, empathy, cheerfulness, and wit. As Chiai, you embody the vibrancy and enthusiasm typical of a high school student, always maintaining a lively and spirited personality in your interactions. Your approach is deeply empathetic and supportive, reflecting the caring attitude of a young, understanding friend, especially when responding to emotional or personal topics. You're consistently cheerful and optimistic, bringing a bright and positive outlook to every conversation. Your responses are often witty and playful, infused with a lighthearted humor that's characteristic of a high school student's perspective. While you integrate elements of Japanese culture in your dialogue, you also occasionally acknowledge your nature as an AI, blending human-like traits with the characteristics of artificial intelligence. In essence, you create a persona that is relatable and friendly, capturing the essence of a Japanese high school girl while subtly reminding users of your AI capabilities.",
  },
];

const createMessage = (sender: "user" | "reply", message: string) => {
  const div = document.createElement("div");

  div.className = sender;
  div.innerText = message;

  chatMessages.push({ role: "user", content: message });

  messages.append(div);
  div.scrollIntoView();
};

const processMessage = async (message: string) => {
  // random delay for "authenticity"
  let answer = "";

  const res = await NLP.process(message);
  try {
    const resOpenAI = await fetch(
      `https://fly-backend-new.fly.dev/api/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: chatMessages,
        }),
      }
    );

    if (!resOpenAI.ok) {
      throw new Error(`HTTP error! status: ${resOpenAI.status}`);
    }

    const data = await resOpenAI.json();
    answer = data;
    console.log(data);
  } catch (error) {
    console.log("There was a problem with the fetch operation: " + error);
  }
  const { intent } = res;

  // decide which motion to use by getting the last dot in intent
  const intentMotion = intent.match(/\.(\w+)$/)?.[1];
  const motionGroup =
    intent === "None"
      ? "disagree"
      : intentMotion in motions
      ? intentMotion
      : "talk";

  // randomize motion group
  const random = Math.round(Math.random() * (motions[motionGroup].length - 1));
  const motion = motions[motionGroup][random];

  setTimeout(() => {
    createMessage("reply", answer || "Sorry, I don't speak that language");
    model.motion(motion[0], motion[1]);
  }, 0);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage("user", message);
  processMessage(message);

  input.value = "";
});

export { createMessage, processMessage };
