"use client";

// this lets the component use React state
import { useState } from "react";

// pulling in the smaller UI chunks that make up the page
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import ProfileCard from "./components/ProfileCard";
import RepositoryList from "./components/RepositoryList";
import AnalysisReport from "./components/AnalysisReport";
import ProfileChat from "./components/ProfileChat";

export default function Home() {

    // this holds the current site theme, either light or dark
    const [theme, setTheme] = useState("light");

    // this holds whatever the user types into the search box
    const [username, setUsername] = useState("");

    // this stores the list of GitHub profile matches returned from the GitHub search API
    const [searchResults, setSearchResults] = useState([]);

    // this stores the selected GitHub user profile data once one result is chosen
    const [profile, setProfile] = useState(null);

    // this stores the repo list for the chosen profile
    const [repositories, setRepositories] = useState([]);

    // this stores the analysis score/report object for the selected profile
    const [analysis, setAnalysis] = useState(null);

    // this flips true while the app is fetching data, so the loading state can show
    const [loading, setLoading] = useState(false);

    // this holds the error text when something goes wrong
    const [error, setError] = useState("");

    // this runs when a user has picked a profile from the search results list
    async function analyseProfile(selectedUsername = username.trim()) {

        // if there’s no username, stop and show a simple error
        if (!selectedUsername) {
            setError("Please enter a GitHub username or name.");
            return;
        }

        // turn on the loading state and clear the old error
        setLoading(true);
        setError("");

        // wipe the previous results before loading a new profile
        setProfile(null);
        setRepositories([]);
        setAnalysis(null);
        setSearchResults([]);

        try {

            // get the main GitHub profile details for the chosen user
            const profileResponse = await fetch(
                `https://api.github.com/users/${selectedUsername}`
            );

            // if GitHub says this user doesn’t exist, throw an error so the UI can react
            if (!profileResponse.ok) {
                throw new Error("GitHub user not found.");
            }

            // turn the raw JSON response into a JavaScript object
            const profileData = await profileResponse.json();

            // fetch the repos for that profile so the analysis has data to work with
            const repositoryResponse = await fetch(
                `https://api.github.com/users/${selectedUsername}/repos?per_page=100&sort=updated`
            );

            // if repo fetch fails, throw an error
            if (!repositoryResponse.ok) {
                throw new Error("Unable to fetch repositories.");
            }

            // store the repo data in a normal JavaScript array
            const repositoryData = await repositoryResponse.json();

            // send the profile and repos to the local API route that builds the report
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

            // if the analysis route fails, throw an error
            if (!analysisResponse.ok) {
                throw new Error("Unable to generate capability report.");
            }

            // turn the API response into a usable object
            const analysisData = await analysisResponse.json();

            // save the final profile data, repos, and report into state so the dashboard can render
            setProfile(profileData);
            setRepositories(repositoryData);
            setAnalysis(analysisData);

        } catch (err) {

            // log the problem in the console for debugging
            console.error(err);
            // show the actual error message in the UI
            setError(err.message || "Something went wrong.");

        } finally {

            // always turn loading off once the fetch finishes, whether it worked or not
            setLoading(false);

        }

    }

    // this runs when the user presses Search, before they pick a profile
    async function searchProfiles() {

        // if the text box is empty, stop early and show a message
        if (!username.trim()) {
            setError("Please enter a GitHub username or name.");
            return;
        }

        // load state on while the API call happens
        setLoading(true);
        setError("");

        // clear any old profile/dashboard stuff before showing search results
        setProfile(null);
        setRepositories([]);
        setAnalysis(null);
        setSearchResults([]);

        try {

            // turn the typed text into a safe GitHub search query string
            const query = encodeURIComponent(username.trim());
            const searchResponse = await fetch(
                `https://api.github.com/search/users?q=${query}&per_page=8`
            );

            // if GitHub says the search failed, throw a proper error
            if (!searchResponse.ok) {
                throw new Error("Unable to search GitHub profiles.");
            }

            // convert the returned JSON into a JavaScript object
            const searchData = await searchResponse.json();

            // if the search finds nothing, show a friendly error
            if (!searchData.items?.length) {
                throw new Error("No matching GitHub profiles found.");
            }

            // save the search results so the page can render the profile cards
            setSearchResults(searchData.items);

        } catch (err) {

            // log the error for debugging
            console.error(err);
            // show the error in the page body
            setError(err.message || "Something went wrong.");

        } finally {

            // turn loading off when the search finishes
            setLoading(false);

        }

    }

    const isDark = theme === "dark";

    return (

        // main wrapper for the whole page, just keeps the layout full-height
        <main className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0d1117]" : "bg-transparent"}`}>

            {/* this centers the whole dashboard and adds the page padding */}
            <div className="mx-auto max-w-[1180px] px-4 pb-10 pt-4 sm:px-6 lg:px-8">

                {/* top logo/title block */}
                <Header
                    theme={theme}
                    toggleTheme={() => setTheme((current) => current === "light" ? "dark" : "light")}
                />

                {/* search form sits under the header */}
                <Searchbar
                    username={username}
                    setUsername={setUsername}
                    analyseProfile={searchProfiles}
                    loading={loading}
                    theme={theme}
                />

                {/* if there’s an error, this box shows it in a red warning style */}
                {error && (

                    <div className={`mt-6 rounded-xl border p-4 ${isDark ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-red-200 bg-red-50 text-red-700"}`}>

                        {error}

                    </div>

                )}

                {/* Search results */}

                {/* when a search returns matches, this section shows the clickable profile options */}
                {!profile && searchResults.length > 0 && !loading && (

                    <section className="mt-8">

                        <div className={`float-in rounded-[28px] border p-6 ${isDark ? "border-[#30363d] bg-[#161b22] shadow-[0_10px_28px_rgba(0,0,0,0.35)]" : "border-[#d0d7de] bg-white shadow-[0_10px_28px_rgba(31,35,40,0.08)]"}`}>

                            {/* header inside the results box */}
                            <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">

                                <div>

                                    <h2 className={`text-2xl font-bold ${isDark ? "text-[#f0f6fc]" : "text-[#2d1706]"}`}>
                                        Matching GitHub profiles
                                    </h2>

                                    <p className={`mt-1 text-sm ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>
                                        Choose the profile you want to analyse.
                                    </p>

                                </div>

                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                                {/* each result becomes a little card button that lifts when hovered */}
                                {searchResults.map((result) => (

                                    <button
                                        key={result.id}
                                        onClick={() => analyseProfile(result.login)}
                                        className={`flex items-center gap-4 rounded-[20px] border p-4 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-[#0969da] ${isDark ? "border-[#30363d] bg-[#0d1117] shadow-[0_5px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]" : "border-[#d0d7de] bg-[#f6f8fa] shadow-[0_5px_14px_rgba(31,35,40,0.08)] hover:shadow-[0_14px_28px_rgba(31,35,40,0.12)]"}`}
                                    >

                                        {/* avatar image for the GitHub profile */}
                                        <img
                                            src={result.avatar_url}
                                            alt={`${result.login} avatar`}
                                            className="h-14 w-14 rounded-full border-2 border-[#d0d7de] object-cover"
                                        />

                                        <div>

                                            {/* username text shown in the card */}
                                            <div className={`text-lg font-semibold ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>
                                                @{result.login}
                                            </div>

                                            {/* small hint text so the user knows what clicking does */}
                                            <div className={`text-sm ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>
                                                Open GitHub profile
                                            </div>

                                        </div>

                                    </button>

                                ))}

                            </div>

                        </div>

                    </section>

                )}

                {/* Welcome screen */}

                {/* this is the default welcome screen when the user hasn’t searched yet */}
                {!profile && !loading && !error && searchResults.length === 0 && (

                    <section className="mt-14">

                        <div className="float-in rounded-[32px] border border-[#d0d7de] bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fa_100%)] p-12 text-center shadow-[0_16px_40px_rgba(31,35,40,0.08)]">

                            <div className="text-6xl mb-6">
                                
                            </div>

                            <h2 className="text-4xl font-bold text-slate-800">

                              Analyse Any GitHub Portfolio

                            </h2>

                            <p className="mt-5 text-slate-600 max-w-2xl mx-auto leading-8">

                                Enter a GitHub username above to generate
                                a portfolio assessment based on
                                public repositories, technologies,
                                project quality and development activity.

                            </p>

                        </div>

                    </section>

                )}

                {/* Loading */}

                {/* this appears while the app is waiting on the GitHub API or the analysis API */}
                {loading && (

                    <section className="mt-14">

                        <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-12 text-center">

                            {/* spinner is the simple animated bit on the page while the app is fetching data */}
                            <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />

                            <h2 className="mt-8 text-3xl font-bold text-slate-800">

                                Analysing Portfolio...

                            </h2>

                            <p className="mt-3 text-slate-500">

                                Generating capability report...

                            </p>

                        </div>

                    </section>

                )}

                {/* Dashboard */}

                {/* once the profile and report exist, this shows the full dashboard layout */}
                {profile && analysis && (

                    <div className="mt-8 grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)] items-start">

                        <div className="space-y-6">

                            <ProfileCard
                                profile={profile}
                                repositories={repositories}
                                theme={theme}
                            />

                            <ProfileChat
                                profile={profile}
                                repositories={repositories}
                                theme={theme}
                            />

                        </div>

                        <div className="space-y-6">

                            <AnalysisReport
                                profile={profile}
                                repositories={repositories}
                                analysis={analysis}
                                theme={theme}
                            />

                            <RepositoryList
                                repositories={repositories}
                                theme={theme}
                            />

                        </div>

                    </div>

                )}

            </div>

        </main>

    );

}
