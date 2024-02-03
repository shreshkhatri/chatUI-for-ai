"use client";
import { useState } from "react";
import { Box, Typography, Input, Avatar } from "@mui/joy";
import { FaRegCircleUser } from "react-icons/fa6";
import { PropUserMessage } from "@/app/lib/types";
import moment from "moment";

export default function ItemUserMessage({ message, date }: PropUserMessage) {
  const [showDate, setShowDate] = useState(false);
  return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
        component={"div"}
        onMouseOver={() => setShowDate(true)}
        onMouseOut={() => setShowDate(false)}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            marginLeft: "4rem",
          }}
        >
          <Typography
            level="body-sm"
            textAlign={"right"}
            variant="outlined"
            sx={{ borderRadius: 10, p: 1 }}
          >
            {message}
          </Typography>
          <Typography
            sx={{ visibility: showDate ? "visible" : "hidden" }}
            level="body-xs"
            textAlign={"right"}
          >
            {" "}
            {moment(date).startOf("seconds").fromNow()}
          </Typography>
        </Box>

        <Avatar size="lg" variant="outlined">
          <FaRegCircleUser />
        </Avatar>
      </Box>
  );
}
