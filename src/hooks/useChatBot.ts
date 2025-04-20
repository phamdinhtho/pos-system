import { useContext } from "react";
import { ChatBotContext } from "../contexts/ChatBotContext";

export const useChatBot = () => {
  const context = useContext(ChatBotContext);
  if (!context) {
    throw new Error("useChatBot must be used within a ChatBotProvider");
  }
  return context;
};
