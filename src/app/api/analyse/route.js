import { NextResponse } from "next/server";


export async function POST(request) {

    try {

        const { profile, repositories } = await request.json();



        // -----------------------------
        // Language Analysis
        // -----------------------------

        const languages = {};


        repositories.forEach((repo) => {

            if (repo.language) {

                languages[repo.language] =
                    (languages[repo.language] || 0) + 1;

            }

        });



        const languageRanking = Object.entries(languages)
            .sort((a, b) => b[1] - a[1]);



        const numberOfLanguages =
            languageRanking.length;



        const mainLanguage =
            languageRanking.length > 0
                ? languageRanking[0][0]
                : "unknown";





        // -----------------------------
        // Repository Analysis
        // -----------------------------


        const describedProjects =
            repositories.filter(
                repo =>
                    repo.description &&
                    repo.description.length > 20
            ).length;



        const popularProjects =
            repositories.filter(
                repo =>
                    repo.stargazers_count > 0 ||
                    repo.forks_count > 0
            ).length;



        const totalStars =
            repositories.reduce(
                (total, repo) =>
                    total + repo.stargazers_count,
                0
            );



        const totalForks =
            repositories.reduce(
                (total, repo) =>
                    total + repo.forks_count,
                0
            );





        // -----------------------------
        // Capability Scoring
        // -----------------------------


        const capabilities = [


            {

                name: "Programming Experience",

                score: Math.min(
                    repositories.length * 5,
                    100
                ),

                reason:
                    `${repositories.length} public repositories show practical software development experience.`

            },



            {

                name: "Technical Variety",

                score:
                    Math.min(
                        numberOfLanguages * 20,
                        100
                    ),

                reason:
                    `${numberOfLanguages} programming languages detected, including ${mainLanguage}.`

            },



            {

                name: "Project Quality",

                score:
                    Math.min(
                        describedProjects * 15,
                        100
                    ),

                reason:
                    `${describedProjects} projects contain useful descriptions.`

            },



            {

                name: "Developer Activity",

                score:
                    Math.min(
                        (totalStars + totalForks) * 10,
                        100
                    ),

                reason:
                    `${totalStars} stars and ${totalForks} forks indicate community engagement.`

            }


        ];






        // -----------------------------
        // Overall Developer Score
        // -----------------------------


        const overallScore = Math.round(

            capabilities.reduce(
                (total, item) =>
                    total + item.score,
                0
            )
            /
            capabilities.length

        );






        // -----------------------------
        // Strength Generation
        // -----------------------------


        const strengths = [];



        if (repositories.length >= 10) {

            strengths.push(
                "Maintains a strong portfolio of public projects."
            );

        }



        if (numberOfLanguages >= 3) {

            strengths.push(
                "Shows experience across multiple programming languages."
            );

        }



        if (describedProjects >= 5) {

            strengths.push(
                "Demonstrates awareness of software documentation practices."
            );

        }



        if (popularProjects > 0) {

            strengths.push(
                "Has projects receiving GitHub engagement."
            );

        }



        if (strengths.length === 0) {

            strengths.push(
                "Shows evidence of practical programming experience."
            );

        }





        // -----------------------------
        // Recommendations
        // -----------------------------


        const recommendations = [];



        if (describedProjects < repositories.length) {

            recommendations.push(
                "Improve repository descriptions and documentation."
            );

        }



        if (numberOfLanguages < 3) {

            recommendations.push(
                "Explore additional technologies to increase technical breadth."
            );

        }



        recommendations.push(
            "Add automated testing and deployment workflows."
        );


        recommendations.push(
            "Create larger end-to-end projects demonstrating system design."
        );





        // -----------------------------
        // Repository Ranking
        // -----------------------------


        const rankedRepositories =
            repositories
                .map(repo => ({

                    name: repo.name,

                    language: repo.language,

                    score:
                        Math.min(
                            (
                                repo.stargazers_count * 20
                                +
                                repo.forks_count * 10
                                +
                                (repo.description ? 20 : 0)
                            ),
                            100
                        )

                }))

                .sort(
                    (a,b) =>
                        b.score - a.score
                )

                .slice(0,5);







        return NextResponse.json({

            overallScore,


            summary:

                `${profile.login} has ${profile.public_repos} public repositories. The portfolio shows evidence of development experience, with strongest activity in ${mainLanguage}.`,



            capabilities,


            strengths,


            recommendations,


            languages:
                languageRanking,


            topProjects:
                rankedRepositories


        });



    }


    catch(error) {


        console.error(error);


        return NextResponse.json(

            {
                error:
                    "Unable to analyse GitHub profile."
            },

            {
                status:500
            }

        );


    }

}