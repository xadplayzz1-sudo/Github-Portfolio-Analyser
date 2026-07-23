"use client";

import { useState } from "react";

export default function ProfileChat({ profile, repositories, theme }) {
    const [messages, setMessages] = useState([]);
    const isDark = theme === "dark";
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
        <section className={`rounded-[24px] border p-4 ${isDark ? "border-[#30363d] bg-[#161b22] shadow-[0_8px_24px_rgba(0,0,0,0.35)]" : "border-[#e8d2b6] bg-[#fff9f1] shadow-[0_8px_24px_rgba(125,83,40,0.08)]"}`}>
            <div className="mb-3">
                <h2 className={`text-[1.3rem] font-bold ${isDark ? "text-[#f0f6fc]" : "text-slate-800"}`}>Profile Questions</h2>
                <p className={`mt-1 text-sm ${isDark ? "text-[#8b949e]" : "text-slate-600"}`}>
                    Ask follow-up questions about specific repositories, tech themes, or how the profile compares.
                </p>
            </div>

            <div className={`space-y-3 rounded-2xl p-3 max-h-72 overflow-auto ${isDark ? "bg-[#0d1117]" : "bg-[#fbf8f4]"}`}>
                {messages.length === 0 && !loading && (
                    <p className={`text-sm ${isDark ? "text-[#8b949e]" : "text-slate-500"}`}>
                        Example: “Which repo best shows this developer’s strengths?”
                    </p>
                )}

                {messages.map((msg, index) => (
                    <div key={index} className="space-y-2">
                        <div className={`rounded-xl p-3 text-sm ${isDark ? "bg-[#0d1117] text-[#c9d1d9]" : "bg-white text-slate-700"}`}>
                            <span className={`font-semibold ${isDark ? "text-[#f0f6fc]" : "text-slate-900"}`}>You:</span> {msg.user}
                        </div>
                        <div className={`rounded-xl p-3 text-sm ${isDark ? "bg-[#161b22] text-[#c9d1d9]" : "bg-[#f6ede2] text-slate-700"}`}>
                            <span className={`font-semibold ${isDark ? "text-[#58a6ff]" : "text-[#8a5a2b]"}`}>Assistant:</span>{" "}
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
                    className={`flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 ${isDark ? "border-[#30363d] bg-[#0d1117] text-[#f0f6fc] placeholder:text-[#8b949e] focus:border-[#58a6ff] focus:ring-[#58a6ff]/30" : "border-stone-300 bg-white focus:border-stone-500 focus:ring-amber-200"}`}
                />
                {/* send button changes colour a bit when hovered, just a tiny interactive effect */}
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className={`rounded-xl px-4 py-3 font-semibold text-white disabled:opacity-60 ${isDark ? "bg-[#0969da] hover:bg-[#0550ae]" : "bg-[#2f2419] hover:bg-[#473427]"}`}
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </form>
        </section>
    );
}
