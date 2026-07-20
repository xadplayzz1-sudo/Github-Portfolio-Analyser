export default function ProfileCard({ profile }) {

    if (!profile) return null;


    return (

        <section className="mx-6 mb-6">


            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-purple-100">


                <div className="flex flex-col md:flex-row gap-6 items-center">


                    <img

                        src={profile.avatar_url}

                        alt="GitHub profile"

                        className="w-32 h-32 rounded-full border-4 border-purple-200"

                    />



                    <div className="flex-1 text-center md:text-left">


                        <h2 className="text-3xl font-bold text-gray-800">

                            {profile.name || profile.login}

                        </h2>



                        <p className="text-purple-600 font-medium">

                            @{profile.login}

                        </p>



                        <p className="mt-3 text-gray-600">

                            {profile.bio || "No biography provided."}

                        </p>



                        {
                            profile.location && (

                                <p className="mt-3 text-gray-500">

                                    {profile.location}

                                </p>

                            )
                        }


                    </div>


                </div>




                <div className="grid grid-cols-3 gap-4 mt-8">


                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">

                        <p className="text-2xl font-bold text-purple-700">

                            {profile.public_repos}

                        </p>

                        <p className="text-sm text-gray-600">

                            Repositories

                        </p>

                    </div>



                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">

                        <p className="text-2xl font-bold text-blue-700">

                            {profile.followers}

                        </p>

                        <p className="text-sm text-gray-600">

                            Followers

                        </p>

                    </div>



                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 text-center">

                        <p className="text-2xl font-bold text-orange-700">

                            {profile.following}

                        </p>

                        <p className="text-sm text-gray-600">

                            Following

                        </p>

                    </div>


                </div>


            </div>


        </section>

    );

}