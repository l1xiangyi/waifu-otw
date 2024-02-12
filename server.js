import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/message", async (req, res) => {
  const message = req.body.message;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 60,
    }),
  });

  const data = await response.json();
  console.log(data);
  res.json(data);
});

app.listen(3000, () => console.log("Server listening on port 3000"));
