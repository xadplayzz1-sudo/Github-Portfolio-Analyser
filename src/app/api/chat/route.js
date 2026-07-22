import { NextResponse } from "next/server";

function buildContextBriefing(profile, repositories) {
    const languages = {};

    repositories.forEach((repo) => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });

    const topLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => `${name} (${count})`)
        .join(", ");

    const mostStarred = [...repositories]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo) => `${repo.name}: ${repo.stargazers_count}★, ${repo.language || "Unknown"}, ${repo.description || "No description"}`)
        .join("\n");

    const recentlyUpdated = [...repositories]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 5)
        .map((repo) => `${repo.name}: ${repo.language || "Unknown"}, updated ${repo.updated_at}`)
        .join("\n");

    return `=== GITHUB PROFILE ===
User: ${profile?.name || profile?.login} (@${profile?.login})
Bio: ${profile?.bio || "No bio provided"}
Followers: ${profile?.followers ?? 0}   Public repos: ${profile?.public_repos ?? 0}
Top languages: ${topLanguages || "N/A"}
Most-starred repos:
${mostStarred || "N/A"}
Recently updated:
${recentlyUpdated || "N/A"}`;
}

function buildFallbackReply(profile, repositories, message) {
    const safeRepos = Array.isArray(repositories) ? repositories : [];
    const topRepo = [...safeRepos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
    const topLanguage = [...safeRepos]
        .map((repo) => repo.language)
        .filter(Boolean)
        .reduce((acc, language) => {
            acc[language] = (acc[language] || 0) + 1;
            return acc;
        }, {});

    const primaryLanguage = Object.entries(topLanguage).sort((a, b) => b[1] - a[1])[0]?.[0] || "multiple languages";

    if (message.toLowerCase().includes("repo") || message.toLowerCase().includes("project")) {
        return `From the available public data, ${topRepo?.name || "the top repository"} is a useful signal of this developer’s interests. It appears to be a standout project in ${topRepo?.language || primaryLanguage}, with ${topRepo?.stargazers_count || 0} stars and ${topRepo?.forks_count || 0} forks. If you want a deeper repository-by-repository breakdown, the profile data should be enriched with more detailed metadata.`;
    }

    return `Based on the profile snapshot, ${profile?.login || "this developer"} shows a portfolio shaped around ${primaryLanguage} and ${safeRepos.length || 0} public repositories. The strongest signal is that they have been building and sharing work publicly, with engagement visible in stars and forks across their projects.`;
}

export async function POST(request) {
    try {
        const { profile, repositories, message, history = [] } = await request.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "A message is required." },
                { status: 400 }
            );
        }

        if (!process.env.GROQ_API_KEY) {
            const fallbackReply = buildFallbackReply(profile, repositories || [], message);
            return NextResponse.json({ reply: fallbackReply });
        }

        const context = buildContextBriefing(profile, repositories || []);
        const systemPrompt = `You are Gitbot, an assistant that analyzes GitHub profiles. You are knowledgeable and concise (2-3 short paragraphs max). Never fabricate repos, stars, or stats not present in the provided data. Stay on the topic of this profile and its repositories.\n\n${context}`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...history,
                    { role: "user", content: message }
                ],
                max_tokens: 512,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const fallbackReply = buildFallbackReply(profile, repositories || [], message);
            return NextResponse.json({ reply: fallbackReply });
        }

        const data = await response.json();
        const reply = data?.choices?.[0]?.message?.content || "No reply generated.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "AI request failed, try again" },
            { status: 502 }
        );
    }
}
