export default function AnalysisReport({

    profile,
    repositories

}) {

    if (!profile || !repositories.length) return null;

    const languages = {};

    repositories.forEach((repo) => {

        if (repo.language) {

            languages[repo.language] =
                (languages[repo.language] || 0) + 1;

        }

    });

    const skills = Object.keys(languages);

    return (

        <div className="bg-white shadow rounded p-6 m-6">

            <h2 className="text-2xl font-bold">

                Capability Analysis Report

            </h2>

            <p className="mt-2">

                Developer: {profile.login}

            </p>

            <p>

                Repositories Analysed: {repositories.length}

            </p>

            <h3 className="text-xl font-bold mt-6">

                Technical Skillset

            </h3>

            <ul className="list-disc ml-6">

                {skills.map((skill) => (

                    <li key={skill}>

                        {skill} ({languages[skill]} repositories)

                    </li>

                ))}

            </ul>

            <h3 className="text-xl font-bold mt-6">

                Capability Insights

            </h3>

            <ul className="list-disc ml-6">

                {repositories.length >= 5 && (
                    <li>
                        Experience working on multiple software projects.
                    </li>
                )}

                {languages.JavaScript && (
                    <li>
                        Strong JavaScript development capability.
                    </li>
                )}

                {languages.Python && (
                    <li>
                        Demonstrates Python programming skills.
                    </li>
                )}

                {languages.Java && (
                    <li>
                        Demonstrates Java software development.
                    </li>
                )}

                {profile.followers >= 10 && (
                    <li>
                        Active GitHub community presence.
                    </li>
                )}

            </ul>

        </div>

    );

}