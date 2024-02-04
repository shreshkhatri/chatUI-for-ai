"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Button, Avatar, Typography } from "@mui/joy";
import DrawerScrollable from "./DrawerScrollable";
import TopMenuBar from "./TopMenuBar";
import ChatUI from "./ChatUI";
import { Conversation } from "@/app/lib/types";
import { v4 as uuidv4 } from 'uuid';
import Footer from "./Footer";


export default function MainChatUI() {
  const [conversationID,createNewConversationID] = useState<string>(uuidv4());
  const [conversations,updateConversations] = useState<Conversation[]>([{conversationID:conversationID,title:'title'}]);
 


  return (
    <Box
      sx={{
        width: "100%",
        height: {xs:'90vh',sm:'90vh',md:'98vh'}, // Use minHeight instead of height
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Hide any overflow outside this container
      }}
    >
      <TopMenuBar />
      <DrawerScrollable conversations={conversations} updateConversationID={createNewConversationID} updateConversations={updateConversations}/>
      {conversationID && <ChatUI conversationID={conversationID}/>}
      <Footer />
    </Box>
  );
}
