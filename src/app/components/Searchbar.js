export default function Searchbar({
    username,
    setUsername,
    analyseProfile,
    loading
}) {
    return (
        <section className="mb-6 flex justify-center px-0">
            {/* huge warm card wrapper so the search area looks like a panel, not just a raw form */}
            <div className="pulse-glow w-full max-w-5xl rounded-[24px] border border-[#fdb988] bg-[#fff7ec] p-4 shadow-[0_10px_28px_rgba(204,88,3,0.15)] transition-all duration-300 hover:shadow-[0_14px_32px_rgba(204,88,3,0.18)]">
                <form
                    className="flex flex-col gap-3 lg:flex-row lg:items-center"
                    onSubmit={(e) => {
                        // stop the page reloading and just run the search function
                        e.preventDefault();
                        analyseProfile();
                    }}
                >
                    {/* label for the input so the user knows what they're entering */}
                    <label className="min-w-[140px] text-sm font-semibold text-[#7c3502]">
                        GitHub username or name
                    </label>

                    {/* text field for the username or name search */}
                    <input
                        type="text"
                        placeholder="Enter a name or GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex-1 border border-[#f3c7a5] rounded-2xl px-4 py-3 outline-none focus:border-[#cc5803] focus:ring-2 focus:ring-[#ffd59b] text-[#2d1706] bg-white"
                    />

                    {/* button with a little hover animation and disabled state while loading */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#cc5803] text-white px-5 py-3 rounded-2xl font-semibold transition duration-200 hover:bg-[#e2711d] hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>
        </section>
    );
}