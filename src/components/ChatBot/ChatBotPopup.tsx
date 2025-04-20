'use client';
import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Box,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Send, Close } from "@mui/icons-material";
import { useChatBot } from "../../hooks/useChatBot";

const ChatBotPopup = () => {
  const { isOpen, messages, isLoading, toggleChatBot, sendMessage } =
    useChatBot();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <Paper
      elevation={10}
      sx={{
        position: "fixed",
        bottom: "80px",
        right: "24px",
        width: "350px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        zIndex: 9998,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Chat cùng AI</Typography>
        <IconButton onClick={toggleChatBot} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </Box>

      {/* Chat content */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                px: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: "80%",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: msg.role === "user" ? "primary.light" : "grey.200",
                  color:
                    msg.role === "user"
                      ? "primary.contrastText"
                      : "text.primary",
                  wordBreak: "break-word",
                }}
              >
                <ListItemText
                  primary={msg.content}
                  primaryTypographyProps={{
                    color:
                      msg.role === "user"
                        ? "primary.contrastText"
                        : "text.primary",
                  }}
                />
              </Box>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: "flex-start" }}>
              <CircularProgress size={24} />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Input area */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={3}
            size="small"
            sx={{ mr: 1 }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatBotPopup;
