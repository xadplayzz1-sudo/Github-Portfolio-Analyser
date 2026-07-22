"use client";

import { useState } from "react";

export default function ProfileChat({ profile, repositories }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSend(e) {
        e.preventDefault();

        if (!input.trim()) return;

        const userMessage = input.trim();
        const history = messages.flatMap((msg) => [
            { role: "user", content: msg.user },
            { role: "assistant", content: msg.assistant }
        ]);

        setMessages((prev) => [...prev, { user: userMessage, assistant: "" }]);
        setInput("");
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profile,
                    repositories,
                    message: userMessage,
                    history
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "AI request failed");
            }

            setMessages((prev) => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last) {
                    last.assistant = data.reply;
                }
                return copy;
            });
        } catch (err) {
            setError(err.message || "Something went wrong.");
            setMessages((prev) => {
                const copy = [...prev];
                const last = copy[copy.length - 1];
                if (last) {
                    last.assistant = "Sorry, I couldn’t respond right now.";
                }
                return copy;
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="rounded-[24px] border border-[#e8d2b6] bg-[#fff9f1] p-4 shadow-[0_8px_24px_rgba(125,83,40,0.08)]">
            <div className="mb-3">
                <h2 className="text-[1.3rem] font-bold text-slate-800">Profile Questions</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Ask follow-up questions about specific repositories, tech themes, or how the profile compares.
                </p>
            </div>

            <div className="space-y-3 rounded-2xl bg-[#fbf8f4] p-3 max-h-72 overflow-auto">
                {messages.length === 0 && !loading && (
                    <p className="text-sm text-slate-500">
                        Example: “Which repo best shows this developer’s strengths?”
                    </p>
                )}

                {messages.map((msg, index) => (
                    <div key={index} className="space-y-2">
                        <div className="rounded-xl bg-white p-3 text-sm text-slate-700">
                            <span className="font-semibold text-slate-900">You:</span> {msg.user}
                        </div>
                        <div className="rounded-xl bg-[#f6ede2] p-3 text-sm text-slate-700">
                            <span className="font-semibold text-[#8a5a2b]">Assistant:</span>{" "}
                            {msg.assistant || (loading && index === messages.length - 1 ? "Thinking..." : "")}
                        </div>
                    </div>
                ))}
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <form onSubmit={handleSend} className="mt-4 flex flex-col gap-3 sm:flex-row">
                {/* text box for typed questions */}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about a repository or the overall profile"
                    className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-200"
                />
                {/* send button changes colour a bit when hovered, just a tiny interactive effect */}
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="rounded-xl bg-[#2f2419] px-4 py-3 font-semibold text-white disabled:opacity-60 hover:bg-[#473427]"
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </form>
        </section>
    );
}
