import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



export async function POST(request) {

    try {

        const { profile, repositories } = await request.json();


        // Only send useful GitHub information to the AI
        const repoSummary = repositories.map((repo) => ({

            name: repo.name,

            language: repo.language,

            description: repo.description,

            stars: repo.stargazers_count,

            forks: repo.forks_count

        }));



        const prompt = `

You are a software engineering capability assessor.

Analyse this GitHub profile and create a capability report.

Developer:
${profile.login}

Repositories:
${JSON.stringify(repoSummary, null, 2)}


Return ONLY JSON.

Use this format:

{
 "summary":"",
 "capabilities":[
   {
    "name":"",
    "score":0,
    "reason":""
   }
 ],
 "strengths":[
   ""
 ],
 "recommendations":[
   ""
 ]
}

`;



        const model = genAI.getGenerativeModel({

            model: "gemini-1.5-flash"

        });



        const result = await model.generateContent(prompt);



        const aiText = result.response.text();



        // Remove markdown if Gemini adds it
        const cleanJSON = aiText
            .replace("```json", "")
            .replace("```", "")
            .trim();



        const analysis = JSON.parse(cleanJSON);



        return NextResponse.json(analysis);


    } catch (error) {


        console.error(error);


        return NextResponse.json(

            {
                error: "AI analysis failed."
            },

            {
                status: 500
            }

        );

    }

}