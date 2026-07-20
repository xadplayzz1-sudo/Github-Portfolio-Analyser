export default function AnalysisReport({ analysis }) {

    if (!analysis) return null;


    return (

        <section className="mx-6 mb-10 space-y-6">


            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-orange-100">


                <h2 className="text-2xl font-bold text-gray-800 mb-3">

                    AI Capability Intelligence Report

                </h2>



                <p className="text-gray-600 leading-relaxed">

                    {analysis.summary}

                </p>


            </div>




            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-purple-100">


                <h2 className="text-xl font-bold mb-5">

                    Capability Areas

                </h2>



                <div className="grid md:grid-cols-2 gap-5">


                    {
                        analysis.capabilities?.map((capability) => (

                            <div

                                key={capability.name}

                                className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-5"

                            >


                                <div className="flex justify-between mb-3">

                                    <h3 className="font-semibold">

                                        {capability.name}

                                    </h3>


                                    <span className="font-bold text-purple-700">

                                        {capability.score}%

                                    </span>


                                </div>



                                <div className="bg-gray-200 rounded-full h-3 mb-3">


                                    <div

                                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 h-3 rounded-full"

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




            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-green-100">


                <h2 className="text-xl font-bold mb-4">

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





            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-blue-100">


                <h2 className="text-xl font-bold mb-4">

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