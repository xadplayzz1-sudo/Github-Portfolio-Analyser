"use client";

export default function DeveloperActivity({
    profile,
    repositories = [],
    theme
}) {

    /*
        Creates the activity graph data.

        GitHub API does not provide a full contribution graph
        without authentication, so we estimate activity using
        repository update dates.

        Each day gets a score based on repositories updated.
    */
    const generateActivity = () => {

        const days = [];

        const today = new Date();


        for (let i = 29; i >= 0; i--) {

            const date = new Date();

            date.setDate(
                today.getDate() - i
            );


            const count = repositories.filter(repo => {

                const updated =
                    new Date(repo.updated_at);


                return (
                    updated.getDate() === date.getDate() &&
                    updated.getMonth() === date.getMonth() &&
                    updated.getFullYear() === date.getFullYear()
                );

            }).length;


            days.push(count);

        }


        return days;
    };


    const activity =
        generateActivity();



    /*
        Finds the highest activity value.

        Used to scale the SVG graph.
    */
    const maxActivity =
        Math.max(...activity, 1);



    /*
        Converts activity numbers into
        SVG coordinates.
    */
    const graphPoints =
        activity.map((value, index) => {


            const x =
                (index / 29) * 500;


            const y =
                100 -
                ((value / maxActivity) * 80);


            return `${x},${y}`;

        }).join(" ");



    /*
        Repository statistics
    */

    const updatedRepositories =
        repositories.filter(repo => {

            const updated =
                new Date(repo.updated_at);


            const difference =
                (new Date() - updated) /
                (1000 * 60 * 60 * 24);


            return difference <= 30;

        }).length;



    const languages =
        [
            ...new Set(
                repositories
                    .map(repo => repo.language)
                    .filter(Boolean)
            )
        ].length;



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



    const memberSince =
        profile?.created_at
            ? new Date(profile.created_at)
                .getFullYear()
            : "Unknown";



    return (

        <section
            className={`
                rounded-md
                p-6
                font-[Segoe_UI]
                border
                ${
                    theme === "dark"
                    ? `
                        bg-[#0d1117]
                        border-[#30363d]
                        text-[#f0f6fc]
                    `
                    :
                    `
                        bg-white
                        border-[#d0d7de]
                        text-[#24292f]
                    `
                }
            `}
        >


            {/* Heading */}

            <h2
                className={`
                    text-lg
                    font-semibold
                    ${
                        theme === "dark"
                        ? "text-[#f0f6fc]"
                        : "text-[#24292f]"
                    }
                `}
            >
                Developer Activity
            </h2>


            <p
                className={`
                    text-sm
                    mt-1
                    ${
                        theme === "dark"
                        ? "text-[#8b949e]"
                        : "text-[#57606a]"
                    }
                `}
            >
                Repository updates over the last 30 days
            </p>




            {/* Activity graph */}

            <div
                className={`
                    mt-6
                    border
                    rounded-md
                    p-4
                    h-44
                    ${
                        theme === "dark"
                        ? `
                            border-[#30363d]
                            bg-[#161b22]
                        `
                        :
                        `
                            border-[#d8dee4]
                            bg-white
                        `
                    }
                `}
            >

                <svg
                    viewBox="
                        0 0 500 120
                    "
                    className="
                        w-full
                        h-full
                    "
                >

                    <polyline

                        points={
                            graphPoints
                        }

                        fill="none"

                        stroke={
                            theme === "dark"
                                ? "#58a6ff"
                                : "#0969da"
                        }

                        strokeWidth="3"

                        strokeLinecap="round"

                        strokeLinejoin="round"

                    />

                </svg>


            </div>




            {/* Date labels */}

            <div
                className={`
                    flex
                    justify-between
                    text-xs
                    mt-2
                    ${
                        theme === "dark"
                        ? "text-[#8b949e]"
                        : "text-[#57606a]"
                    }
                `}
            >

                <span>
                    30 days ago
                </span>


                <span>
                    Today
                </span>

            </div>





            {/* Statistics */}

            <div
                className={`
                    mt-6
                    border-t
                    ${
                        theme === "dark"
                        ? "border-[#30363d]"
                        : "border-[#d8dee4]"
                    }
                    pt-4
                    space-y-3
                `}
            >

                <Stat
                    label="Updated repositories"
                    value={updatedRepositories}
                    theme={theme}
                />


                <Stat
                    label="Languages"
                    value={languages}
                    theme={theme}
                />


                <Stat
                    label="Total stars"
                    value={
                        totalStars.toLocaleString()
                    }
                    theme={theme}
                />


                <Stat
                    label="Total forks"
                    value={
                        totalForks.toLocaleString()
                    }
                    theme={theme}
                />


                <Stat
                    label="Member since"
                    value={memberSince}
                    theme={theme}
                />


            </div>


        </section>

    );

}





/*
    Reusable statistic row.
*/

function Stat({
    label,
    value,
    theme
}) {

    return (

        <div
            className="
                flex
                justify-between
                text-sm
            "
        >

            <span
                className={`
                    ${
                        theme === "dark"
                        ? "text-[#8b949e]"
                        : "text-[#57606a]"
                    }
                `}
            >
                {label}
            </span>


            <span
                className="
                    font-medium
                "
            >
                {value}
            </span>


        </div>

    );

}