import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Post = () => {

  const { postId } = useParams()

  const [post, setPost] = useState(null)

  useEffect(() => {

    const fetchPost = async () => {

      try {

        const res = await fetch(
          `https://morning-dispatch.onrender.com/api/post/getpost/${postId}`
        )

        const data = await res.json()

        if (res.ok) {

          setPost(data)

        }

      } catch (error) {

        console.log(error)

      }

    }

    fetchPost()

  }, [postId])

  if (!post) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-3xl">
        Loading...
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">

        {/* IMAGE */}

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[500px] object-cover"
        />

        {/* CONTENT */}

        <div className="p-8 md:p-12">

          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-full text-sm font-semibold uppercase">

            {post.category}

          </span>

          <h1 className="text-5xl font-bold mt-6">

            {post.title}

          </h1>

          <p className="text-gray-300 mt-4">

            {new Date(post.createdAt).toLocaleDateString()}

          </p>

          <div
            className="mt-10 text-lg leading-9 text-gray-200"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>

          {/* COMMENTS SECTION */}

          <div className="mt-16 border-t border-white/10 pt-10">

            <h2 className="text-3xl font-bold mb-6">

              Comments

            </h2>

            <textarea
              placeholder="Write your comment..."
              className="w-full rounded-2xl bg-white/10 border border-white/20 p-5 text-white outline-none"
              rows={5}
            ></textarea>

            <button
              className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold"
            >

              Post Comment

            </button>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Post