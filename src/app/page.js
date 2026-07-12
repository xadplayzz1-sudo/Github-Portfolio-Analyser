"use client";

import SearchBar from "./components/Searchbar";

// React hook = store data
import { useState } from "react";

// Header component
import Header from "./components/Header";

export default function Home() {

  // Username input
  const [username, setUsername] = useState("");

  // GitHub profile data
  const [profile, setProfile] = useState(null);

  // Analyse GitHub profile
  async function analyseProfile() {

    // Empty input check
    if (!username.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    try {

      // Fetch profile
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      // User not found
      if (!response.ok) {
        alert("GitHub user not found.");
        setProfile(null);
        return;
      }

      // JSON → JavaScript object
      const data = await response.json();

      // Save profile
      setProfile(data);

      // Debug
      console.log(data);

    } catch (error) {

      // API/network error
      console.error(error);
      alert("Something went wrong while contacting GitHub.");

    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center py-20 px-6">

      {/* Page header */}
      <Header />

      <SearchBar
        username={username}
        setUsername={setUsername}
        analyseProfile={analyseProfile}
        loading={loading}
      />

      {/* Show after search */}
      {profile && (

        <div className="mt-10 w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">

          {/* Avatar */}
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="mx-auto h-24 w-24 rounded-full"
          />

          {/* Name */}
          <h2 className="mt-4 text-center text-2xl font-bold text-slate-900">
            {profile.name}
          </h2>

          {/* Username */}
          <p className="text-center text-slate-600">
            @{profile.login}
          </p>

          {/* Bio */}
          <p className="mt-4 text-center text-slate-700">
            {profile.bio}
          </p>

          {/* GitHub stats */}
          <div className="mt-6 flex justify-around text-center">

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {profile.public_repos}
              </p>
              <p className="text-slate-500">Repositories</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {profile.followers}
              </p>
              <p className="text-slate-500">Followers</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {profile.following}
              </p>
              <p className="text-slate-500">Following</p>
            </div>

          </div>

        </div>

      )}

    </main>
  );
}
// React calls home function to display the page + return means return the user interface
// analyse button for future is <button>
// <input /> for text input for user - need to make it work to remember what user types (in this case the Github username)
// console.log(username) is a placeholder for future functionality to analyse the username entered by the user
// add logic to create the capability skillset for the user to enter a Github username and then click the analyse button to fetch the profile data from the Github API and display it on the page. The useState hook is used to store the username input and the profile data fetched from the API. The analyseProfile function is called when the user clicks the analyse button, which checks if the input is empty, fetches the profile data from the Github API, and updates the profile state with the fetched data. If the user is not found or there is an error, appropriate alerts are shown. The profile data is then displayed on the page if it exists.