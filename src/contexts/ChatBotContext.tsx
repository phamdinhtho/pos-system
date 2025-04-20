"use client";

import React, { createContext, useState } from "react";
import env from "@/utils/env";
import { Message } from "@/types/chatbot";

interface ChatBotContextType {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  toggleChatBot: () => void;
  sendMessage: (content: string) => Promise<void>;
}

export const ChatBotContext = createContext<ChatBotContextType | undefined>(
  undefined
);

export const ChatBotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = env.NEXT_PUBLIC_OPENAI_API_URL;
  const API_KEY = env.NEXT_PUBLIC_OPENAI_API_KEY;

  const toggleChatBot = () => {
    setIsOpen((prev) => !prev);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: updatedMessages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: true,
        }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      let aiMessageContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const lines = text.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const deltaContent = parsed.choices[0]?.delta?.content;
              if (deltaContent) {
                aiMessageContent += deltaContent;
                setMessages((prev) => {
                  const lastMessage = prev[prev.length - 1];
                  if (lastMessage?.role === "assistant") {
                    return [
                      ...prev.slice(0, -1),
                      { role: "assistant", content: aiMessageContent },
                    ];
                  } else {
                    return [
                      ...prev,
                      { role: "assistant", content: aiMessageContent },
                    ];
                  }
                });
              }
            } catch (err) {
              console.error("Error parsing stream chunk:", err);
            }
          }
        }
      }

      if (aiMessageContent) {
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              { role: "assistant", content: aiMessageContent },
            ];
          } else {
            return [...prev, { role: "assistant", content: aiMessageContent }];
          }
        });
      }
    } catch (error) {
      console.error("OpenAI API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, có lỗi khi kết nối với AI. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatBotContext.Provider
      value={{ isOpen, messages, isLoading, toggleChatBot, sendMessage }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};
