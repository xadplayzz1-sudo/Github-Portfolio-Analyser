export default function SearchBar({
  username,
  setUsername,
  analyseProfile,
  loading,
}) {
  return (
    <div className="mt-10 flex gap-4 w-full max-w-xl">

      {/* GitHub username */}

      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Analyse button */}

      <button
        onClick={analyseProfile}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {loading ? "Loading..." : "Analyse"}
      </button>

    </div>
  );
}