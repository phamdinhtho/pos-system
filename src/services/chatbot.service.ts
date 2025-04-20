import env from "@/utils/env";
import { Message } from "@/types/chatbot";

export async function chatWithOpenAI(messages: Message[]) {
  const response = await fetch(env.NEXT_PUBLIC_OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message.content || "No response from AI";
}
