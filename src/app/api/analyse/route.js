import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

function buildHeuristicAnalysis(profile, repositories) {
    const safeRepositories = Array.isArray(repositories) ? repositories : [];
    const languages = {};

    safeRepositories.forEach((repo) => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });

    const languageRanking = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    const numberOfLanguages = languageRanking.length;
    const mainLanguage = languageRanking.length > 0 ? languageRanking[0][0] : "unknown";

    const describedProjects = safeRepositories.filter(
        (repo) => repo.description && repo.description.length > 20
    ).length;

    const popularProjects = safeRepositories.filter(
        (repo) => repo.stargazers_count > 0 || repo.forks_count > 0
    ).length;

    const totalStars = safeRepositories.reduce((total, repo) => total + repo.stargazers_count, 0);
    const totalForks = safeRepositories.reduce((total, repo) => total + repo.forks_count, 0);

    const capabilities = [
        {
            name: "Programming Experience",
            score: Math.min(safeRepositories.length * 5, 100),
            reason: `${safeRepositories.length} public repositories show practical software development experience.`
        },
        {
            name: "Technical Variety",
            score: Math.min(numberOfLanguages * 20, 100),
            reason: `${numberOfLanguages} programming languages detected, including ${mainLanguage}.`
        },
        {
            name: "Project Quality",
            score: Math.min(describedProjects * 15, 100),
            reason: `${describedProjects} projects contain useful descriptions.`
        },
        {
            name: "Developer Activity",
            score: Math.min((totalStars + totalForks) * 10, 100),
            reason: `${totalStars} stars and ${totalForks} forks indicate community engagement.`
        }
    ];

    const overallScore = Math.round(
        capabilities.reduce((total, item) => total + item.score, 0) / capabilities.length
    );

    const strengths = [];

    if (safeRepositories.length >= 10) {
        strengths.push("Maintains a strong portfolio of public projects.");
    }

    if (numberOfLanguages >= 3) {
        strengths.push("Shows experience across multiple programming languages.");
    }

    if (describedProjects >= 5) {
        strengths.push("Demonstrates awareness of software documentation practices.");
    }

    if (popularProjects > 0) {
        strengths.push("Has projects receiving GitHub engagement.");
    }

    if (strengths.length === 0) {
        strengths.push("Shows evidence of practical programming experience.");
    }

    const recommendations = [];

    if (describedProjects < safeRepositories.length) {
        recommendations.push("Improve repository descriptions and documentation.");
    }

    if (numberOfLanguages < 3) {
        recommendations.push("Explore additional technologies to increase technical breadth.");
    }

    recommendations.push("Add automated testing and deployment workflows.");
    recommendations.push("Create larger end-to-end projects demonstrating system design.");

    const rankedRepositories = safeRepositories
        .map((repo) => ({
            name: repo.name,
            language: repo.language,
            score: Math.min(
                repo.stargazers_count * 20 + repo.forks_count * 10 + (repo.description ? 20 : 0),
                100
            )
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    return {
        overallScore,
        summary: `${profile.login} has ${profile.public_repos} public repositories. The portfolio shows evidence of development experience, with strongest activity in ${mainLanguage}.`,
        capabilities,
        strengths,
        recommendations,
        languages: languageRanking,
        topProjects: rankedRepositories
    };
}

async function generateAiSummary(profile, repositories, analysis) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        return null;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const topLanguages = analysis.languages.slice(0, 3).map(([name]) => name).join(", ");
        const topProjects = repositories.slice(0, 3).map((repo) => repo.name).join(", ");

        const prompt = `You are a senior technical reviewer. Write a concise portfolio summary for this GitHub developer using only the provided data. Keep it to 2-3 sentences, professional, and grounded in the facts. User: ${profile.login}, bio: ${profile.bio || "No bio"}. Public repos: ${profile.public_repos}. Top languages: ${topLanguages || "N/A"}. Top projects: ${topProjects || "N/A"}. Overall score: ${analysis.overallScore}.`;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        return text?.trim() || null;
    } catch (error) {
        console.warn("AI summary generation failed, using heuristic summary instead.", error);
        return null;
    }
}

export async function POST(request) {
    try {
        const { profile, repositories } = await request.json();
        const safeRepositories = Array.isArray(repositories) ? repositories : [];
        const analysis = buildHeuristicAnalysis(profile, safeRepositories);
        const aiSummary = await generateAiSummary(profile, safeRepositories, analysis);

        return NextResponse.json({
            ...analysis,
            summary: aiSummary || analysis.summary
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Unable to analyse GitHub profile."
            },
            {
                status: 500
            }
        );
    }
}
