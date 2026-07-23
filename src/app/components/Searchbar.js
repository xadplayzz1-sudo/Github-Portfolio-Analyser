export default function Searchbar({
    username,
    setUsername,
    analyseProfile,
    loading,
    theme
}) {
    const isDark = theme === "dark";

    return (
        <section className="mb-6 flex justify-center px-0">
            {/* huge warm card wrapper so the search area looks like a panel, not just a raw form */}
            <div className={`pulse-glow w-full max-w-5xl rounded-[24px] border p-4 transition-all duration-300 ${isDark ? "border-[#30363d] bg-[#161b22] shadow-[0_10px_28px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]" : "border-[#d0d7de] bg-white shadow-[0_10px_28px_rgba(31,35,40,0.08)] hover:shadow-[0_14px_32px_rgba(31,35,40,0.12)]"}`}>
                <form
                    className="flex flex-col gap-3 lg:flex-row lg:items-center"
                    onSubmit={(e) => {
                        // stop the page reloading and just run the search function
                        e.preventDefault();
                        analyseProfile();
                    }}
                >
                    {/* label for the input so the user knows what they're entering */}
                    <label className={`min-w-[140px] text-sm font-semibold ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>
                        GitHub username or name
                    </label>

                    {/* text field for the username or name search */}
                    <input
                        type="text"
                        placeholder="Enter a name or GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`flex-1 border rounded-2xl px-4 py-3 outline-none focus:border-[#0969da] focus:ring-2 focus:ring-[#b6e3ff] ${isDark ? "border-[#30363d] bg-[#0d1117] text-[#f0f6fc] placeholder:text-[#8b949e]" : "border-[#d0d7de] bg-white text-[#24292f]"}`}
                    />

                    {/* button with a little hover animation and disabled state while loading */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#0969da] text-white px-5 py-3 rounded-2xl font-semibold transition duration-200 hover:bg-[#0550ae] hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>
        </section>
    );
}