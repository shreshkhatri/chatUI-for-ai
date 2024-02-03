"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Textarea, Avatar } from "@mui/joy";
import { IconButton } from "@mui/joy";
import { useChat } from "ai/react";
import DrawerScrollable from "./DrawerScrollable";
import TopMenuBar from "./TopMenuBar";
import ItemAssistantMessage from "./items/ItemAssistantMessage";
import ItemUserMessage from "./items/ItemUserMessage";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbSend } from "react-icons/tb";

export default function MainChatUI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesFormRef = useRef<HTMLFormElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Function to scroll the container to the bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline insertion

      // reqeustSubmit function is used instead of submit() in order to achieve the exact effect given by submit button click
      messagesFormRef.current?.requestSubmit(submitButtonRef.current);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Use minHeight instead of height
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Hide any overflow outside this container
      }}
    >
      <TopMenuBar />
      <DrawerScrollable />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "wrap",
          flexGrow: 1,
          paddingY: 5,
          paddingX: { md: 20 },
        }}
      >
        {" "}
        <Box
          component={"div"}
          ref={messagesContainerRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: "100%",
            flexGrow: 1,
            backgroundColor: "inherit",
            borderColor: "inherit",
            p: 2,
            height:'25vh',
            overflowY: "auto",
          }}
        >
          <ItemAssistantMessage
            message={"Hey, How can I help you today?"}
            date={new Date()}
          />
          {messages.map((m) => {
            return m.role == "assistant" ? (
              <ItemAssistantMessage
                key={m.id}
                message={m.content}
                date={m.createdAt}
              />
            ) : (
              <ItemUserMessage
                key={m.id}
                message={m.content}
                date={m.createdAt}
              />
            );
          })}
        </Box>
        <Box
          id="messageForm"
          sx={{
            width: "100%",
            height: "4rem",
            display: "flex",
            backgroundColor: "inherit",
            padding: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: 1,
          }}
          component={"form"}
          onSubmit={handleSubmit}
          ref={messagesFormRef}
        >
          {" "}
          <Avatar size="md">
            <FaRegCircleUser />
          </Avatar>
          <Textarea
            name="messageForm"
            sx={{
              flexGrow: 1,
              backgroundColor: "inherit",
              "--Input-focusedThickness": "0.0rem",
            }}
            placeholder="Type in here…"
            size="sm"
            variant="outlined"
            value={input}
            onChange={handleInputChange}
            minRows={2}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            ref={submitButtonRef}
            type="submit"
            aria-label="close chat window"
            size="lg"
          >
            <TbSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
