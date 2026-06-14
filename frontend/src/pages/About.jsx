import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

      {/* HERO SECTION */}

      <div className="relative py-24 px-6">

        {/* GLOW EFFECT */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#06b6d4,transparent_30%),radial-gradient(circle_at_bottom_left,#7c3aed,transparent_30%)] opacity-30"></div>

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

            {/* LEFT */}

            <div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">

                About{" "}

                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

                  Morning Dispatch

                </span>

              </h1>

              <p className="text-gray-300 text-lg leading-9">

                We are a passionate team committed to driving change through
                innovation and collaboration. Our platform is designed to empower
                individuals and organizations to unlock their true potential.

                Morning Dispatch provides trending news, technology updates,
                global headlines and modern digital journalism in one beautiful platform.

              </p>

              <button className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold shadow-2xl hover:scale-105 transition duration-300">

                Explore Articles

              </button>

            </div>

            {/* RIGHT IMAGE */}

            <div className="relative">

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-3xl opacity-30 rounded-full"></div>

              <img
                src="https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="relative rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:scale-105 transition duration-500"
              />

            </div>

          </div>

        </div>

      </div>

      {/* FEATURES SECTION */}

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">

          Why Choose Us

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* CARD 1 */}

          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-4 hover:shadow-cyan-500/20 transition duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <div className="text-6xl mb-6">📰</div>

              <h3 className="text-2xl font-bold mb-4">
                Latest News
              </h3>

              <p className="text-gray-300 leading-8">
                Stay updated with trending stories and breaking headlines from around the world.
              </p>

            </div>

          </div>

          {/* CARD 2 */}

          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-4 hover:shadow-blue-500/20 transition duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <div className="text-6xl mb-6">🌍</div>

              <h3 className="text-2xl font-bold mb-4">
                Global Coverage
              </h3>

              <p className="text-gray-300 leading-8">
                Technology, politics, sports and entertainment updates all in one place.
              </p>

            </div>

          </div>

          {/* CARD 3 */}

          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-4 hover:shadow-purple-500/20 transition duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <div className="text-6xl mb-6">⚡</div>

              <h3 className="text-2xl font-bold mb-4">
                Fast Updates
              </h3>

              <p className="text-gray-300 leading-8">
                Experience lightning-fast updates with smooth modern digital design.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* TEAM SECTION */}

      <div className="w-full py-24 px-6 bg-white/5 backdrop-blur-xl border-t border-white/10">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">

          Meet Our Team

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          {/* MEMBER 1 */}

          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-4 transition duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <img
                src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                alt="Team member"
                className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-cyan-500 shadow-xl"
              />

              <h3 className="text-2xl font-bold">
                Abdul Rehman Khan
              </h3>

              <p className="text-cyan-400 mt-3 text-lg">
                CEO & Founder
              </p>

            </div>

          </div>

          {/* MEMBER 2 */}

          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-4 transition duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                alt="Team member"
                className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-xl"
              />

              <h3 className="text-2xl font-bold">
                Abdul Basit Khan
              </h3>

              <p className="text-blue-400 mt-3 text-lg">
                CTO
              </p>

            </div>

          </div>

          {/* MEMBER 3 */}

          <div className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-4 transition duration-500">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            <div className="relative z-10">

              <img
                src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                alt="Team member"
                className="w-36 h-36 rounded-full mx-auto mb-6 border-4 border-purple-500 shadow-xl"
              />

              <h3 className="text-2xl font-bold">
                Mohd Sameer
              </h3>

              <p className="text-purple-400 mt-3 text-lg">
                Lead Designer
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;