export default function ProfileCard({ profile, theme }) {
    if (!profile) return null;

    const isDark = theme === "dark";
    console.log("Theme:", theme);
    console.log("isDark:", isDark);
    return (
        <div className={`float-in rounded-[28px] border p-5 transition duration-300 hover:-translate-y-0.5 ${isDark ? "border-[#30363d] bg-[linear-gradient(180deg,#161b22_0%,#0d1117_100%)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_34px_rgba(0,0,0,0.45)]" : "border-[#d0d7de] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fa_100%)] shadow-[0_12px_30px_rgba(31,35,40,0.08)] hover:shadow-[0_16px_34px_rgba(31,35,40,0.12)]"}`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <img
                    src={profile.avatar_url}
                    alt={`${profile.login} avatar`}
                    className={`h-[130px] w-[130px] rounded-full border-4 object-cover ${
                        isDark
                            ? "border-[#30363d] shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                            : "border-[#d0d7de] shadow-[0_8px_20px_rgba(31,35,40,0.12)]"
                    }`}
                />

                <div>
                    <h2 className={`text-3xl font-bold ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>
                        {profile.name || profile.login}
                    </h2>

                    <p className={`text-lg ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>@{profile.login}</p>

                    <p className={`mt-3 text-lg ${isDark ? "text-[#c9d1d9]" : "text-[#57606a]"}`}>
                        {profile.bio || "No biography provided."}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <span
                            className={`rounded-full border px-3 py-1 text-sm font-medium ${
                                isDark
                                    ? "border-[#30363d] bg-[#0d1117] text-[#f0f6fc]"
                                    : "border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]"
                            }`}
                        >
                            {profile.public_repos} repos
                        </span>

                        <span
                            className={`rounded-full border px-3 py-1 text-sm font-medium ${
                                isDark
                                    ? "border-[#30363d] bg-[#0d1117] text-[#f0f6fc]"
                                    : "border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]"
                            }`}
                        >
                            {profile.followers} followers
                        </span>

                        <span
                            className={`rounded-full border px-3 py-1 text-sm font-medium ${
                                isDark
                                    ? "border-[#30363d] bg-[#0d1117] text-[#f0f6fc]"
                                    : "border-[#d0d7de] bg-[#f6f8fa] text-[#57606a]"
                            }`}
                        >
                            {profile.following} following
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
