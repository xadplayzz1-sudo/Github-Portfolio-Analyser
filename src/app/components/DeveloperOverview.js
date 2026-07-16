export default function DeveloperOverview({

  profile,
  repositories,

}) {

  // Store detected skills
  const skills = new Set();

  // Check every repository
  repositories.forEach((repo) => {

    const language = repo.language?.toLowerCase() || "";

    const description = (
      repo.description || ""
    ).toLowerCase();

    const name = repo.name.toLowerCase();

    // Detect programming languages

    if (language === "javascript") skills.add("JavaScript");
    if (language === "typescript") skills.add("TypeScript");
    if (language === "python") skills.add("Python");
    if (language === "java") skills.add("Java");
    if (language === "c#") skills.add("C#");
    if (language === "c++") skills.add("C++");
    if (language === "html") skills.add("HTML");
    if (language === "css") skills.add("CSS");

    // Detect frameworks

    if (
      description.includes("react") ||
      name.includes("react")
    ) {
      skills.add("React");
    }

    if (
      description.includes("next") ||
      name.includes("next")
    ) {
      skills.add("Next.js");
    }

    if (
      description.includes("node") ||
      name.includes("node")
    ) {
      skills.add("Node.js");
    }

  });

  return (

    <div className="mt-8 mb-10 w-full max-w-xl rounded-xl bg-blue-600 p-6 text-white shadow-lg">

      <h2 className="text-2xl font-bold">

        Developer Capability Profile

      </h2>

      <p className="mt-4">

        Based on the analysed GitHub repositories, the following capabilities were identified.

      </p>

      <div className="mt-6 flex flex-wrap gap-3">

        {[...skills].map((skill) => (

          <span
            key={skill}
            className="rounded-full bg-white px-4 py-2 text-blue-700 font-semibold"
          >

            {skill}

          </span>

        ))}

      </div>

      <div className="mt-6">

        <p>
          <strong>Developer:</strong> {profile.name || profile.login}
        </p>

        <p>
          <strong>Repositories Analysed:</strong> {repositories.length}
        </p>

        <p>
          <strong>Capabilities Identified:</strong> {skills.size}
        </p>

      </div>

    </div>

  );

}