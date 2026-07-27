// Displays the AI-generated capability report for the selected GitHub profile
export default function AnalysisReport({ analysis, theme }) {
    // Don't render anything until analysis data has been returned
    if (!analysis) return null;

    // Check whether dark mode is currently enabled
    const isDark = theme === "dark";

    return (
        <section className="float-in w-full max-w-[840px] space-y-5">

            {/* Overall summary of the GitHub profile */}
            <div
                className={`rounded-[24px] border p-5 transition duration-300 hover:-translate-y-0.5 ${
                    isDark
                        ? "bg-[#161b22] border-[#30363d] shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                        : "bg-white border-[#d0d7de] shadow-[0_10px_26px_rgba(31,35,40,0.08)]"
                }`}
            >
                <h2
                    className={`mb-2 text-[1.6rem] font-bold ${
                        isDark ? "text-[#f0f6fc]" : "text-[#24292f]"
                    }`}
                >
                    Profile Overview
                </h2>

                <p
                    className={`leading-relaxed ${
                        isDark ? "text-[#8b949e]" : "text-[#57606a]"
                    }`}
                >
                    {analysis.summary}
                </p>
            </div>

            {/* Breakdown of the capability scores calculated from the profile */}
            <div
                className={`rounded-[24px] border p-5 ${
                    isDark
                        ? "bg-[#0d1117] border-[#30363d]"
                        : "bg-[#f6f8fa] border-[#d0d7de]"
                }`}
            >
                <h2
                    className={`mb-4 text-[1.1rem] font-bold ${
                        isDark ? "text-[#f0f6fc]" : "text-[#24292f]"
                    }`}
                >
                    Capability Areas
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Create one capability card for each capability returned */}
                    {analysis.capabilities?.map((capability) => (
                        <div
                            key={capability.name}
                            className={`rounded-[20px] border p-4 ${
                                isDark
                                    ? "border-[#30363d] bg-[#161b22] shadow-[0_5px_14px_rgba(0,0,0,0.25)]"
                                    : "border-[#d0d7de] bg-white shadow-[0_5px_14px_rgba(31,35,40,0.08)]"
                            }`}
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h3
                                    className={`font-semibold ${
                                        isDark
                                            ? "text-[#f0f6fc]"
                                            : "text-[#24292f]"
                                    }`}
                                >
                                    {capability.name}
                                </h3>

                                <span
                                    className={`font-bold ${
                                        isDark
                                            ? "text-[#c9d1d9]"
                                            : "text-[#57606a]"
                                    }`}
                                >
                                    {capability.score}%
                                </span>
                            </div>

                            {/* Visual progress bar representing the score */}
                            <div
                                className={`mb-3 h-2.5 rounded-full ${
                                    isDark
                                        ? "bg-[#30363d]"
                                        : "bg-[#d8dee4]"
                                }`}
                            >
                                <div
                                    className="h-2.5 rounded-full bg-[#0969da]"
                                    style={{ width: `${capability.score}%` }}
                                />
                            </div>

                            <p
                                className={`text-sm ${
                                    isDark
                                        ? "text-[#8b949e]"
                                        : "text-[#57606a]"
                                }`}
                            >
                                {capability.reason}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* List of the strongest aspects of the developer's portfolio */}
            <div
                className={`rounded-[24px] border p-5 transition duration-300 hover:-translate-y-0.5 ${
                    isDark
                        ? "bg-[#161b22] border-[#30363d] shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                        : "bg-white border-[#d0d7de] shadow-[0_10px_26px_rgba(31,35,40,0.08)]"
                }`}
            >
                <h2
                    className={`mb-4 text-[1.1rem] font-bold ${
                        isDark ? "text-[#f0f6fc]" : "text-[#24292f]"
                    }`}
                >
                    Key Strengths
                </h2>

                <div className="space-y-2">
                    {/* Display each identified strength */}
                    {analysis.strengths?.map((strength, index) => (
                        <p
                            key={index}
                            className={
                                isDark
                                    ? "text-[#c9d1d9]"
                                    : "text-[#57606a]"
                            }
                        >
                            • {strength}
                        </p>
                    ))}
                </div>
            </div>

            {/* Suggestions that could improve the developer's portfolio */}
            <div
                className={`rounded-[24px] border p-5 transition duration-300 hover:-translate-y-0.5 ${
                    isDark
                        ? "bg-[#161b22] border-[#30363d] shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
                        : "bg-white border-[#d0d7de] shadow-[0_10px_26px_rgba(31,35,40,0.08)]"
                }`}
            >
                <h2
                    className={`mb-4 text-[1.1rem] font-bold ${
                        isDark ? "text-[#f0f6fc]" : "text-[#24292f]"
                    }`}
                >
                    Development Recommendations
                </h2>

                <div className="space-y-2">
                    {/* Display each recommendation */}
                    {analysis.recommendations?.map((item, index) => (
                        <p
                            key={index}
                            className={
                                isDark
                                    ? "text-[#c9d1d9]"
                                    : "text-[#57606a]"
                            }
                        >
                            • {item}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}