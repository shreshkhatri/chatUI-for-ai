"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Button, Avatar } from "@mui/joy";
import DrawerScrollable from "./DrawerScrollable";
import TopMenuBar from "./TopMenuBar";
import ChatUI from "./ChatUI";
import { useChat,Message} from "ai/react";
import { Conversation } from "@/app/lib/types";
import { v4 as uuidv4 } from 'uuid';


export default function MainChatUI() {

  const [conversations,updateConversations] = useState<Conversation[]>([]);
  const [conversationID,createNewConversationID] = useState<string|undefined>(uuidv4());

 

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
    </Box>
  );
}
