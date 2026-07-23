export default function AnalysisReport({ analysis, theme }) {

    if (!analysis) return null;

    const isDark = theme === "dark";


    return (

        <section className="float-in w-full max-w-[840px] space-y-4">


            <div className={`rounded-[24px] p-5 border transition duration-300 hover:-translate-y-0.5 ${isDark ? "bg-[#161b22] border-[#30363d] shadow-[0_10px_26px_rgba(0,0,0,0.35)]" : "bg-white border-[#d0d7de] shadow-[0_10px_26px_rgba(31,35,40,0.08)]"}`}>


                <h2 className={`text-[1.6rem] font-bold mb-2 ${isDark ? "text-[#f0f6fc]" : "text-[#24292f]"}`}>

                    Profile Overview

                </h2>



                <p className={`leading-relaxed ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>

                    {analysis.summary}

                </p>


            </div>




<div className={`rounded-3xl shadow-sm p-5 border ${isDark ? "bg-[#0d1117] border-[#30363d]" : "bg-[#f6f8fa] border-[#d0d7de]"}`}>


                <h2 className={`text-[1.1rem] font-bold mb-4 ${isDark ? "text-[#f0f6fc]" : ""}`}>

                    Capability Areas

                </h2>



                <div className="grid md:grid-cols-2 gap-5">


                    {
                        analysis.capabilities?.map((capability) => (

                            <div

                                key={capability.name}

                                className={`rounded-[20px] p-4 border ${isDark ? "bg-[#161b22] border-[#30363d] shadow-[0_5px_14px_rgba(0,0,0,0.25)]" : "bg-white border-[#d0d7de] shadow-[0_5px_14px_rgba(31,35,40,0.08)]"}`}

                            >


                                <div className="flex justify-between mb-3">

                                    <h3 className={`font-semibold ${isDark ? "text-[#f0f6fc]" : ""}`}>

                                        {capability.name}

                                    </h3>


                                    <span className={`font-bold ${isDark ? "text-[#c9d1d9]" : "text-slate-700"}`}>

                                        {capability.score}%

                                    </span>


                                </div>



                                <div className={`rounded-full h-2.5 mb-3 ${isDark ? "bg-[#30363d]" : "bg-[#d8dee4]"}`}>


                                    <div

                                        className="bg-[#0969da] h-2.5 rounded-full"

                                        style={{
                                            width: `${capability.score}%`
                                        }}

                                    />


                                </div>



                                <p className={`text-sm ${isDark ? "text-[#8b949e]" : "text-[#57606a]"}`}>

                                    {capability.reason}

                                </p>


                            </div>

                        ))
                    }


                </div>


            </div>




            <div className="bg-white rounded-[24px] shadow-[0_10px_26px_rgba(31,35,40,0.08)] p-5 border border-[#d0d7de]">


                <h2 className="text-[1.1rem] font-bold mb-4 text-[#24292f]">

                    Key Strengths

                </h2>



                <div className="space-y-2">


                    {
                        analysis.strengths?.map((strength, index) => (

                            <p key={index} className="text-gray-700">

                                {strength}

                            </p>

                        ))
                    }


                </div>


            </div>





            <div className="bg-white rounded-[24px] shadow-[0_10px_26px_rgba(31,35,40,0.08)] p-5 border border-[#d0d7de]">


                <h2 className="text-[1.1rem] font-bold mb-4 text-[#24292f]">

                    Development Recommendations

                </h2>



                <div className="space-y-2">


                    {
                        analysis.recommendations?.map((item, index) => (

                            <p key={index} className="text-gray-700">

                                {item}

                            </p>

                        ))
                    }


                </div>


            </div>


        </section>

    );

}