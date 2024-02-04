import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

export default function Footer() {
  return (
    <Box component="footer">
      <Typography level="title-sm" textAlign="center">
        Tech stack
      </Typography>
      <Typography level="body-xs" textAlign="center">
        NextJS | Vercecl AI SDK | JOY UI
      </Typography>
      <Typography level="body-xs" textAlign="center">
        Developed by Suresh {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}
