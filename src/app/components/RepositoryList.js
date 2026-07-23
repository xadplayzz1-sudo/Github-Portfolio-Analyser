export default function RepositoryList({ repositories, theme }) {
    if (!repositories.length) return null; // If there are no repos, do not show anything otherwise it would show an empty list

    const isDark = theme === "dark"; // If current theme is dark:

    return (
        <section className={`w-full max-w-[840px] rounded-[24px] border p-5 ${isDark ? "border-[#30363d] bg-[#161b22] shadow-[0_10px_28px_rgba(0,0,0,0.35)]" : "border-[#d0d7de] bg-white shadow-[0_10px_28px_rgba(31,35,40,0.08)]"}`}>
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className={`text-2xl font-bold ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>Projects Analysed</h2>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? "bg-[#0d1117] text-[#8b949e]" : "bg-[#f6f8fa] text-[#57606a]"}`}>
                    Showing {Math.min(repositories.length, 4)} of {repositories.length}
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {repositories.slice(0, 4).map((repo) => (
                    <div
                        key={repo.id}
                        className={`flex h-full min-h-[220px] flex-col rounded-[20px] border p-4 ${isDark ? "border-[#30363d] bg-[#0d1117] shadow-[0_5px_14px_rgba(0,0,0,0.25)]" : "border-[#d0d7de] bg-[#f6f8fa] shadow-[0_5px_14px_rgba(31,35,40,0.08)]"}`}
                    >
                        <h3 className={`text-lg font-semibold ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>{repo.name}</h3>

                        <p className={`mt-2 text-sm leading-6 ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>
                            {repo.description || "No description provided."}
                        </p>

                        <div className="mt-auto pt-3 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? "bg-[#161b22] text-[#f0f6fc]" : "bg-white text-[#57606a]"}`}>
                                {repo.language || "Unknown"}
                            </span>
                            <span className="rounded-full bg-[#ddf4ff] px-3 py-1 text-xs font-semibold text-[#0969da]">
                                {repo.stargazers_count}★
                            </span>
                            <span className="rounded-full bg-[#ddf4ff] px-3 py-1 text-xs font-semibold text-[#0969da]">
                                {repo.forks_count} fork{repo.forks_count === 1 ? "" : "s"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}