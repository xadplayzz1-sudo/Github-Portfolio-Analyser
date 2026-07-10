import { useState } from "react";
import Header from "../components/Header";

export default function Home() {

  const [username, setUsername] = useState("");

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center py-20 px-6">

      <Header />

      <div className="mt-10 flex gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => console.log(username)}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
        >
         Analyse
        </button>
      </div>
    </main>
  );
}
// React calls home function to display the page + return means return the user interface
// analyse button for future is <button>
// <input /> for text input for user - need to make it work to remember what user types (in this case the Github username)
