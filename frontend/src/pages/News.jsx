import React, { useEffect, useState } from "react"
import PostCard from "@/components/shared/PostCard"

const News = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/post/getposts"
        )

        const data = await res.json()

        if (res.ok) {

          setPosts(data.posts)

        }

      } catch (error) {

        console.log(error)

      }

    }

    fetchPosts()

  }, [])

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-14">

          <h1 className="text-5xl font-bold text-white">

            Latest News Articles

          </h1>

          <p className="text-gray-300 mt-4 text-lg">

            Explore trending stories from around the world

          </p>

        </div>

        {/* POSTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {posts.map((post) => (

            <PostCard
              key={post._id}
              post={post}
            />

          ))}

        </div>

      </div>

    </div>

  )
}

export default News