"use client";

import { useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/Searchbar";
import ProfileCard from "./components/ProfileCard";

export default function Home() {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyseProfile() {

    if (!username.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        alert("GitHub user not found.");
        setProfile(null);
        setLoading(false);
        return;
      }

      const data = await response.json();

      setProfile(data);

    } catch (error) {

      console.error(error);
      alert("Something went wrong while contacting GitHub.");

    }

    setLoading(false);

  }

  return (

    <main className="min-h-screen bg-slate-100 flex flex-col items-center py-20 px-6">

      <Header />

      <SearchBar
        username={username}
        setUsername={setUsername}
        analyseProfile={analyseProfile}
        loading={loading}
      />

      {profile && (
        <ProfileCard
          profile={profile}
        />
      )}

    </main>

  );

}