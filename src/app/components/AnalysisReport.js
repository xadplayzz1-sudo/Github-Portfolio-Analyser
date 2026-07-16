"use client";

export default function AnalysisReport({ profile, repositories }) {

  // Count programming languages used across repositories
  const languageCount = {};

  repositories.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });


  // Sort languages by usage
  const languages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1]);


  // Basic capability indicators
  const capabilities = [];

  if (repositories.length >= 5) {
    capabilities.push("Consistent GitHub activity");
  }

  if (languages.length >= 3) {
    capabilities.push("Multi-language development");
  }

  if (
    repositories.some(
      (repo) => repo.description
    )
  ) {
    capabilities.push("Project documentation");
  }

  if (
    repositories.some(
      (repo) => repo.stargazers_count > 0
    )
  ) {
    capabilities.push("Community engagement");
  }


  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">

      {/* Title */}
      <h2 className="text-3xl font-bold text-black">
        Capability Analysis Report
      </h2>


      {/* Developer Information */}
      <div className="mt-5">

        <h3 className="text-xl font-semibold text-black">
          Developer Overview
        </h3>

        <p className="text-black mt-2">
          Username: {profile.login}
        </p>

        <p className="text-black">
          Public repositories: {profile.public_repos}
        </p>

        <p className="text-black">
          Followers: {profile.followers}
        </p>

      </div>



      {/* Repository Analysis */}
      <div className="mt-6">

        <h3 className="text-xl font-semibold text-black">
          Repository Analysis
        </h3>

        <p className="text-black mt-2">
          Repositories analysed: {repositories.length}
        </p>

      </div>



      {/* Languages */}
      <div className="mt-6">

        <h3 className="text-xl font-semibold text-black">
          Technical Skill Breakdown
        </h3>


        {languages.length === 0 ? (

          <p className="text-black mt-2">
            No programming languages detected.
          </p>

        ) : (

          <ul className="mt-2">

            {languages.map(([language, count]) => (

              <li 
                key={language}
                className="text-black"
              >
                {language}: {count} repositories
              </li>

            ))}

          </ul>

        )}

      </div>



      {/* Capability Insights */}
      <div className="mt-6">

        <h3 className="text-xl font-semibold text-black">
          Capability Insights
        </h3>


        {capabilities.length === 0 ? (

          <p className="text-black mt-2">
            Not enough data available yet.
          </p>

        ) : (

          <ul className="list-disc ml-5 mt-2">

            {capabilities.map((item) => (

              <li 
                key={item}
                className="text-black"
              >
                {item}
              </li>

            ))}

          </ul>

        )}

      </div>



      {/* Repository List */}
      <div className="mt-6">

        <h3 className="text-xl font-semibold text-black">
          Projects Analysed
        </h3>


        <ul className="mt-2">

          {repositories.slice(0,5).map((repo) => (

            <li 
              key={repo.id}
              className="text-black mb-2"
            >

              <strong>
                {repo.name}
              </strong>

              {" - "}

              {repo.language || "Unknown language"}

            </li>

          ))}

        </ul>

      </div>


    </div>
  );
}