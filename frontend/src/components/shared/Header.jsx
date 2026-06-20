import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutSuccess } from "@/redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

 const handleSignout = async () => {
  try {

    const res = await fetch("http://https://morning-dispatch.onrender.com/api/user/signout", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    dispatch(signOutSuccess());
    navigate("/sign-in");

  } catch (error) {
    console.log(error.message);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">

        {/* LOGO */}
        <Link to={"/"}>
          <h1 className="font-bold text-xl sm:text-2xl">
            <span className="text-slate-500">Morning </span>
            <span className="text-blue-600">Dispatch</span>
          </h1>
        </Link>

        {/* SEARCH */}
        <form
          className="hidden md:flex p-2 bg-slate-100 rounded-lg items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent w-40 lg:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        {/* NAV LINKS */}
        <ul className="flex gap-6 items-center">

          <Link to={"/"}>
            <li className="hidden lg:inline text-slate-700 hover:text-blue-500 transition">
              Home
            </li>
          </Link>

          <Link to={"/about"}>
            <li className="hidden lg:inline text-slate-700 hover:text-blue-500 transition">
              About
            </li>
          </Link>

          <Link to={"/live-news"}>
            <li className="hidden lg:inline text-red-500 font-semibold animate-pulse">
              🔴 Live
            </li>
          </Link>

          <Link to={"/news"}>
            <li className="hidden lg:inline text-slate-700 hover:text-blue-500 transition">
              Articles
            </li>
          </Link>

          {/* 🔥 CREATE POST BUTTON */}
          {currentUser?.isAdmin && (
            <Link to="/create-post">
              <li className="hidden lg:inline bg-gradient-to-r from-green-400 to-emerald-600 text-white px-4 py-1 rounded-full shadow hover:scale-105 transition">
                + Create
              </li>
            </Link>
          )}

        </ul>

        {/* USER / AUTH */}
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={currentUser.profilePicture}
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span>@{currentUser.username}</span>
                  <span className="text-xs text-gray-500">
                    {currentUser.email}
                  </span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link to="/dashboard?tab=profile">Profile</Link>
              </DropdownMenuItem>

              {/* 🔥 CREATE OPTION IN DROPDOWN */}
              {currentUser?.isAdmin && (
                <DropdownMenuItem>
                  <Link to="/create-post">Create Post</Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={handleSignout}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;