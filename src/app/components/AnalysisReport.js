export default function AnalysisReport({ profile, repositories }) {

  // Counts how often each programming language appears
  function analyseLanguages() {

    const languages = {};

    repositories.forEach((repo) => {

      if (repo.language) {

        if (languages[repo.language]) {
          languages[repo.language]++;
        } else {
          languages[repo.language] = 1;
        }

      }

    });


    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1]);

  }


  // Creates capability scores based on GitHub evidence
  function generateCapabilities() {

    const languageCount = analyseLanguages();

    const capabilities = [];


    // Programming score
    let programmingScore = Math.min(
      repositories.length * 5,
      100
    );


    capabilities.push({
      name: "Programming Skills",
      score: programmingScore,
      evidence:
        `${repositories.length} public repositories analysed`
    });



    // Language score
    if (languageCount.length > 0) {

      capabilities.push({
        name: "Technical Variety",
        score: Math.min(languageCount.length * 20, 100),
        evidence:
          `Uses ${languageCount.length} different programming languages`
      });

    }



    // Project experience
    const projectsScore = Math.min(
      repositories.filter(
        repo => repo.description
      ).length * 10,
      100
    );


    capabilities.push({
      name: "Project Development",
      score: projectsScore,
      evidence:
        "Based on repositories containing project information"
    });



    // Open source activity
    capabilities.push({
      name: "Open Source Contribution",
      score: Math.min(
        profile.public_repos * 5,
        100
      ),
      evidence:
        `${profile.public_repos} public GitHub repositories`
    });


    return capabilities;

  }


  const languages = analyseLanguages();
  const capabilities = generateCapabilities();



  return (

    <section className="analysis-report">

      <h2>
        Capability Analysis Report
      </h2>


      <p>
        Developer: <strong>{profile.login}</strong>
      </p>


      <p>
        Repositories analysed:
        {" "}
        <strong>{repositories.length}</strong>
      </p>



      <h3>
        Technical Skillset
      </h3>


      {
        languages.length === 0 ? (

          <p>
            No programming languages detected.
          </p>

        ) : (

          <ul>

            {
              languages.map(([language, amount]) => (

                <li key={language}>

                  {language}
                  {" "}
                  - {amount} projects

                </li>

              ))
            }

          </ul>

        )
      }



      <h3>
        Capability Scores
      </h3>



      {
        capabilities.map((capability) => (

          <div
            key={capability.name}
            style={{
              marginBottom: "20px"
            }}
          >

            <strong>
              {capability.name}
            </strong>


            <div>

              Score:
              {" "}
              {capability.score}%

            </div>


            <div>

              Evidence:
              {" "}
              {capability.evidence}

            </div>


            <progress
              value={capability.score}
              max="100"
            />

          </div>

        ))
      }



    </section>

  );

}