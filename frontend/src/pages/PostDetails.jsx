import Advertise from "@/components/shared/Advertise";
import CommentSection from "@/components/shared/CommentSection";
import PostCard from "@/components/shared/PostCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);

  // 🔥 FETCH POST (API + FALLBACK)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getPost/${postSlug}`);

        if (res.ok) {
          const data = await res.json();
          setPost(data);
          setLoading(false);
          return;
        }

        // fallback
        const allRes = await fetch("/api/post/getposts?limit=1000");
        const allData = await allRes.json();

        const foundPost = allData.posts.find(
          (p) => p._id === postSlug
        );

        setPost(foundPost || null);
        setLoading(false);

      } catch (err) {
        console.log(err);
        setPost(null);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  // 🔹 RECENT POSTS
  useEffect(() => {
    const fetchRecentPosts = async () => {
      const res = await fetch("/api/post/getposts?limit=3");
      const data = await res.json();

      if (res.ok) {
        setRecentArticles(data.posts || []);
      }
    };

    fetchRecentPosts();
  }, []);

  // 🔹 LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-lg animate-pulse">Loading...</h2>
      </div>
    );
  }

  // 🔹 ERROR
  if (!post) {
    return (
      <h2 className="text-center mt-20 text-xl text-red-600">
        Article not found
      </h2>
    );
  }

  // 🔥 CLEAN TEXT (remove HTML safely)
  const cleanText =
    post.content?.replace(/<[^>]+>/g, "").trim() || "";

  // 🔥 DESCRIPTION (ALWAYS SHOW)
  const description =
    cleanText.length > 0
      ? cleanText.slice(0, 150)
      : "This is a news article covering important updates and insights. Stay tuned for full details.";

  // 🔥 READ TIME
  const readTime = Math.ceil(
    (cleanText.length || 200) / 200
  );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">

      {/* TITLE */}
      <h1 className="text-3xl mt-10 text-center font-bold text-slate-800">
        {post.title}
      </h1>

      {/* CATEGORY */}
      {post.category && post.category !== "uncategorized" && (
        <Link
          to={`/search?category=${post.category}`}
          className="self-center mt-5"
        >
          <Button variant="outline">{post.category}</Button>
        </Link>
      )}

      {/* IMAGE */}
      <img
        src={post.image || "https://via.placeholder.com/800x400"}
        alt={post.title}
        className="mt-8 w-full max-h-[500px] object-cover rounded-lg shadow-md"
      />

      {/* 🔥 DESCRIPTION */}
      <p className="text-gray-600 text-center mt-5 max-w-2xl mx-auto text-lg">
        {description}...
      </p>
      

      {/* META */}
      <div className="flex justify-between mt-4 text-sm text-gray-500 max-w-3xl mx-auto w-full">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{readTime} min read</span>
      </div>

      <Separator className="my-5" />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto leading-8 text-gray-800 text-lg space-y-4">
        {cleanText.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        ) : (
          <p className="text-center text-gray-500">
            No detailed content available for this article.
          </p>
        )}
      </div>

      {/* AD */}
      <div className="mt-10">
        <Advertise />
      </div>

      {/* COMMENTS */}
      <CommentSection postId={post._id} />

      {/* RECENT POSTS */}
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">Recent Articles</h2>

        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {recentArticles.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      </div>

    </main>
  );
};

export default PostDetails;