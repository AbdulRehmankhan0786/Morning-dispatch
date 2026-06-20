import PostCard from "@/components/shared/PostCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  })

  //   console.log(sidebarData)

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMore, setShowMore] = useState(false)

  console.log(posts)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get("searchTerm")
    const sortFromUrl = urlParams.get("sort")
    const categoryFromUrl = urlParams.get("category")

    console.log(searchTermFromUrl)

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "",
        category: categoryFromUrl || "",
      })
    }

    const fetchPosts = async () => {
      setLoading(true)

      const searchQuery = urlParams.toString()

      const res = await fetch(`https://morning-dispatch.onrender.com/api/post/getposts?${searchQuery}`)

      if (!res.ok) {
        setLoading(false)
        return
      }

      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts)
        setLoading(false)

        if (data.posts.length === 9) {
          setShowMore(true)
        } else {
          setShowMore(false)
        }
      }
    }

    fetchPosts()
  }, [location.search])

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const urlParams = new URLSearchParams(location.search)

    urlParams.set("searchTerm", sidebarData.searchTerm)
    urlParams.set("sort", sidebarData.sort)
    urlParams.set("category", sidebarData.category)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length
    const startIndex = numberOfPosts
    const urlParams = new URLSearchParams(location.search)

    urlParams.set("startIndex", startIndex)

    const searchQuery = urlParams.toString()

 const res = await fetch(`https://morning-dispatch.onrender.com/api/post/getposts?${searchQuery}`)


    if (!res.ok) {
      return
    }

    if (res.ok) {
      const data = await res.json()

      setPosts([...posts, ...data.posts])

      if (data.posts.length === 9) {
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-[320px] p-5">

  <div className="sticky top-24 rounded-3xl overflow-hidden bg-white shadow-2xl border border-gray-200">

    {/* HEADER */}

    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">

      <h2 className="text-3xl font-bold">
        Filter News
      </h2>

      <p className="text-sm text-white/80 mt-2">
        Search and explore trending articles
      </p>

    </div>

    {/* FORM */}

    <form
      className="p-6 flex flex-col gap-6"
      onSubmit={handleSubmit}
    >

      {/* SEARCH */}

      <div className="flex flex-col gap-2">

        <label className="font-semibold text-gray-700">
          Search Article
        </label>

        <Input
          placeholder="Search latest news..."
          id="searchTerm"
          type="text"
          value={sidebarData.searchTerm}
          onChange={handleChange}
          className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-6 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition"
        />

      </div>

      {/* SORT */}

      <div className="flex flex-col gap-2">

        <label className="font-semibold text-gray-700">
          Sort By
        </label>

        <Select
          onValueChange={(value) =>
            setSidebarData({ ...sidebarData, sort: value })
          }
          value={sidebarData.sort}
        >

          <SelectTrigger className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-6 shadow-sm focus:ring-4 focus:ring-blue-200">

            <SelectValue placeholder="Select Order" />

          </SelectTrigger>

          <SelectContent>

            <SelectGroup>

              <SelectLabel>
                Order
              </SelectLabel>

              <SelectItem value="desc">
                Latest
              </SelectItem>

              <SelectItem value="asc">
                Oldest
              </SelectItem>

            </SelectGroup>

          </SelectContent>

        </Select>

      </div>

      {/* CATEGORY */}

      <div className="flex flex-col gap-2">

        <label className="font-semibold text-gray-700">
          Category
        </label>

        <Select
          onValueChange={(value) =>
            setSidebarData({ ...sidebarData, category: value })
          }
          value={sidebarData.category}
        >

          <SelectTrigger className="w-full rounded-2xl border border-gray-300 bg-gray-50 py-6 shadow-sm focus:ring-4 focus:ring-blue-200">

            <SelectValue placeholder="Select Category" />

          </SelectTrigger>

          <SelectContent>

            <SelectGroup>

              <SelectLabel>
                Categories
              </SelectLabel>

              <SelectItem value="worldnews">
                🌍 World News
              </SelectItem>

              <SelectItem value="sportsnews">
                ⚽ Sports News
              </SelectItem>

              <SelectItem value="localnews">
                📍 Local News
              </SelectItem>

            </SelectGroup>

          </SelectContent>

        </Select>

      </div>

      {/* BUTTON */}

      <Button
        type="submit"
        className="mt-2 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-6 text-lg font-semibold text-white shadow-xl hover:scale-105 hover:shadow-blue-400/40 transition duration-300"
      >

        Apply Filters

      </Button>

    </form>

  </div>

</aside>

      <div className="w-full">
        <h1 className="text-3xl font-bold text-white p-5 mt-5">
          News Articles:
        </h1>

        <Separator className="bg-slate-300" />

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-white">No posts found.</p>
          )}

          {loading && (
            <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
          )}

          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-grey text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
