export default function RepositoryList({ repositories }) {
    if (!repositories.length) return null;

    return (
        <section className="w-full max-w-[840px] rounded-[24px] border border-[#fdb988] bg-[#fff7ec] p-5 shadow-[0_10px_28px_rgba(204,88,3,0.15)]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-[#2d1706]">Projects Analysed</h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#7c3502]">
                    Showing {Math.min(repositories.length, 4)} of {repositories.length}
                </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {repositories.slice(0, 4).map((repo) => (
                    <div
                        key={repo.id}
                        className="flex h-full min-h-[220px] flex-col rounded-[20px] border border-[#f3c7a5] bg-[#fffdf9] p-4 shadow-[0_5px_14px_rgba(204,88,3,0.10)]"
                    >
                        <h3 className="text-lg font-semibold text-[#2d1706]">{repo.name}</h3>

                        <p className="mt-2 text-sm leading-6 text-[#7c3502]">
                            {repo.description || "No description provided."}
                        </p>

                        <div className="mt-auto pt-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#7c3502]">
                                {repo.language || "Unknown"}
                            </span>
                            <span className="rounded-full bg-[#ffe2a9] px-3 py-1 text-xs font-semibold text-[#7c3502]">
                                {repo.stargazers_count}★
                            </span>
                            <span className="rounded-full bg-[#ffe2a9] px-3 py-1 text-xs font-semibold text-[#7c3502]">
                                {repo.forks_count} fork{repo.forks_count === 1 ? "" : "s"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}