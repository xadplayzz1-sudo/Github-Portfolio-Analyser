export default function DeveloperOverview({

  profile,
  repositories,

}) {

  // Count the occurrence of each language
  const languages = {};

  repositories.forEach(repo => {

    if (repo.language) {

      languages[repo.language] =
        (languages[repo.language] || 0) + 1;

    }

  });

  // Find the three most frequently used languages
  const topLanguages = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(item => item[0]);

  // Calculate the total number of stars across all repositories
  const totalStars = repositories.reduce(

    (sum, repo) => sum + repo.stargazers_count,

    0

  );

  return (

    <div className="mt-8 mb-10 w-full max-w-xl rounded-xl bg-blue-600 p-6 text-white shadow-lg">

      {/* Section heading */}
      <h2 className="text-2xl font-bold">
        Developer Overview
      </h2>

      {/* Summary of developer activity */}
      <p className="mt-4">
        {profile.name || profile.login} has {repositories.length} public repositories.
      </p>

      <p className="mt-2">
        Primary technologies: {topLanguages.join(", ") || "None"}
      </p>

      <p className="mt-2">
        Total GitHub stars: {totalStars}
      </p>

      <p className="mt-2">
        Followers: {profile.followers}
      </p>

    </div>

  );

}