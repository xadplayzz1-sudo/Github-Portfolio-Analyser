"use client";

import { useState } from "react";

import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import ProfileCard from "./components/ProfileCard";
import RepositoryList from "./components/RepositoryList";
import AnalysisReport from "./components/AnalysisReport";

export default function Home() {

    // Stores the username entered by the user
    const [username, setUsername] = useState("");

    // GitHub profile information
    const [profile, setProfile] = useState(null);

    // Public repositories
    const [repositories, setRepositories] = useState([]);

    // AI capability analysis
    const [analysis, setAnalysis] = useState(null);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Error message
    const [error, setError] = useState("");

    // Runs when the Analyse button is pressed
    async function analyseProfile() {

        if (!username.trim()) {
            setError("Please enter a GitHub username.");
            return;
        }

        setLoading(true);
        setError("");

        // Reset previous search
        setProfile(null);
        setRepositories([]);
        setAnalysis(null);

        try {

            // Fetch GitHub profile
            const profileResponse = await fetch(
                `https://api.github.com/users/${username}`
            );

            if (!profileResponse.ok) {
                throw new Error("GitHub user not found.");
            }

            const profileData = await profileResponse.json();

            // Fetch repositories
            const repositoryResponse = await fetch(
                `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
            );

            if (!repositoryResponse.ok) {
                throw new Error("Unable to fetch repositories.");
            }

            const repositoryData =
                await repositoryResponse.json();

            // Ask the AI to analyse the profile
            const analysisResponse = await fetch(
                "/api/analyse",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        profile: profileData,
                        repositories: repositoryData
                    })
                }
            );

            if (!analysisResponse.ok) {
                throw new Error(
                    "Unable to generate capability report."
                );
            }

            const analysisData =
                await analysisResponse.json();

            setProfile(profileData);
            setRepositories(repositoryData);
            setAnalysis(analysisData);

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100">

            <div className="max-w-7xl mx-auto px-6 pb-16">

                {/* Top navigation */}

                <Header />

                {/* Username search */}

                <Searchbar
                    username={username}
                    setUsername={setUsername}
                    analyseProfile={analyseProfile}
                    loading={loading}
                />

                {/* Error message */}

                {error && (

                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

                        {error}

                    </div>

                )}

                {/* Welcome screen */}

                {!profile && !loading && !error && (

                    <section className="mt-14">

                        <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-12 text-center">

                            <div className="text-6xl mb-6">
                                🚀
                            </div>

                            <h2 className="text-4xl font-bold text-slate-800">

                                Analyse Any GitHub Portfolio

                            </h2>

                            <p className="mt-5 text-slate-600 max-w-2xl mx-auto leading-8">

                                Enter a GitHub username above to generate
                                an AI-powered capability report based on
                                public repositories, technologies,
                                project quality and development activity.

                            </p>

                        </div>

                    </section>

                )}

                {/* Loading */}

                {loading && (

                    <section className="mt-14">

                        <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-12 text-center">

                            <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />

                            <h2 className="mt-8 text-3xl font-bold text-slate-800">

                                Analysing Portfolio...

                            </h2>

                            <p className="mt-3 text-slate-500">

                                Gathering repository information and
                                generating capability insights.

                            </p>

                        </div>

                    </section>

                )}

                {/* Dashboard */}

                {profile && analysis && (

                    <div className="space-y-8 mt-10">

                        <ProfileCard
                            profile={profile}
                            repositories={repositories}
                        />

                        <AnalysisReport
                            profile={profile}
                            repositories={repositories}
                            analysis={analysis}
                        />

                        <RepositoryList
                            repositories={repositories}
                        />

                    </div>

                )}

            </div>

        </main>

    );

}