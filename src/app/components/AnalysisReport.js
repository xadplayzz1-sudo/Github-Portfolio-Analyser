export default function AnalysisReport({ analysis }) {

    if (!analysis) return null;


    return (

        <section className="float-in w-full max-w-[840px] space-y-4">


            <div className="bg-[#fff7ec] rounded-[24px] shadow-[0_10px_26px_rgba(125,83,40,0.12)] p-5 border border-[#d9b18b] transition duration-300 hover:-translate-y-0.5">


                <h2 className="text-[1.6rem] font-bold text-gray-800 mb-2">

                    Portfolio Assessment

                </h2>



                <p className="text-gray-600 leading-relaxed">

                    {analysis.summary}

                </p>


            </div>




<div className="bg-[#fff8f0] rounded-3xl shadow-sm p-5 border border-[#ffc971]">


                <h2 className="text-[1.1rem] font-bold mb-4">

                    Capability Areas

                </h2>



                <div className="grid md:grid-cols-2 gap-5">


                    {
                        analysis.capabilities?.map((capability) => (

                            <div

                                key={capability.name}

                                className="bg-[#fffdf9] border border-[#f3c7a5] rounded-[20px] p-4 shadow-[0_5px_14px_rgba(204,88,3,0.10)]"

                            >


                                <div className="flex justify-between mb-3">

                                    <h3 className="font-semibold">

                                        {capability.name}

                                    </h3>


                                    <span className="font-bold text-slate-700">

                                        {capability.score}%

                                    </span>


                                </div>



                                <div className="bg-[#efe4d5] rounded-full h-2.5 mb-3">


                                    <div

                                        className="bg-[#b87a3c] h-2.5 rounded-full"

                                        style={{
                                            width: `${capability.score}%`
                                        }}

                                    />


                                </div>



                                <p className="text-sm text-gray-600">

                                    {capability.reason}

                                </p>


                            </div>

                        ))
                    }


                </div>


            </div>




            <div className="bg-[#fff7ec] rounded-[24px] shadow-[0_10px_26px_rgba(125,83,40,0.12)] p-5 border border-[#d9b18b]">


                <h2 className="text-[1.1rem] font-bold mb-4">

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





            <div className="bg-[#fff7ec] rounded-[24px] shadow-[0_10px_26px_rgba(125,83,40,0.12)] p-5 border border-[#d9b18b]">


                <h2 className="text-[1.1rem] font-bold mb-4">

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