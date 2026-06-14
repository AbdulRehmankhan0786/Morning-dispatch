import BottomNavBar from "@/components/shared/BottomNavBar"
import DashboardComments from "@/components/shared/DashboardComments"
import DashboardPosts from "@/components/shared/DashboardPosts "
import DashboardProfile from "@/components/shared/DashboardProfile"
import DashboardSidebar from "@/components/shared/DashboardSidebar"
import DashboardUsers from "@/components/shared/DashboardUsers"
import MainDashboard from "@/components/shared/MainDashboard"

import React, { useEffect, useState } from "react"

import { useLocation } from "react-router-dom"

const Dashboard = () => {

  const location = useLocation()

  const [tab, setTab] = useState("")

  useEffect(() => {

    const urlParams = new URLSearchParams(
      location.search
    )

    const tabFromUrl =
      urlParams.get("tab")

    if (tabFromUrl) {

      setTab(tabFromUrl)

    }

  }, [location.search])

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden">

      {/* SIDEBAR */}

      <div className="hidden md:block sticky top-0 h-screen z-50">

        <DashboardSidebar />

      </div>

      {/* MOBILE BOTTOM NAV */}

      <BottomNavBar />

      {/* MAIN CONTENT */}

      <div className="flex-1 overflow-y-auto">

        {/* PROFILE */}

        {tab === "profile" && (
          <DashboardProfile />
        )}

        {/* POSTS */}

        {tab === "posts" && (
          <DashboardPosts />
        )}

        {/* USERS */}

        {tab === "users" && (
          <DashboardUsers />
        )}

        {/* COMMENTS */}

        {tab === "comments" && (
          <DashboardComments />
        )}

        {/* DASHBOARD */}

        {tab === "dashboard" && (
          <MainDashboard />
        )}

      </div>

    </div>
  )
}

export default Dashboard