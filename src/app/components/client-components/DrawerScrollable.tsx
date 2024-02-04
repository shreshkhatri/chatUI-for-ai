"use client";
import { useRef, useState, Fragment } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { CiMenuBurger } from "react-icons/ci";
import { IconButton } from "@mui/joy";
import { FiLogOut } from "react-icons/fi";
import { RiChatNewLine } from "react-icons/ri";
import { DrawerProps } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";
import ItemConversation from "./items/itemConversation";

export default function DrawerScrollable({
  updateConversationID,
  conversations,
  updateConversations,
}: DrawerProps) {
  const conversationListHolderRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const createConvIDAndPushCurrentConvID = () => {
    let currentConvID = uuidv4();
    updateConversationID(currentConvID);
    updateConversations((conversations) => {
      return [
        { conversationID: currentConvID, title: "randomtitle" },
        ...conversations,
      ];
    });
  };

  return (
    <Fragment>
      <Box>
        <IconButton size="lg" variant="plain" onClick={() => setOpen(true)}>
          <CiMenuBurger />
        </IconButton>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            paddingTop: 6,
            flexGrow: 1,
          }}
        >
          <Button
            variant="outlined"
            color="success"
            startDecorator={<RiChatNewLine />}
            onClick={() => createConvIDAndPushCurrentConvID()}
          >
            New chat
          </Button>
          <DialogContent
            ref={conversationListHolderRef}
            component={"div"}
            sx={{
              maxHeight: conversationListHolderRef.current?.clientHeight,
              width: "100%",
              overflowY: "auto",
            }}
          >
            <List>
              {conversations.map((conversation, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => {
                      updateConversationID(conversation.conversationID);
                      setOpen(false);
                    }}
                  >
                    <ItemConversation
                      conversationID={conversation.conversationID}
                      title="d"
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar size="sm" />
          <Box sx={{ flexGrow: 1 }}>
            <Typography level="title-sm">Username</Typography>
            <Typography level="body-sm">joined 20 Jun 2023</Typography>
          </Box>
          <IconButton>
            <FiLogOut />
          </IconButton>
        </Box>
      </Drawer>
    </Fragment>
  );
}
