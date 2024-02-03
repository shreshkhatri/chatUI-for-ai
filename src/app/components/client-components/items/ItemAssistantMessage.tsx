"use client";
import { useState } from "react";
import { PropAssistantMessage } from "@/app/lib/types";
import { Box, Typography, Input, Avatar } from "@mui/joy";
import { MdOutlineSupportAgent } from "react-icons/md";
import moment from "moment";

export default function ItemAssistantMessage({
  message,
  date,
}: PropAssistantMessage) {
  const [showDate, setShowDate] = useState(false);

  return (
    <Box
      sx={{ width: "100%", display: "flex", gap: 2 }}
      component={"div"}
      onMouseOver={() => setShowDate(true)}
      onMouseOut={() => setShowDate(false)}
    >
      <Avatar size="lg" variant="outlined">
        <MdOutlineSupportAgent />
      </Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginRight: "4rem",
        }}
      >
        <Typography level="body-sm" color="success" sx={{whiteSpace:'break-spaces'}}>
         {message}
        </Typography>
        <Typography
          level="body-xs"
          sx={{ visibility: showDate ? "visible" : "hidden" }}
        >
          {moment(date).startOf("seconds").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}
