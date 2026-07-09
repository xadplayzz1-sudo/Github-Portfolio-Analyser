// React calls home function to display the page + return means return the user interface
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center py-20 px-6">
      <h1 className="text-5xl font-bold text-slate-900">
        GitHub Portfolio Analyser
      </h1>

      <p className="mt-4 text-lg text-slate-600 text-center max-w-2xl">
        Analyses Github profiles to create capability insights based on evidence from Github API
      </p>

      <div className="mt-10 flex gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition">
          Analyse 
        </button> 
      </div>
    </main>
  );
}
// analyse button for future is <button>
// <input /> for text input for user - need to make it work to remember what user types (in this case the Github username)