"use client";

import { useState } from "react";

import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import ProfileCard from "./components/ProfileCard";
import RepositoryList from "./components/RepositoryList";
import AnalysisReport from "./components/AnalysisReport";

export default function Home() {

  const [username, setUsername] = useState("");

  const [profile, setProfile] = useState(null);

  const [repositories, setRepositories] = useState([]);

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  async function analyseProfile() {

    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }


    setLoading(true);
    setError("");
    setAnalysis(null);


    try {

      // Get GitHub profile data
      const profileResponse = await fetch(
        `https://api.github.com/users/${username}`
      );


      if (!profileResponse.ok) {
        throw new Error("GitHub user not found.");
      }


      const profileData = await profileResponse.json();



      // Get repository data
      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );


      const repoData = await repoResponse.json();



      // Send GitHub evidence to the AI analyser
      const analysisResponse = await fetch("/api/analyse", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          profile: profileData,
          repositories: repoData,
        }),

      });



      const analysisData = await analysisResponse.json();
      console.log("AI RESPONSE:", analysisData);


      setProfile(profileData);

      setRepositories(repoData);

      setAnalysis(analysisData);


    } catch (error) {

      setError(error.message);

      setProfile(null);

      setRepositories([]);

      setAnalysis(null);

    }


    setLoading(false);

  }



  return (

    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">


      <Header />


      <Searchbar

        username={username}

        setUsername={setUsername}

        analyseProfile={analyseProfile}

        loading={loading}

      />



      {
        error && (

          <div className="mx-6 mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">

            {error}

          </div>

        )
      }



      {
        loading && (

          <div className="mx-6 mb-6 bg-white/90 shadow rounded-xl p-6 text-center">


            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto mb-4"></div>


            <h3 className="font-semibold">
              Analysing GitHub portfolio...
            </h3>


            <p className="text-gray-500 mt-2">
              Reviewing projects and generating capability insights.
            </p>


          </div>

        )
      }




      {
        profile && (

          <>

            <ProfileCard profile={profile} />


            <RepositoryList repositories={repositories} />


            <AnalysisReport analysis={analysis} />


          </>

        )
      }


    </main>

  );

}