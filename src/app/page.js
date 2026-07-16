"use client";

// Import React hook for managing state
import { useState } from "react";

// Import page components
import Header from "./components/Header";
import SearchBar from "./components/Searchbar";
import ProfileCard from "./components/ProfileCard";
import RepositoryList from "./components/RepositoryList";
import AnalysisReport from "./components/AnalysisReport";

export default function Home() {

  // Store the GitHub username entered by the user
  const [username, setUsername] = useState("");

  // Store the fetched GitHub profile information
  const [profile, setProfile] = useState(null);

  // Store all public repositories
  const [repositories, setRepositories] = useState([]);

  // Track whether data is currently being fetched
  const [loading, setLoading] = useState(false);

  // Fetch profile and repository information from GitHub
  async function analyseProfile() {

    // Prevent empty searches
    if (!username.trim()) {
      alert("Please enter a GitHub username.");
      return;
    }

    setLoading(true);

    try {

      // Request user profile data
      const profileResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      // Display an error if the username doesn't exist
      if (!profileResponse.ok) {
        alert("GitHub user not found.");
        setProfile(null);
        setRepositories([]);
        setLoading(false);
        return;
      }

      // Convert profile response into JSON
      const profileData = await profileResponse.json();

      // Request the user's public repositories
      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      // Convert repository response into JSON
      const repoData = await repoResponse.json();

      // Save data into React state
      setProfile(profileData);
      setRepositories(repoData);

    } catch (error) {

      // Display an error if something unexpected happens
      console.error(error);
      alert("Something went wrong.");

    }

    // Stop showing the loading message
    setLoading(false);

  }

  return (

    <main className="min-h-screen bg-slate-100 flex flex-col items-center py-20 px-6">

      {/* Application title and description */}
      <Header />

      {/* Search bar for GitHub usernames */}
      <SearchBar
        username={username}
        setUsername={setUsername}
        analyseProfile={analyseProfile}
        loading={loading}
      />

      {/* Display profile once loaded */}
      {profile && <ProfileCard profile={profile} />}

      {/* Display repository analysis when repositories exist */}
      {repositories.length > 0 && (
        <>
          <RepositoryList repositories={repositories} />

          <AnalysisReport
            profile={profile}
            repositories={repositories}
          />
        </>
      )}

    </main>

  );

}