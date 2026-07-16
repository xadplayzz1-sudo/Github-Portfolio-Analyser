"use client";

export default function Searchbar({
  username,
  setUsername,
  analyseProfile
}) {

  return (
    <div className="flex justify-center gap-3 mt-6">

      <input
        className="border p-3 rounded text-black"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />


      <button
        className="bg-black text-white px-5 rounded"
        onClick={analyseProfile}
      >
        Analyse
      </button>

    </div>
  );
}