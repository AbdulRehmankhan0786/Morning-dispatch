import React, { useState } from "react";

const CreatePost = () => {

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "https://morning-dispatch.onrender.com/api/post/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {

        setMessage("✅ Post Created Successfully!");

        setFormData({
          title: "",
          category: "",
          image: "",
          content: "",
        });

      } else {

        setMessage(data.message || "❌ Failed");

      }

    } catch (error) {

      console.log(error);

      setMessage("❌ Server Error");

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-5 py-10">

      {/* MAIN CARD */}

      <div className="relative w-full max-w-3xl overflow-hidden rounded-[35px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_25px_80px_rgba(59,130,246,0.35)]">

        {/* GLOW EFFECT */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/20"></div>

        {/* HEADER */}

        <div className="relative z-10 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-7">

          <h2 className="text-4xl font-extrabold text-white drop-shadow-xl">

            🚀 Create News Article

          </h2>

          <p className="mt-2 text-white/80 text-sm">

            Publish trending and breaking news instantly

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="relative z-10 p-8 flex flex-col gap-6"
        >

          {/* TITLE */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold tracking-wide">

              News Title

            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter trending news title..."
              onChange={handleChange}
              value={formData.title}
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-gray-300 outline-none backdrop-blur-xl shadow-lg focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/30 transition"
              required
            />

          </div>

          {/* CATEGORY */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold tracking-wide">

              News Category

            </label>

            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
              className="rounded-2xl border border-white/20 bg-slate-900/70 px-5 py-4 text-white outline-none shadow-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-500/30 transition"
            >

              <option value="">
                Select Category
              </option>

              <option value="worldnews">
                🌍 World News
              </option>

              <option value="sportsnews">
                ⚽ Sports News
              </option>

              <option value="localnews">
                📍 Local News
              </option>

            </select>

          </div>

          {/* IMAGE */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold tracking-wide">

              Image URL

            </label>

            <input
              type="text"
              name="image"
              placeholder="Paste image URL (optional)"
              onChange={handleChange}
              value={formData.image}
              className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-gray-300 outline-none backdrop-blur-xl shadow-lg focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 transition"
            />

          </div>

          {/* CONTENT */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold tracking-wide">

              Article Content

            </label>

            <textarea
              name="content"
              placeholder="Write full news article..."
              onChange={handleChange}
              value={formData.content}
              className="h-44 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-gray-300 outline-none backdrop-blur-xl shadow-lg focus:border-pink-400 focus:ring-4 focus:ring-pink-500/30 transition resize-none"
            ></textarea>

          </div>

          {/* BUTTON */}

          <button
            className="mt-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-4 text-lg font-bold text-white shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:scale-105 hover:shadow-[0_15px_50px_rgba(139,92,246,0.7)] transition duration-300"
          >

            🔥 Publish News

          </button>

          {/* MESSAGE */}

          {message && (

            <div className="mt-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center text-white shadow-lg backdrop-blur-xl">

              {message}

            </div>

          )}

        </form>

      </div>

    </div>
  );
};

export default CreatePost;