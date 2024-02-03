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
