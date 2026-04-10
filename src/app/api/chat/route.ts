import { streamText, convertToModelMessages, stepCountIs } from "ai";
import { openai } from "@ai-sdk/openai";
import type { UIMessage } from "ai";
import { WINGMAN_SYSTEM_PROMPT } from "@/lib/wingman-prompt";
import { checkRateLimit } from "@/lib/redis";

// Limits to prevent abuse of the AI chat endpoint
const MAX_MESSAGES = 50; // Max conversation length
const MAX_MESSAGE_TEXT_LENGTH = 2000; // Max characters per message

export async function POST(req: Request) {
  try {
    // Rate limiting — protects OpenAI API credits
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed } = await checkRateLimit("chat", ip);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Too many messages. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "Conversation too long. Please start a new chat." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check individual message lengths
    for (const msg of messages) {
      if (msg.parts) {
        for (const part of msg.parts) {
          if (
            part.type === "text" &&
            typeof part.text === "string" &&
            part.text.length > MAX_MESSAGE_TEXT_LENGTH
          ) {
            return new Response(
              JSON.stringify({ error: "Message too long." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }
        }
      }
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: WINGMAN_SYSTEM_PROMPT,
      messages: modelMessages,
      stopWhen: stepCountIs(1),
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
