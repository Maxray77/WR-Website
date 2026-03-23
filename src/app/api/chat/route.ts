import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import type { UIMessage } from "ai";
import { WINGMAN_SYSTEM_PROMPT } from "@/lib/wingman-prompt";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: WINGMAN_SYSTEM_PROMPT,
    messages: modelMessages,
    stopWhen: stepCountIs(1),
  });

  return result.toUIMessageStreamResponse();
}
