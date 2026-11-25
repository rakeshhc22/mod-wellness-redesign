"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { brand } from "@/data/siteContent";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Extra keywords (beyond words already in the question) that should
   *  also match this FAQ when the user types freely. */
  keywords?: string[];
}

const faqs: FaqItem[] = [
  {
    id: "products",
    question: "What products do you offer?",
    answer:
      "MOD Wellness offers a range of wellness and personal-care products designed with a focus on quality and everyday wellbeing. You can explore all our products from the Shop section.",
    keywords: ["product", "products", "offer", "range", "catalog", "sell"],
  },
  {
    id: "best-fit",
    question: "Which product is best for me?",
    answer:
      "It depends on what you're looking for. You can explore our products and choose based on your specific needs. If you're unsure, feel free to contact our team for guidance.",
    keywords: ["best", "recommend", "suggestion", "which", "suited", "right for me"],
  },
  {
    id: "order",
    question: "How can I place an order?",
    answer:
      "You can explore our products, open the product details page, and use the available purchase/request option. If you need help, our team will be happy to assist you.",
    keywords: ["order", "buy", "purchase", "checkout", "cart"],
  },
  {
    id: "shipping",
    question: "Do you offer shipping?",
    answer:
      "Shipping availability and charges may depend on your location. Please contact MOD Wellness for the latest shipping information.",
    keywords: ["shipping", "ship", "delivery", "deliver"],
  },
  {
    id: "about",
    question: "Tell me about MOD Wellness",
    answer:
      "MOD Wellness is focused on thoughtful wellness and personal-care products designed to support everyday wellbeing.",
    keywords: ["about", "who are you", "company", "brand", "mod wellness"],
  },
  {
    id: "contact",
    question: "Can I contact you?",
    answer:
      "Absolutely! You can visit the Contact page on our website to get in touch with the MOD Wellness team.",
    keywords: ["contact", "reach", "email", "phone", "support", "help"],
  },
];

const FALLBACK_ANSWER =
  "I'm not sure about that one yet — try one of the quick questions below, or reach out from the Contact page.";

type ChatMessage =
  | { role: "bot"; id: string; text: string }
  | { role: "user"; id: string; text: string };

const initialMessages: ChatMessage[] = [
  {
    role: "bot",
    id: "welcome",
    text: "Hi! \ud83d\udc4b Welcome to MOD Wellness. How can I help you today?",
  },
];

let messageCounter = 0;
function nextId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

/**
 * Case-insensitive, keyword-based match against the FAQ list. Checks
 * the FAQ's own question text as well as its extra `keywords`, so a
 * typed message like "can you ship to me" still finds the shipping
 * FAQ even though the phrasing doesn't match the question verbatim.
 */
function matchFaq(input: string): FaqItem | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  for (const faq of faqs) {
    const haystacks = [faq.question, ...(faq.keywords ?? [])];
    if (haystacks.some((phrase) => normalized.includes(phrase.toLowerCase()))) {
      return faq;
    }
  }

  // Fall back to a looser single-word overlap so short queries like
  // "shipping?" or "orders" still land a match.
  const words = normalized.split(/[^a-z0-9]+/).filter((w) => w.length > 2);
  for (const faq of faqs) {
    const haystack = [faq.question, ...(faq.keywords ?? [])]
      .join(" ")
      .toLowerCase();
    if (words.some((word) => haystack.includes(word))) {
      return faq;
    }
  }

  return null;
}

/**
 * Frontend-only floating chatbot. Supports both tapping a predefined
 * question and typing freely — typed messages are matched against the
 * same FAQ list by keyword, case-insensitively, with a friendly
 * fallback when nothing matches. No backend/API involved.
 */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll to the latest message whenever the thread changes or
  // the typing indicator appears.
  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    thread.scrollTo({ top: thread.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus the text input as soon as the panel opens, and clean up any
  // pending "typing…" timer on unmount.
  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  function closeChat() {
    setOpen(false);
    // Return focus to the toggle button so keyboard users don't lose
    // their place after the panel disappears.
    toggleButtonRef.current?.focus();
  }

  function respond(answerText: string) {
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    // Fixed delay rather than a randomized one: keeps the "typing…"
    // beat feeling alive without calling an impure function (Math.random)
    // from inside a render-reachable code path.
    typingTimeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", id: nextId("bot"), text: answerText },
      ]);
      setIsTyping(false);
    }, 700);
  }

  function askQuestion(faq: FaqItem) {
    setMessages((prev) => [
      ...prev,
      { role: "user", id: nextId("user"), text: faq.question },
    ]);
    respond(faq.answer);
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", id: nextId("user"), text }]);
    setDraft("");

    const match = matchFaq(text);
    respond(match ? match.answer : FALLBACK_ANSWER);
  }

  function handlePanelKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeChat();
    }
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-poppins">
      <div
        ref={panelRef}
        onKeyDown={handlePanelKeyDown}
        role="dialog"
        aria-modal="false"
        aria-label={`${brand.name} chat`}
        aria-hidden={!open}
        className={`mb-3 w-[calc(100vw-2.5rem)] max-w-[360px] h-[min(560px,72svh)] flex flex-col bg-linen border border-stone rounded-sm shadow-[0_20px_50px_-16px_rgba(30,37,43,0.35)] overflow-hidden origin-bottom-right transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 bg-moss text-linen shrink-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-display text-lg leading-none truncate">
              {brand.name}
            </span>
            <span className="text-xs text-linen/90 leading-none">
              How can we help you?
            </span>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={closeChat}
            className="shrink-0 text-linen/90 hover:text-linen focus-visible:text-linen transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-linen focus-visible:ring-offset-2 focus-visible:ring-offset-moss"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={threadRef}
          className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] px-3.5 py-2.5 rounded-sm text-sm leading-relaxed ${
                message.role === "bot"
                  ? "self-start bg-linen-raised text-ink border border-stone"
                  : "self-end bg-moss text-linen"
              }`}
            >
              {message.text}
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex items-center gap-1.5 px-3.5 py-3 rounded-sm bg-linen-raised border border-stone">
              <span className="sr-only">{brand.name} is typing…</span>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-ink/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text input */}
        <form
          onSubmit={handleSend}
          className="shrink-0 border-t border-stone px-4 py-3 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            enterKeyHint="send"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your question…"
            aria-label="Type your question"
            // text-base (16px) prevents iOS Safari's zoom-on-focus.
            className="flex-1 min-w-0 bg-linen-raised border border-stone rounded-full px-4 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-moss focus:border-moss transition-colors"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-moss text-linen hover:bg-moss-deep focus-visible:bg-moss-deep transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </form>

        {/* Predefined questions */}
        <div className="shrink-0 border-t border-stone px-4 py-3.5 flex flex-col gap-2 max-h-[34%] overflow-y-auto">
          <span className="font-label text-[10px] uppercase tracking-[0.12em] text-ink/50">
            Quick questions
          </span>
          <div className="flex flex-wrap gap-2">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => askQuestion(faq)}
                className="px-3 py-1.5 rounded-full border border-stone text-ink/70 hover:border-moss hover:text-moss focus-visible:border-moss focus-visible:text-moss transition-colors text-xs leading-snug text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss/50"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        ref={toggleButtonRef}
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) closeChat();
        }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-moss text-linen shadow-[0_12px_30px_-10px_rgba(30,37,43,0.5)] hover:bg-moss-deep transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-linen"
      >
        {open ? (
          <X size={22} strokeWidth={2} />
        ) : (
          <MessageCircle size={22} strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
