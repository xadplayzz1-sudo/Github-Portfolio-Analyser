// Displays a visual summary of a developer's recent GitHub activity

export default function DeveloperActivity({
    repositories = [],
    profile,
    theme
}) {

    // Don't show the section until a profile has been loaded
    if (!profile || repositories.length === 0) {
        return null;
    }

    // Current colour theme
    const isDark = theme === "dark";

    // Today's date
    const today = new Date();

    // Stores the activity for the last 30 days
    const activityData = [];

    // Build the empty graph first
    for (let i = 29; i >= 0; i--) {

        const day = new Date(today);

        day.setDate(today.getDate() - i);

        activityData.push({
            date: day,
            value: 0
        });

    }

    // Overall statistics
    let totalStars = 0;
    let totalForks = 0;

    const languages = new Set();

    let recentlyUpdated = 0;

    // Loop through every repository
    repositories.forEach((repo) => {

        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;

        if (repo.language) {
            languages.add(repo.language);
        }

        const updated = new Date(repo.updated_at);

        const daysAgo =
            (today - updated) /
            (1000 * 60 * 60 * 24);

        // Count repositories updated recently
        if (daysAgo <= 30) {
            recentlyUpdated++;
        }

        // Add repository influence onto the graph
        activityData.forEach((day) => {

            const difference =
                Math.abs(
                    (updated - day.date) /
                    (1000 * 60 * 60 * 24)
                );

            // Nearby dates receive a larger score
            if (difference < 12) {

                day.value +=
                    Math.max(
                        0,
                        12 - difference
                    ) *
                    (
                        1 +
                        repo.stargazers_count / 25 +
                        repo.forks_count / 50
                    );

            }

        });

    });

    // Round everything
    activityData.forEach((day) => {

        day.value = Math.round(day.value);

    });

    // Highest graph value
    const highestPoint =
        Math.max(
            ...activityData.map(day => day.value),
            1
        );

    // Calculate a simple activity score
    const activityScore = Math.min(
        100,
        Math.round(
            recentlyUpdated * 6 +
            repositories.length * 2 +
            languages.size * 5 +
            totalStars * 0.3 +
            totalForks * 0.15
        )
    );

    // SVG size
    const graphWidth = 340;
    const graphHeight = 120;
    const padding = 12;

    // Convert graph values into SVG coordinates
    const graphPoints = activityData
        .map((day, index) => {

            const x =
                padding +
                index *
                (
                    (graphWidth - padding * 2) /
                    (activityData.length - 1)
                );

            const y =
                graphHeight -
                padding -
                (
                    day.value /
                    highestPoint
                ) *
                (
                    graphHeight -
                    padding * 2
                );

            return `${x},${y}`;

        })
        .join(" ");

    return (

        <section
            className={`rounded-[24px] border p-5 transition duration-300 ${
                isDark
                    ? "border-[#30363d] bg-[#161b22] shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                    : "border-[#d0d7de] bg-white shadow-[0_10px_28px_rgba(31,35,40,0.08)]"
            }`}
        >
            {/* Section heading */}
            <div className="mb-5 flex items-center justify-between">

                <div>

                    <h2
                        className={`text-[1.35rem] font-bold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        Developer Activity
                    </h2>

                    <p
                        className={`mt-1 text-sm ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Repository activity calculated from recent updates,
                        project popularity and portfolio size.
                    </p>

                </div>

                <div
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        isDark
                            ? "bg-[#0d1117] text-[#f0f6fc]"
                            : "bg-[#f6f8fa] text-[#24292f]"
                    }`}
                >
                    Activity Score {activityScore}
                </div>

            </div>

            {/* Graph area */}
            <div
                className={`rounded-[20px] border p-5 ${
                    isDark
                        ? "border-[#30363d] bg-[#0d1117]"
                        : "border-[#d0d7de] bg-[#f6f8fa]"
                }`}
            >

                <svg
                    viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                    className="h-[170px] w-full"
                    preserveAspectRatio="none"
                >

                    {/* Horizontal guide lines */}
                    {[0, 1, 2, 3, 4].map((line) => (

                        <line
                            key={line}
                            x1="0"
                            x2={graphWidth}
                            y1={
                                padding +
                                line *
                                    (
                                        (graphHeight - padding * 2) /
                                        4
                                    )
                            }
                            y2={
                                padding +
                                line *
                                    (
                                        (graphHeight - padding * 2) /
                                        4
                                    )
                            }
                            stroke={
                                isDark
                                    ? "#30363d"
                                    : "#d8dee4"
                            }
                            strokeWidth="1"
                        />

                    ))}

                    {/* Main activity line */}
                    <polyline
                        points={graphPoints}
                        fill="none"
                        stroke="#0969da"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Individual graph points */}
                    {activityData.map((day, index) => {

                        const x =
                            padding +
                            index *
                                (
                                    (graphWidth - padding * 2) /
                                    (activityData.length - 1)
                                );

                        const y =
                            graphHeight -
                            padding -
                            (
                                day.value /
                                highestPoint
                            ) *
                                (
                                    graphHeight -
                                    padding * 2
                                );

                        return (

                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="3.5"
                                fill="#0969da"
                            />

                        );

                    })}

                </svg>

                <div
                    className={`mt-3 flex justify-between text-xs ${
                        isDark
                            ? "text-[#8b949e]"
                            : "text-[#57606a]"
                    }`}
                >

                    <span>30 days ago</span>

                    <span>Today</span>

                </div>

            </div>

            {/* Statistics */}
            <div className="mt-5 grid grid-cols-2 gap-4">
                {/* Total repositories */}
                <div
                    className={`rounded-[18px] border p-4 transition duration-300 ${
                        isDark
                            ? "border-[#30363d] bg-[#161b22]"
                            : "border-[#d0d7de] bg-white"
                    }`}
                >

                    <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Repositories
                    </p>

                    <h3
                        className={`mt-2 text-3xl font-bold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        {repositories.length}
                    </h3>

                </div>

                {/* Recently updated */}
                <div
                    className={`rounded-[18px] border p-4 transition duration-300 ${
                        isDark
                            ? "border-[#30363d] bg-[#161b22]"
                            : "border-[#d0d7de] bg-white"
                    }`}
                >

                    <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Updated Recently
                    </p>

                    <h3
                        className={`mt-2 text-3xl font-bold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        {recentlyUpdated}
                    </h3>

                </div>

                {/* Languages */}
                <div
                    className={`rounded-[18px] border p-4 transition duration-300 ${
                        isDark
                            ? "border-[#30363d] bg-[#161b22]"
                            : "border-[#d0d7de] bg-white"
                    }`}
                >

                    <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Languages
                    </p>

                    <h3
                        className={`mt-2 text-3xl font-bold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        {languages.size}
                    </h3>

                </div>

                {/* Total stars */}
                <div
                    className={`rounded-[18px] border p-4 transition duration-300 ${
                        isDark
                            ? "border-[#30363d] bg-[#161b22]"
                            : "border-[#d0d7de] bg-white"
                    }`}
                >

                    <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Total Stars
                    </p>

                    <h3
                        className={`mt-2 text-3xl font-bold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        {totalStars}
                    </h3>

                </div>

                {/* Total forks */}
                <div
                    className={`rounded-[18px] border p-4 transition duration-300 ${
                        isDark
                            ? "border-[#30363d] bg-[#161b22]"
                            : "border-[#d0d7de] bg-white"
                    }`}
                >

                    <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Total Forks
                    </p>

                    <h3
                        className={`mt-2 text-3xl font-bold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        {totalForks}
                    </h3>

                </div>

                {/* Account age */}
                <div
                    className={`rounded-[18px] border p-4 transition duration-300 ${
                        isDark
                            ? "border-[#30363d] bg-[#161b22]"
                            : "border-[#d0d7de] bg-white"
                    }`}
                >

                    <p
                        className={`text-xs font-semibold uppercase tracking-wide ${
                            isDark
                                ? "text-[#8b949e]"
                                : "text-[#57606a]"
                        }`}
                    >
                        Member Since
                    </p>

                    <h3
                        className={`mt-2 text-lg font-semibold ${
                            isDark
                                ? "text-[#f0f6fc]"
                                : "text-[#24292f]"
                        }`}
                    >
                        {new Date(profile.created_at).getFullYear()}
                    </h3>

                </div>

            </div>

        </section>

    );

}