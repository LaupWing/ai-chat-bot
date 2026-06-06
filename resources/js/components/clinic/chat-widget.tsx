import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';

type ChatMessage = {
    role: 'assistant' | 'user';
    content: string;
};

const SUGGESTIONS = [
    'Wat kost een fillerbehandeling?',
    'Wat doen spierontspanners?',
    'Kan ik medisch afvallen bij jullie?',
];

const WELCOME: ChatMessage = {
    role: 'assistant',
    content:
        'Hallo! Ik ben de digitale assistent van The Golden Glow. Stel gerust een vraag over onze behandelingen, prijzen of het maken van een afspraak.',
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
    const [thinking, setThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, thinking, open]);

    function send(text: string) {
        const trimmed = text.trim();
        if (!trimmed || thinking) {
            return;
        }

        setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
        setInput('');
        setThinking(true);

        // Placeholder reply — wired to the ClinicAssistant agent in the next step.
        window.setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content:
                        'Bedankt voor je vraag! Binnenkort beantwoord ik dit automatisch op basis van onze website. (Demo-modus)',
                },
            ]);
            setThinking(false);
        }, 900);
    }

    return (
        <>
            {/* Launcher */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Open chat"
                className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#cb6843] text-white shadow-lg shadow-[#cb6843]/30 transition-transform hover:scale-105 active:scale-95"
            >
                {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </button>

            {/* Panel */}
            {open && (
                <div className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                    {/* Header */}
                    <div className="flex items-center gap-3 bg-[#cb6843] px-4 py-3 text-white">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-['Playfair_Display',serif] text-base leading-tight">The Golden Glow</p>
                            <p className="text-xs text-white/80">Digitale assistent</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fff7f2] px-3 py-4">
                        {messages.map((message, i) => (
                            <div
                                key={i}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                                        message.role === 'user'
                                            ? 'rounded-br-sm bg-[#cb6843] text-white'
                                            : 'rounded-bl-sm bg-white text-gray-700 ring-1 ring-black/5'
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {thinking && (
                            <div className="flex justify-start">
                                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 ring-1 ring-black/5">
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#cb6843]/60 [animation-delay:-0.3s]" />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#cb6843]/60 [animation-delay:-0.15s]" />
                                    <span className="h-2 w-2 animate-bounce rounded-full bg-[#cb6843]/60" />
                                </div>
                            </div>
                        )}

                        {messages.length === 1 && !thinking && (
                            <div className="space-y-2 pt-1">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => send(s)}
                                        className="block w-full rounded-xl bg-white px-3 py-2 text-left text-sm text-[#cb6843] ring-1 ring-[#cb6843]/20 transition-colors hover:bg-[#cb6843] hover:text-white"
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
