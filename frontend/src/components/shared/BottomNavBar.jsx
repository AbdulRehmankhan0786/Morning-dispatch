import { signOutSuccess } from "@/redux/user/userSlice";
import React from "react";
import { FaHome, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { IoIosCreate, IoIosDocument } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // ✅ FIXED (IMPORTANT)
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      if (res.ok) {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
   <nav className="md:hidden fixed bottom-0 left-0 w-full z-50">

      {/* HOME */}
      <Link
        to="/"
        className={`flex flex-col items-center ${
          isActive("/") ? "text-blue-400" : "text-gray-300"
        }`}
      >
        <FaHome size={20} />
        <span className="text-xs">Home</span>
      </Link>

      {/* PROFILE */}
      <Link
        to="/dashboard?tab=profile"
        className="flex flex-col items-center text-gray-300"
      >
        <FaUserAlt size={20} />
        <span className="text-xs">Profile</span>
      </Link>

      {/* 🔥 CREATE POST (ADMIN ONLY) */}
      {currentUser?.isAdmin && (
        <Link
          to="/create-post"
          className="flex flex-col items-center text-green-400"
        >
          <IoIosCreate size={20} />
          <span className="text-xs">Create</span>
        </Link>
      )}

      {/* POSTS */}
      {currentUser?.isAdmin && (
        <Link
          to="/dashboard?tab=posts"
          className="flex flex-col items-center text-purple-400"
        >
          <IoIosDocument size={20} />
          <span className="text-xs">Posts</span>
        </Link>
      )}

      {/* LOGOUT */}
      <button
        onClick={handleSignout}
        className="flex flex-col items-center text-red-400"
      >
        <FaSignOutAlt size={20} />
        <span className="text-xs">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;