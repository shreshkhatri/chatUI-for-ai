import * as React from "react";
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

export default function DrawerScrollable() {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Box >
        <IconButton variant="plain" onClick={() => setOpen(true)}>
          <CiMenuBurger />
        </IconButton>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)} hideBackdrop={true}>
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
          >
            New chat
          </Button>
          <DialogContent>
            <List>
              {[...new Array(10)].map((_, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={() => setOpen(false)}>
                    chat {index}
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
    </React.Fragment>
  );
}
