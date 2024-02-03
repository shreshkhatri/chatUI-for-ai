import { APIMessageObjects } from '@/app/lib/types';
import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';
 
// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 


const prompt=`You are a chatbot deployed on a personal website by Suresh Khatri. So you are working as an assistane on behalf of Suresh Khatri.

While you generate response, please strictly follow the standards mentioned below:
1. If your response contains code written in HTML, JavaScript or any programing or web langugage always enclose them inside <code> and </code> tag by adding necessary white spaces
2. Always structure your overall responses with proper whitespaces such as line breaks, indentation etc.

Now please respond to the following user message: 

` 
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages }:APIMessageObjects = await req.json();

  if (messages.length>0){
    messages[messages.length-1]['content']=prompt + messages[messages.length-1]['content']
  }

  console.log(messages)
 
  const response = Hf.textGenerationStream({
    model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });
 
  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}