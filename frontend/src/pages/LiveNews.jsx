import React, { useEffect, useState } from "react";

const LiveNews = () => {

  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  //  Image logic
  const getImage = (title = "", index = 0) => {
  const lower = title.toLowerCase();

  // unique seed (har card alag)
  const seed = index + 1;

  if (lower.includes("tech") || lower.includes("ai")) {
    return `https://picsum.photos/seed/tech${seed}/600/400`;
  }

  if (lower.includes("cricket") || lower.includes("sports") || lower.includes("ipl")) {
    return `https://picsum.photos/seed/sports${seed}/600/400`;
  }

  if (lower.includes("politics") || lower.includes("bjp")) {
    return `https://picsum.photos/seed/politics${seed}/600/400`;
  }

  if (lower.includes("business") || lower.includes("market")) {
    return `https://picsum.photos/seed/business${seed}/600/400`;
  }

  if (lower.includes("crime") || lower.includes("police")) {
    return `https://picsum.photos/seed/crime${seed}/600/400`;
  }

  // default
  return `https://picsum.photos/seed/news${seed}/600/400`;
};
  // 🔥 Fetch news
  useEffect(() => {

    const fetchNews = async () => {
      try {

        const urls = [
          "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
          "https://feeds.bbci.co.uk/news/rss.xml",
          "https://feeds.feedburner.com/ndtvnews-top-stories"
        ];

        let allNews = [];

        for (let url of urls) {
          const res = await fetch(
            `https://api.rss2json.com/v1/api.json?rss_url=${url}`
          );

          const data = await res.json();

          if (data.items) {
            allNews = [...allNews, ...data.items];
          }
        }

        setNews(allNews);
        setFilteredNews(allNews);
        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchNews();

  }, []);

  // 🔥 Filter logic
  useEffect(() => {

    let temp = news;

    // search filter
    if (search) {
      temp = temp.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (category !== "all") {
      temp = temp.filter((item) =>
        item.title.toLowerCase().includes(category)
      );
    }

    setFilteredNews(temp);

  }, [search, category, news]);

  return (

  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white px-6 py-10">

    {/* HEADER */}

    <div className="text-center mb-14">

      <div className="inline-block px-5 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-semibold tracking-widest uppercase shadow-lg animate-pulse">

        🔴 Live Breaking News

      </div>

      <h1 className="mt-6 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">

        Global Live Updates

      </h1>

      <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
        Stay updated with the latest breaking headlines from around the world.
      </p>

    </div>

    {/* FILTER BAR */}

    <div className="max-w-6xl mx-auto mb-12">

      <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl p-5 shadow-[0_20px_80px_rgba(59,130,246,0.25)] flex flex-col md:flex-row gap-5">

        {/* SEARCH */}

        <input
          type="text"
          placeholder="🔍 Search breaking news..."
          className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white placeholder:text-gray-400 outline-none focus:ring-4 focus:ring-blue-500/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY */}

        <select
          className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white outline-none focus:ring-4 focus:ring-purple-500/30"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option value="all">🌍 All News</option>
          <option value="tech">💻 Tech</option>
          <option value="cricket">🏏 Sports</option>
          <option value="politics">🏛 Politics</option>
          <option value="business">💰 Business</option>

        </select>

      </div>

    </div>

    {/* LOADING */}

    {loading && (

      <div className="flex justify-center py-20">

        <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

      </div>

    )}

    {/* NEWS GRID */}

    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

      {filteredNews.map((item, index) => (

        <div
          key={index}
          className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-3 hover:shadow-blue-500/30 transition duration-500"
        >

          {/* IMAGE */}

          <div className="overflow-hidden h-[240px]">

            <img
              src={getImage(item.title, index)}
              alt="news"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />

          </div>

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

          {/* CONTENT */}

          <div className="relative z-10 p-5 flex flex-col gap-4">

            {/* CATEGORY */}

            <div className="flex justify-between items-center">

              <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20">

                LIVE

              </span>

              <span className="text-xs text-gray-300">

                {new Date(item.pubDate).toLocaleDateString()}

              </span>

            </div>

            {/* TITLE */}

            <h2 className="text-2xl font-bold leading-snug line-clamp-2 group-hover:text-cyan-400 transition">

              {item.title}

            </h2>

            {/* DESCRIPTION */}

            <p className="text-gray-300 text-sm line-clamp-3">

              {item.description
                ?.replace(/<[^>]*>/g, "")
                ?.slice(0, 120)}...

            </p>

            {/* BUTTON */}

            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="mt-2"
            >

              <button className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-blue-500/40 transition duration-300">

                Read Full News →

              </button>

            </a>

          </div>

        </div>

      ))}

    </div>

  </div>
)
};

export default LiveNews;