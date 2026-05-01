"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Bird, X, Send, MessageCircle, RotateCcw } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "How can I donate?",
  "I found an injured bird!",
  "Tell me about the documentary",
];

export default function Wingman() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Show callout bubble after 1s — stays until dismissed or chat opened
  // Only shows once per browser session
  useEffect(() => {
    const seen = sessionStorage.getItem("wingman-bubble-seen");
    if (seen) return;
    const timer = setTimeout(() => setShowBubble(true), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Callout bubble */}
      {showBubble && !isOpen && (
        <div className="fixed bottom-[5.5rem] right-6 z-50">
          <div className="relative bg-white rounded-2xl rounded-br-none px-4 py-3 shadow-xl border border-gray-200 w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal shrink-0 shadow-sm">
                <span className="text-lg leading-none" role="img" aria-label="raptor">🦅</span>
              </div>
              <p className="text-sm font-semibold text-charcoal leading-snug">
                Hi! I&apos;m Wingman!
              </p>
            </div>
            <p className="text-xs text-slate">Ask me anything about Wildlife Rescue!</p>
            {/* Speech bubble tail pointing to button */}
            <div className="absolute -bottom-2 right-4 w-4 h-2 overflow-hidden">
              <div className="w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45 origin-top-left translate-y-[-50%]" />
            </div>
            <button
              onClick={() => {
                setShowBubble(false);
                sessionStorage.setItem("wingman-bubble-seen", "1");
              }}
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 flex items-center justify-center text-[11px] font-bold leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBubble(false);
          sessionStorage.setItem("wingman-bubble-seen", "1");
        }}
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

/**
 * Validate that a URL is safe to render as a clickable link.
 * Only allows http:, https:, and mailto: protocols.
 * Blocks javascript:, data:, vbscript:, and other dangerous schemes.
 */
function isSafeUrl(url: string): boolean {
  const trimmed = url.trim();
  // Block empty or obviously dangerous protocols
  if (!trimmed) return false;
  // Reject anything that looks like a dangerous protocol
  if (/^(javascript|data|vbscript|blob|file):/i.test(trimmed)) return false;
  try {
    const parsed = new URL(trimmed, window.location.origin);
    return (
      parsed.protocol === "http:" ||
      parsed.protocol === "https:" ||
      parsed.protocol === "mailto:"
    );
  } catch {
    // Relative URLs (e.g. /donate) are fine — they stay on our domain
    return trimmed.startsWith("/");
  }
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
      // Only render as clickable link if URL passes safety check
      if (isSafeUrl(linkMatch[2])) {
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
      } else {
        // Render unsafe URLs as plain text (no clickable link)
        parts.push(
          <span key={key++} className="underline underline-offset-2 opacity-60">
            {linkMatch[1]}
          </span>
        );
      }
      remaining = remaining.slice(linkIdx + linkMatch[0].length);
    }
  }

  return parts;
}
