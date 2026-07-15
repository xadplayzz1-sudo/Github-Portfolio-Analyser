// test
export default function ProfileCard({ profile }) {

  return (

    <div className="mt-10 w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">

      {/* Avatar */}

      <img
        src={profile.avatar_url}
        alt={profile.login}
        className="mx-auto h-24 w-24 rounded-full"
      />

      {/* Name */}

      <h2 className="mt-4 text-center text-2xl font-bold text-slate-900">
        {profile.name || profile.login}
      </h2>

      {/* Username */}

      <p className="text-center text-slate-600">
        @{profile.login}
      </p>

      {/* Bio */}

      <p className="mt-4 text-center text-slate-700">
        {profile.bio || "No bio available."}
      </p>

      {/* Stats */}

      <div className="mt-6 flex justify-around text-center">

        <div>

          <p className="text-2xl font-bold text-slate-900">
            {profile.public_repos}
          </p>

          <p className="text-slate-500">
            Repositories
          </p>

        </div>

        <div>

          <p className="text-2xl font-bold text-slate-900">
            {profile.followers}
          </p>

          <p className="text-slate-500">
            Followers
          </p>

        </div>

        <div>

          <p className="text-2xl font-bold text-slate-900">
            {profile.following}
          </p>

          <p className="text-slate-500">
            Following
          </p>

        </div>

      </div>

    </div>

  );

}