"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Bird, X, Send, MessageCircle, RotateCcw } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "How can I donate?",
  "I found an injured bird!",
  "Tell me about the documentary",
  "How can I volunteer?",
];

export default function Wingman() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { messages, sendMessage, status, setMessages } = useChat();

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue("");
    sendMessage({ text });
  }

  function handleSuggestion(question: string) {
    sendMessage({ text: question });
  }

  function handleReset() {
    setMessages([]);
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-lg transition-all hover:bg-teal-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
        aria-label={isOpen ? "Close Wingman chat" : "Open Wingman chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Bird className="h-6 w-6 -scale-x-100 animate-bird-idle" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[min(32rem,calc(100vh-8rem))] w-[min(24rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-teal px-4 py-3">
            <div className="flex items-center gap-2">
              <Bird className="h-5 w-5 text-amber-light" />
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">
                  Wingman
                </h3>
                <p className="text-[11px] text-teal-light opacity-80">
                  Wildlife Rescue Assistant
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Reset conversation"
              title="Start new conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center pt-4 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-light">
                  <MessageCircle className="h-6 w-6 text-teal" />
                </div>
                <p className="mb-1 font-heading text-sm font-semibold text-charcoal">
                  Hi! I&apos;m Wingman
                </p>
                <p className="mb-4 text-xs text-slate">
                  Ask me anything about Wildlife Rescue — our birds, how to
                  donate, volunteer, or report an injured bird.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestion(q)}
                      className="rounded-full border border-teal/20 bg-teal-light/50 px-3 py-1.5 text-xs text-teal-dark transition-colors hover:bg-teal-light hover:border-teal/40"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-teal text-white"
                        : "rounded-bl-md bg-gray-100 text-charcoal"
                    }`}
                  >
                    <MessageContent
                      parts={message.parts}
                      role={message.role}
                    />
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate/50 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate/50 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate/50 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-gray-100 px-3 py-2.5"
          >
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Wingman..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 bg-offwhite px-3 py-2 text-sm text-charcoal placeholder:text-slate/60 focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal text-white transition-all hover:bg-teal-dark disabled:opacity-40 disabled:hover:bg-teal"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

/** Render message parts — handles text and streaming gracefully */
function MessageContent({
  parts,
  role,
}: {
  parts: Array<{ type: string; text?: string; [key: string]: unknown }>;
  role: string;
}) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "text" && part.text) {
          return (
            <span key={i} className="whitespace-pre-wrap">
              {formatText(part.text, role)}
            </span>
          );
        }
        return null;
      })}
    </>
  );
}

/** Minimal inline formatting — bold and links */
function formatText(text: string, role: string) {
  if (role === "user") return text;

  // Split on bold markers and links, render inline
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Check for bold **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Check for markdown link [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find which comes first
    const boldIdx = boldMatch?.index ?? Infinity;
    const linkIdx = linkMatch?.index ?? Infinity;

    if (boldIdx === Infinity && linkIdx === Infinity) {
      parts.push(remaining);
      break;
    }

    if (boldIdx < linkIdx && boldMatch) {
      parts.push(remaining.slice(0, boldIdx));
      parts.push(
        <strong key={key++} className="font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldIdx + boldMatch[0].length);
    } else if (linkMatch) {
      parts.push(remaining.slice(0, linkIdx));
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-80"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkIdx + linkMatch[0].length);
    }
  }

  return parts;
}
