export default function RepositoryList({ repositories }) {

  return (

    <div className="mt-10 w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-slate-900">
        Repositories
      </h2>


      <div className="mt-4 space-y-4">

        {repositories.slice(0, 5).map((repo) => (

          <div
            key={repo.id}
            className="rounded-lg border border-slate-200 p-4"
          >

            <h3 className="font-bold text-slate-900">
              {repo.name}
            </h3>


            <p className="text-slate-600">
              {repo.description || "No description available."}
            </p>


            <p className="mt-2 text-sm text-slate-500">
              Language: {repo.language || "Unknown"}
            </p>


          </div>

        ))}

      </div>

    </div>

  );

}