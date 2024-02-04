import { Message } from "ai";

export type PropAssistantMessage = {
  message: string;
  date: Date | undefined;
};

export type PropUserMessage = {
  message: string;
  date: Date | undefined;
};

export type message={
    role:'user'|'assistant',
    content:string
  }

  
export interface APIMessageObjects{
    messages:message[]
  }


  export type ChatUIProps = {
    conversationID:string|undefined
  }


export type Conversation ={
  title:string,
  conversationID:string
}


export type DrawerProps = {
  updateConversationID: React.Dispatch<React.SetStateAction<string|undefined>>;
  conversations:Conversation[];
  updateConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}