export default function Header({ theme, toggleTheme }) {
    const isDark = theme === "dark";

    return (
        <header className="py-8">

            {/* this is the top card that gives the whole page its warm "dashboard" look */}
            <div className={`float-in rounded-[28px] border p-6 transition-all duration-300 hover:-translate-y-0.5 ${isDark ? "border-[#30363d] bg-[#161b22] shadow-[0_12px_34px_rgba(0,0,0,0.35)]" : "border-[#d0d7de] bg-white shadow-[0_12px_34px_rgba(31,35,40,0.08)] hover:shadow-[0_16px_38px_rgba(31,35,40,0.12)]"}`}>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                    {/* small white badge around the logo so it feels like a little icon card */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f6f8fa] shadow-sm ring-1 ring-[#d0d7de]">
                        <img
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GitHub logo"
                            className="h-7 w-7 object-contain"
                        />
                    </div>

                        <div>

                            {/* main title text for the app */}
                            <h1 className={`text-[1.9rem] font-bold ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>
                                GitHub Portfolio Analyser
                            </h1>

                            {/* short description of what the site does */}
                            <p className={`mt-1 text-[0.95rem] ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>
                                Analyse GitHub profiles to generate a capability report based on repositories, technologies and development activity.
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${isDark ? "border-[#30363d] bg-[#0d1117] text-[#f0f6fc] hover:bg-[#21262d]" : "border-[#d0d7de] bg-[#f6f8fa] text-[#24292f] hover:bg-[#eef2f6]"}`}
                    >
                        {isDark ? "Light mode" : "Dark mode"}
                    </button>

                </div>

            </div>

        </header>
    );
}