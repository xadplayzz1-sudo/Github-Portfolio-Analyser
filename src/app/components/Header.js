export default function Header() {
    return (
        <header className="py-8">

            {/* this is the top card that gives the whole page its warm "dashboard" look */}
            <div className="float-in rounded-[28px] border border-[#fdb988] bg-[#fff7ec] shadow-[0_12px_34px_rgba(204,88,3,0.15)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(204,88,3,0.18)]">

                <div className="flex items-center gap-4">

                    {/* small white badge around the logo so it feels like a little icon card */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#f3c7a5]">
                        <img
                            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                            alt="GitHub logo"
                            className="h-7 w-7 object-contain"
                        />
                    </div>

                    <div>

                        {/* main title text for the app */}
                        <h1 className="text-[1.9rem] font-bold text-[#2d1706]">
                            GitHub Portfolio Analyser
                        </h1>

                        {/* short description of what the site does */}
                        <p className="mt-1 text-[0.95rem] text-[#7c3502]">
                            Analyse GitHub profiles to generate a capability report based on repositories, technologies and development activity.
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}