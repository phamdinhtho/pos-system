"use client";
import React from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useChatBot } from "../../hooks/useChatBot";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(33, 150, 243, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.4);
  }
`;

const ChatBotIcon: React.FC = () => {
  const { toggleChatBot, isLoading } = useChatBot();

  return (
    <Tooltip
      title={isLoading ? "Đang tải AI..." : "Chat với AI"}
      arrow
      placement="left"
      sx={{
        "& .MuiTooltip-tooltip": {
          fontSize: "14px",
          backgroundColor: "#424242",
          padding: "8px 12px",
        },
      }}
    >
      <IconButton
        onClick={toggleChatBot}
        disabled={isLoading}
        sx={{
          position: "fixed",
          bottom: { xs: "16px", sm: "24px" },
          right: { xs: "16px", sm: "24px" },
          width: { xs: "48px", sm: "60px" },
          height: { xs: "48px", sm: "60px" },
          background: "linear-gradient(135deg, #1976d2 0%, #21cbf3 100%)",
          color: "white",
          borderRadius: "50%",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          zIndex: 10000,
          "&:hover": {
            background: "linear-gradient(135deg, #1565c0 0%, #19b3d3 100%)",
            transform: "scale(1.1)",
            animation: `${glow} 1.5s infinite`,
          },
          "&:active": {
            transform: "scale(0.95)",
          },
          "&.loading::after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(33, 150, 243, 0.5), transparent)",
            animation: `${pulse} 1.8s infinite ease-out`,
            zIndex: -1,
          },
          "& .MuiSvgIcon-root": {
            fontSize: { xs: "20px", sm: "24px" },
          },
        }}
        className={isLoading ? "loading" : ""}
      >
        {isLoading ? (
          <CircularProgress
            size={28}
            sx={{
              color: "white",
              animation: `${pulse} 1.5s infinite`,
            }}
          />
        ) : (
          <ChatBubbleIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ChatBotIcon;
