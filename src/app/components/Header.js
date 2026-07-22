export default function Header() {
    return (
        <header className="py-8">

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8">

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-white text-2xl">
                        💻
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            GitHub Portfolio Analyser
                        </h1>

                        <p className="mt-1 text-slate-600">
                            Analyse GitHub profiles to generate a capability report based on repositories, technologies and development activity.
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}