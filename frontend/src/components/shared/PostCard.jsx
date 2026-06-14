import React from "react"
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"

const PostCard = ({ post, onDelete }) => {

  if (!post || !post._id) {
    return null
  }

  return (

    <div className="group relative w-full sm:w-[350px] overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-3 hover:shadow-cyan-500/30">

      {/* GLOW EFFECT */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* IMAGE */}

      <Link
        to={`/post/${post._id}`}
        className="block overflow-hidden h-[230px]"
      >

        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

      </Link>

      {/* CONTENT */}

      <div className="relative z-10 p-5 flex flex-col gap-4">

        {/* CATEGORY */}

        <span className="w-fit rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">

          {post.category}

        </span>

        {/* TITLE */}

        <h2 className="text-2xl font-bold leading-snug line-clamp-2 text-slate-900 group-hover:text-blue-600 transition duration-300">

          {post.title}

        </h2>

        {/* DATE */}

        <p className="text-sm text-gray-500">

          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "Latest News"}

        </p>

        {/* SHORT DESCRIPTION */}

        <p className="text-gray-600 line-clamp-2 leading-7">

          {post.content
            ?.replace(/<[^>]*>?/gm, "")
            .slice(0, 120)}...

        </p>

        {/* BUTTONS */}

        <div className="mt-3 flex items-center gap-3">

          {/* READ BUTTON */}

          <Link
            to={`/post/${post._id}`}
            className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-5 py-3 text-center font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-cyan-500/40"
          >

            Read Article

          </Link>

          {/* DELETE BUTTON */}

          <button
            onClick={() => onDelete(post._id)}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 p-3 text-white shadow-lg transition duration-300 hover:scale-110 hover:shadow-red-500/40"
          >

            <MdDelete size={24} />

          </button>

        </div>

      </div>

    </div>

  )
}

export default PostCard