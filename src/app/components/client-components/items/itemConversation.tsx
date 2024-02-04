"use client";
import { useChat } from "ai/react";
import { Box, Typography } from "@mui/joy";
import { Conversation } from "@/app/lib/types";

export default function ItemConversation({
  conversationID,
  title,
}: Conversation) {
  const { messages } = useChat({ id: conversationID });
  return (
    <Box sx={{ display: "flex" }}>
      <Typography level="body-sm" variant="plain">
        {messages.length > 0
          ? messages[0].content.length > 30
            ? messages[0].content.substring(0, 30) + " ..."
            : messages[0].content
          : null}
      </Typography>
    </Box>
  );
}
