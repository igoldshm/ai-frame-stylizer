import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, style } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an assistant that helps users craft image generation prompts in a cinematic visual style. Style: ${style}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const styledPrompt = response.choices[0].message.content;
    res.status(200).json({ prompt: styledPrompt });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate prompt." });
  }
}
