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



    async function analyseProfile() {

        if (!username) {

            alert("Please enter a GitHub username.");

            return;

        }

        setLoading(true);

        try {

            // Get GitHub profile

            const profileResponse = await fetch(
                `https://api.github.com/users/${username}`
            );

            if (!profileResponse.ok) {

                throw new Error("GitHub user not found.");

            }

            const profileData =
                await profileResponse.json();



            // Get repositories

            const repoResponse = await fetch(
                `https://api.github.com/users/${username}/repos?per_page=100`
            );

            const repoData =
                await repoResponse.json();



            // Send everything to our analyser

            const analysisResponse =
                await fetch("/api/analyse", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        profile: profileData,

                        repositories: repoData

                    })

                });



            const analysisData =
                await analysisResponse.json();



            setProfile(profileData);

            setRepositories(repoData);

            setAnalysis(analysisData);

        }

        catch (error) {

            alert(error.message);

            setProfile(null);

            setRepositories([]);

            setAnalysis(null);

        }

        setLoading(false);

    }



    return (

        <main className="max-w-7xl mx-auto px-6 pb-12">

            <Header />



            <Searchbar

                username={username}

                setUsername={setUsername}

                analyseProfile={analyseProfile}

                loading={loading}

            />



            {

                profile && (

                    <>

                        <ProfileCard

                            profile={profile}

                        />



                        <AnalysisReport

                            profile={profile}

                            analysis={analysis}

                        />



                        <RepositoryList

                            repositories={repositories}

                        />

                    </>

                )

            }

        </main>

    );

}