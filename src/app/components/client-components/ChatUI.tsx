"use client";
import { useEffect, useState, useRef } from "react";
import { Box, Typography, Textarea, Avatar } from "@mui/joy";
import { useChat } from "ai/react";
import { IoMdClose } from "react-icons/io";
import { TbSend } from "react-icons/tb";
import { IconButton } from "@mui/joy";
import { PiChatsCircleLight } from "react-icons/pi";
import ItemAssistantMessage from "./items/ItemAssistantMessage";
import ItemUserMessage from "./items/ItemUserMessage";
import { useColorScheme } from "@mui/joy/styles";
import { FaRegCircleUser } from "react-icons/fa6";
import { CgMaximizeAlt } from "react-icons/cg";
import { TbArrowsMinimize } from "react-icons/tb";

export default function ChatUI() {
  const { mode } = useColorScheme();
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null); // the ref is necessary to achive scrolling to the recent messages inside message container
  const messagesFormRef = useRef<HTMLFormElement>(null); // the ref is assigned to the form component which submits user typed message to the API
  const submitButtonRef = useRef<HTMLButtonElement>(null); // the ref is assigned to submit button so that it can be called to submit the form manually from inside the keydown event of TextArea component

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
    <>
      <Box
        sx={{
          visibility: isMinimized ? "hidden" : "visible",
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "97%",
            sm: isMaximized ? "98%" : "60%",
            md: isMaximized ? "99%" : "30%",
          },
          height: {
            xs: "80vh",
            sm: isMaximized ? "97vh" : "70vh",
            md: isMaximized ? "97vh" : "70vh",
          },
          borderRadius: 15,
          backgroundColor: mode == "light" ? "#F7F7F7" : "#030D1E",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "3rem",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "aqua",
          }}
        >
          <Typography
            level="title-lg"
            color="neutral"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Your Assistant
          </Typography>

          {isMaximized ? (
            <IconButton
              aria-label="close chat window"
              size="lg"
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 0,
              }}
              onClick={() => setIsMaximized(false)}
            >
              <TbArrowsMinimize />
            </IconButton>
          ) : (
            <IconButton
              aria-label="close chat window"
              size="lg"
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 0,
              }}
              onClick={() => setIsMaximized(true)}
            >
              <CgMaximizeAlt />
            </IconButton>
          )}

          <IconButton
            aria-label="close chat window"
            size="lg"
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 0,
            }}
            onClick={() => setIsMinimized(true)}
          >
            <IoMdClose />
          </IconButton>
        </Box>

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
            alignContent: "center",
          }}
          component={"form"}
          onSubmit={handleSubmit}
          ref={messagesFormRef}
        >
          {" "}
          <Avatar size="lg">
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
            minRows={3}
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

      <Box
        component={"div"}
        sx={{
          visibility: isMinimized ? "visible" : "hidden",
          position: "fixed",
          bottom: 10,
          right: 15,
          cursor: "pointer",
          zIndex: 5,
        }}
        onClick={() => setIsMinimized(false)}
      >
        <Typography sx={{ fontSize: "3rem" }}>
          {" "}
          <PiChatsCircleLight />
        </Typography>
      </Box>
    </>
  );
}
