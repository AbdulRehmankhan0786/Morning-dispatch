import Advertise from "@/components/shared/Advertise"
import PostCard from "@/components/shared/PostCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {

  const [posts, setPosts] = useState([])

  // 🔥 DELETE FUNCTION

  const handleDelete = async (postId) => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/post/delete/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )

      const data = await res.json()

      if (res.ok) {

        setPosts((prev) =>
          prev.filter((post) => post._id !== postId)
        )

      } else {

        console.log(data.message)

      }

    } catch (error) {

      console.log(error)

    }
  }

  // 🔥 FETCH POSTS

  useEffect(() => {

    const fetchPosts = async () => {

      const res = await fetch(
        "http://localhost:5000/api/post/getPosts?limit=6"
      )

      const data = await res.json()

      if (res.ok) {

        setPosts(data.posts)

      }

    }

    fetchPosts()

  }, [])

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">

      {/* HERO SECTION */}

      <section className="relative py-28">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#3b82f6,transparent_30%),radial-gradient(circle_at_bottom_left,#9333ea,transparent_30%)] opacity-30"></div>

        <div className="max-w-6xl mx-auto text-center px-4 relative z-10">

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">

            Welcome to{" "}

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

              Morning Dispatch

            </span>

          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-8">

            Stay updated with breaking headlines, global stories,
            technology updates and trending news from around the world.

          </p>

          <Link to={"/search"}>

            <Button className="mt-10 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-10 py-6 rounded-full text-white text-lg flex gap-2 items-center mx-auto shadow-2xl hover:scale-105 transition duration-300">

              Explore News

              <ArrowRight size={20} />

            </Button>

          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-16">

            Why Choose Morning Dispatch

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <Link to="/search?category=headlines">

  <FeatureCard
    title="Latest Headlines"
    description="Stay updated with the most important stories happening around the world."
    icon="📰"
  />

</Link>

<Link to="/search?category=worldnews">

  <FeatureCard
    title="Global Coverage"
    description="Technology, sports, politics, finance and entertainment updates."
    icon="🌍"
  />

</Link>

<Link to="/search?sort=desc">

  <FeatureCard
    title="Fast Updates"
    description="Breaking news delivered quickly with modern digital experience."
    icon="⚡"
  />

</Link>

          </div>

        </div>

      </section>

      {/* ADVERTISE */}

      <div className="max-w-6xl mx-auto px-4 pb-20">

        <Advertise />

      </div>

      {/* POSTS */}

      <section className="max-w-7xl mx-auto px-4 pb-28">

        {posts && posts.length > 0 && (

          <div className="flex flex-col gap-12">

            <div className="flex justify-between items-center">

              <h2 className="text-4xl font-bold">

                Latest News

              </h2>

              <Link
                to={"/search"}
                className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-2"
              >

                View all

                <ArrowRight size={20} />

              </Link>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

              {posts.map((post) => (

                <PostCard
                  key={post._id}
                  post={post}
                  onDelete={handleDelete}
                />

              ))}

            </div>

          </div>

        )}

      </section>

    </div>

  )
}

// 🔥 FEATURE CARD

const FeatureCard = ({ title, description, icon }) => {

  return (

    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-10 shadow-2xl hover:-translate-y-3 hover:shadow-cyan-500/20 transition duration-500">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/20 opacity-0 hover:opacity-100 transition duration-500"></div>

      <div className="relative z-10">

        <div className="text-6xl mb-6">
          {icon}
        </div>

        <h3 className="text-2xl font-bold mb-4">
          {title}
        </h3>

        <p className="text-gray-300 leading-7">
          {description}
        </p>

      </div>

    </div>

  )
}

export default Home