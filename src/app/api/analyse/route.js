import OpenAI from "openai";
import { NextResponse } from "next/server";

// Create an OpenAI client using the API key stored in .env.local
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {

    try {

        // Get the GitHub data from the frontend
        const { profile, repositories } = await request.json();

        // Extract the repository information the AI needs
        const repoSummary = repositories.map((repo) => ({
            name: repo.name,
            language: repo.language,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            topics: repo.topics,
        }));

        // Prompt sent to OpenAI
        const prompt = `
You are an expert software engineering capability assessor.

Analyse this GitHub profile and produce a JSON object.

GitHub Profile

Username: ${profile.login}

Public Repositories: ${profile.public_repos}

Repositories:

${JSON.stringify(repoSummary, null, 2)}

Return ONLY valid JSON in this format:

{
  "summary": "",
  "capabilities": [
    {
      "name": "",
      "score": 0,
      "reason": ""
    }
  ],
  "strengths": [
    ""
  ],
  "recommendations": [
    ""
  ]
}
`;

        // Send the repository data to OpenAI
        const openAIResponse = await openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [
                {
                    role: "system",
                    content:
                        "You analyse GitHub portfolios and identify professional software engineering capabilities."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],

            temperature: 0.5,

        });

        // Read the AI's reply
        const aiResponse = openAIResponse.choices[0].message.content;

        // Convert the JSON string into a JavaScript object
        const analysis = JSON.parse(aiResponse);

        // Send the analysis back to the frontend
        return NextResponse.json(analysis);

    } catch (error) {

        // Display the error in the terminal
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to analyse profile.",
            },
            {
                status: 500,
            }
        );

    }

}