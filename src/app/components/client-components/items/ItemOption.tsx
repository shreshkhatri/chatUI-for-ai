import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export default function ItemOption() {
  return (
    <Card variant="outlined" sx={{zIndex:-1}}>
      <div>
        <Typography level="title-md">Welcome to your Assistant Portal</Typography>
      </div>
      <CardContent orientation="horizontal">
        <Typography level="body-xs">I am an AI powered chatbot. You could ask me anything you would like and I will use my knowledge to the best while answering them.<br></br><br></br> Goodluck with your learning!</Typography>
      </CardContent>
    </Card>
  );
}
