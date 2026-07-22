export default function ProfileCard({ profile }) {
    if (!profile) return null;

    return (
        <div className="card float-in rounded-[28px] border border-[#f3c7a5] bg-[linear-gradient(180deg,#fffdfb_0%,#fff7ec_100%)] p-5 shadow-[0_12px_30px_rgba(204,88,3,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(204,88,3,0.16)]">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <img
                    src={profile.avatar_url}
                    alt={`${profile.login} avatar`}
                    className="h-[130px] w-[130px] rounded-full border-4 border-[#f3c7a5] object-cover shadow-[0_8px_20px_rgba(204,88,3,0.16)]"
                />

                <div>
                    <h2 className="text-3xl font-bold text-[#2d1706]">
                        {profile.name || profile.login}
                    </h2>

                    <p className="text-[#7c3502] text-lg">@{profile.login}</p>

                    <p className="mt-3 text-lg text-[#7c3502]">
                        {profile.bio || "No biography provided."}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <span className="badge">{profile.public_repos} repos</span>
                        <span className="badge">{profile.followers} followers</span>
                        <span className="badge">{profile.following} following</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
