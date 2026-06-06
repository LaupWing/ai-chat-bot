import { useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ChatMessage = {
    role: 'assistant' | 'user';
    content: string;
    /** Assistant messages animate in with a typewriter effect until revealed. */
    revealed: boolean;
};

const LOGO = '/images/golden-glow-logo.png';
const TYPE_SPEED_MS = 12;

const SUGGESTIONS = [
    'Wat kost een fillerbehandeling?',
    'Wat doen spierontspanners?',
    'Kan ik medisch afvallen bij jullie?',
];

const WELCOME: ChatMessage = {
    role: 'assistant',
    revealed: false,
    content:
        'Hallo! Ik ben de digitale assistent van The Golden Glow. Stel gerust een vraag over onze behandelingen, prijzen of het maken van een afspraak.',
};

function Logo({ className }: { className?: string }) {
    return <img src={LOGO} alt="The Golden Glow" className={className} />;
}

function readCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
}

/** Strip Markdown syntax so the typewriter shows clean text instead of raw symbols. */
function toPlainText(markdown: string): string {
    return markdown
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links -> label
        .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
        .replace(/(\*|_)(.*?)\1/g, '$2') // italic
        .replace(/`([^`]+)`/g, '$1') // inline code
        .replace(/^\s*#{1,6}\s+/gm, '') // headings
        .replace(/^\s*[-*+]\s+/gm, '• ') // bullets
        .trim();
}

function Markdown({ content }: { content: string }) {
    return (
        <div className="[&_a]:font-medium [&_a]:text-[#cb6843] [&_a]:underline [&_a]:underline-offset-2 [&_li]:mb-0.5 [&_ol]:my-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-4">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    a: ({ node, ...props }) => <a target="_blank" rel="noreferrer" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
    const [thinking, setThinking] = useState(false);
    const [typedCount, setTypedCount] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Index of the assistant message currently being typed out (-1 if none).
    const typingIndex = open ? messages.findIndex((m) => m.role === 'assistant' && !m.revealed) : -1;

    // Show the teaser bubble shortly after the launcher has bounced in.
    useEffect(() => {
        const timer = window.setTimeout(() => setShowTeaser(true), 1800);
        return () => window.clearTimeout(timer);
    }, []);

    // Typewriter: reveal the active assistant message one character at a time.
    useEffect(() => {
        if (typingIndex === -1) {
            return;
        }
        const full = toPlainText(messages[typingIndex].content);
        if (typedCount >= full.length) {
            setMessages((prev) => prev.map((m, i) => (i === typingIndex ? { ...m, revealed: true } : m)));
            setTypedCount(0);
            return;
        }
        const timer = window.setTimeout(() => setTypedCount((c) => c + 1), TYPE_SPEED_MS);
        return () => window.clearTimeout(timer);
    }, [typingIndex, typedCount, messages]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, thinking, open, typedCount]);

    function openChat() {
        setOpen(true);
        setShowTeaser(false);
    }

    async function send(text: string) {
        const trimmed = text.trim();
        if (!trimmed || thinking) {
            return;
        }

        // Conversation so far (excluding the generic welcome message at index 0).
        const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));

        setMessages((prev) => [...prev, { role: 'user', content: trimmed, revealed: true }]);
        setInput('');
        setThinking(true);

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': readCookie('XSRF-TOKEN'),
                },
                credentials: 'same-origin',
                body: JSON.stringify({ message: trimmed, history }),
            });

            const data = (await response.json()) as { reply?: string };
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: data.reply ?? 'Excuses, er ging iets mis. Probeer het later opnieuw.',
                    revealed: false,
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Excuses, er ging iets mis. Probeer het later opnieuw.', revealed: false },
            ]);
        } finally {
            setThinking(false);
        }
    }

    const showSuggestions = messages.length === 1 && messages[0].revealed && !thinking;

    return (
        <>
            {/* Launcher + teaser — hidden once the chat is open */}
            {!open && (
                <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
                    {showTeaser && (
                        <div className="animate-chat-teaser-in flex max-w-[15rem] items-center gap-2 rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm text-gray-700 shadow-xl ring-1 ring-black/5">
                            <span>👋 Hallo! Kan ik je ergens mee helpen?</span>
                            <button
                                onClick={() => setShowTeaser(false)}
                                aria-label="Sluit melding"
                                className="-mr-1 shrink-0 rounded-full p-0.5 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}

                    <button
                        onClick={openChat}
                        aria-label="Open chat"
                        className="animate-chat-pop-up flex h-16 w-16 items-center justify-center rounded-full bg-white p-2.5 shadow-lg shadow-[#cb6843]/30 ring-1 ring-[#cb6843]/15 transition-transform hover:scale-105 active:scale-95"
                    >
                        <Logo className="h-full w-full object-contain" />
                    </button>
                </div>
            )}

            {/* Panel */}
            {open && (
                <div className="fixed bottom-5 right-5 z-50 flex h-[34rem] max-h-[calc(100vh-2.5rem)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                    {/* Header */}
                    <div className="flex items-center gap-3 bg-[#cb6843] px-4 py-3 text-white">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5">
                            <Logo className="h-full w-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <p className="font-['Playfair_Display',serif] text-base leading-tight">The Golden Glow</p>
                            <p className="text-xs text-white/80">Digitale assistent</p>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Sluit chat"
                            className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/15"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fff7f2] px-3 py-4">
                        {messages.map((message, i) => {
                            const isTyping = i === typingIndex;
                            const text = isTyping ? toPlainText(message.content).slice(0, typedCount) : message.content;

                            return (
                                <div
                                    key={i}
                                    className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-1 ring-black/5">
                                            <Logo className="h-full w-full object-contain" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                                            message.role === 'user'
                                                ? 'rounded-br-sm bg-[#cb6843] text-white'
                                                : 'rounded-bl-sm bg-white text-gray-700 ring-1 ring-black/5'
                                        }`}
                                    >
                                        {message.role === 'assistant' && !isTyping ? (
                                            <Markdown content={text} />
                                        ) : (
                                            <>
                                                {text}
                                                {isTyping && (
                                                    <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-[#cb6843] align-middle">
                                                        &nbsp;
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {thinking && (
                            <div className="flex items-end gap-2">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-1 ring-black/5">
                                    <Logo className="h-full w-full object-contain" />
                                </div>
                                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 ring-1 ring-black/5">
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#cb6843]/60 [animation-delay:-0.3s]" />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#cb6843]/60 [animation-delay:-0.15s]" />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#cb6843]/60" />
                                </div>
                            </div>
                        )}

                        {showSuggestions && (
                            <div className="space-y-2 pt-1">
                                {SUGGESTIONS.map((s, i) => (
                                    <button
                                        key={s}
                                        onClick={() => send(s)}
                                        style={{ animationDelay: `${i * 180}ms` }}
                                        className="animate-chat-teaser-in block w-full rounded-xl bg-white px-3 py-2 text-left text-sm text-[#cb6843] ring-1 ring-[#cb6843]/20 transition-colors hover:bg-[#cb6843] hover:text-white"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            send(input);
                        }}
                        className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-3"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Typ je vraag…"
                            className="min-w-0 flex-1 rounded-full bg-[#fff7f2] px-4 py-2 text-sm text-gray-800 outline-none ring-1 ring-black/5 focus:ring-[#cb6843]/40"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || thinking}
                            aria-label="Verstuur"
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#cb6843] text-white transition-opacity disabled:opacity-40"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
