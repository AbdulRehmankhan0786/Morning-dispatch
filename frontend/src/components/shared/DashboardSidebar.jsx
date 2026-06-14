import { signOutSuccess } from "@/redux/user/userSlice"
import React from "react"
import {
  FaComments,
  FaSignOutAlt,
  FaUserAlt,
  FaUsers,
} from "react-icons/fa"

import { useDispatch, useSelector } from "react-redux"

import {
  Link,
  useNavigate,
} from "react-router-dom"

import {
  IoIosCreate,
  IoIosDocument,
} from "react-icons/io"

import { MdDashboardCustomize } from "react-icons/md"

const DashboardSidebar = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { currentUser } =
    useSelector((state) => state.user)

  // SIGN OUT

  const handleSignout = async () => {

    try {

      const res = await fetch(
        "/api/user/signout",
        {
          method: "POST",
        }
      )

      const data = await res.json()

      if (!res.ok) {

        console.log(data.message)

      } else {

        dispatch(signOutSuccess())

        // REDIRECT TO SIGN IN

        navigate("/sign-in")

      }

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <aside className="h-screen w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white flex flex-col border-r border-white/10 shadow-2xl">

      {/* HEADER */}

      <div className="p-6 flex items-center justify-center border-b border-white/10">

        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">

          Dashboard

        </h1>

      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 p-5">

        <ul className="space-y-4">

          {/* DASHBOARD */}

          {currentUser &&
            currentUser.isAdmin && (

            <li>

              <Link
                to={"/dashboard?tab=dashboard"}
                className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition duration-300 shadow-lg"
              >

                <MdDashboardCustomize size={22} />

                <span className="font-medium text-lg">

                  Dashboard

                </span>

              </Link>

            </li>

          )}

          {/* PROFILE */}

          <li>

            <Link
              to={"/dashboard?tab=profile"}
              className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition duration-300 shadow-lg"
            >

              <FaUserAlt size={20} />

              <span className="font-medium text-lg">

                Profile

              </span>

            </Link>

          </li>

          {/* CREATE POST */}

          {currentUser &&
            currentUser.isAdmin && (

            <li>

              <Link
                to={"/create-post"}
                className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 transition duration-300 shadow-lg"
              >

                <IoIosCreate size={24} />

                <span className="font-medium text-lg">

                  Create Post

                </span>

              </Link>

            </li>

          )}

          {/* POSTS */}

          {currentUser &&
            currentUser.isAdmin && (

            <li>

              <Link
                to={"/dashboard?tab=posts"}
                className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 transition duration-300 shadow-lg"
              >

                <IoIosDocument size={24} />

                <span className="font-medium text-lg">

                  Your Articles

                </span>

              </Link>

            </li>

          )}

          {/* USERS */}

          {currentUser &&
            currentUser.isAdmin && (

            <li>

              <Link
                to={"/dashboard?tab=users"}
                className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 transition duration-300 shadow-lg"
              >

                <FaUsers size={20} />

                <span className="font-medium text-lg">

                  All Users

                </span>

              </Link>

            </li>

          )}

          {/* COMMENTS */}

          {currentUser &&
            currentUser.isAdmin && (

            <li>

              <Link
                to={"/dashboard?tab=comments"}
                className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-600 transition duration-300 shadow-lg"
              >

                <FaComments size={20} />

                <span className="font-medium text-lg">

                  All Comments

                </span>

              </Link>

            </li>

          )}

        </ul>

      </nav>

      {/* LOGOUT */}

      <div className="p-5 border-t border-white/10">

        <button
          onClick={handleSignout}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 px-5 py-4 text-lg font-semibold text-white shadow-2xl hover:scale-105 transition duration-300"
        >

          <FaSignOutAlt size={20} />

          Logout

        </button>

      </div>

    </aside>

  )
}

export default DashboardSidebar