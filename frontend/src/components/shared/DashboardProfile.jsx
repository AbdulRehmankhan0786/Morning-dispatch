import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "@/redux/user/userSlice"

import {
  getFilePreview,
  uploadFile,
} from "@/lib/appwrite/uploadImage"

import { useToast } from "@/hooks/use-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

const DashboardProfile = () => {

  const {
    currentUser,
    error,
    loading,
  } = useSelector((state) => state.user)

  const profilePicRef = useRef()

  const dispatch = useDispatch()

  const { toast } = useToast()

  const [imageFile, setImageFile] = useState(null)

  const [imageFileUrl, setImageFileUrl] =
    useState(null)

  const [formData, setFormData] = useState({})

  // IMAGE CHANGE

  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if (file) {

      setImageFile(file)

      setImageFileUrl(
        URL.createObjectURL(file)
      )
    }
  }

  // INPUT CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // UPLOAD IMAGE

  const uploadImage = async () => {

    if (!imageFile)
      return currentUser.profilePicture

    try {

      const uploadedFile =
        await uploadFile(imageFile)

      const profilePictureUrl =
        getFilePreview(uploadedFile.$id)

      return profilePictureUrl

    } catch (error) {

      toast({
        title:
          "Image upload failed. Please try again!",
      })

      console.log(error)
    }
  }

  // UPDATE PROFILE

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      dispatch(updateStart())

      const profilePicture =
        await uploadImage()

      const updateProfile = {
        ...formData,
        profilePicture,
      }

      const res = await fetch(
        `/api/user/update/${currentUser._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            updateProfile
          ),
        }
      )

      const data = await res.json()

      if (data.success === false) {

        toast({
          title:
            "Update failed. Please try again!",
        })

        dispatch(
          updateFailure(data.message)
        )

      } else {

        dispatch(updateSuccess(data))

        toast({
          title:
            "✅ Profile updated successfully.",
        })
      }

    } catch (error) {

      dispatch(
        updateFailure(error.message)
      )

      toast({
        title:
          "Something went wrong!",
      })
    }
  }

  // DELETE USER

  const handleDeleteUser = async () => {

    try {

      dispatch(deleteUserStart())

      const res = await fetch(
        `/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      )

      const data = await res.json()

      if (!res.ok) {

        dispatch(
          deleteUserFailure(data.message)
        )

      } else {

        dispatch(deleteUserSuccess())
      }

    } catch (error) {

      dispatch(
        deleteUserFailure(error.message)
      )
    }
  }

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
      }

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-5 py-10">

      {/* MAIN CARD */}

      <div className="relative w-full max-w-2xl overflow-hidden rounded-[35px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_25px_80px_rgba(59,130,246,0.35)]">

        {/* GLOW */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/20"></div>

        {/* HEADER */}

        <div className="relative z-10 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-7">

          <h1 className="text-4xl font-extrabold text-white drop-shadow-xl">

            ⚡ Update Profile

          </h1>

          <p className="mt-2 text-white/80 text-sm">

            Customize your profile settings

          </p>

        </div>

        {/* FORM */}

        <form
          className="relative z-10 p-8 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >

          {/* IMAGE */}

          <input
            type="file"
            accept="image/*"
            hidden
            ref={profilePicRef}
            onChange={handleImageChange}
          />

          <div
            className="relative w-40 h-40 self-center cursor-pointer group"
            onClick={() =>
              profilePicRef.current.click()
            }
          >

            {/* GLOW RING */}

            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 blur-xl opacity-70 group-hover:scale-110 transition duration-500"></div>

            {/* IMAGE */}

            <img
              src={
                imageFileUrl ||
                currentUser.profilePicture
              }
              alt=""
              className="relative z-10 rounded-full w-full h-full object-cover border-[6px] border-white/20 shadow-2xl group-hover:scale-105 transition duration-500"
            />

          </div>

          {/* USERNAME */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">

              Username

            </label>

            <Input
              type="text"
              id="username"
              placeholder="username"
              defaultValue={
                currentUser.username
              }
              className="h-14 rounded-2xl border border-white/20 bg-white/10 px-5 text-white placeholder:text-gray-300 backdrop-blur-xl shadow-lg focus-visible:ring-4 focus-visible:ring-cyan-500/30"
              onChange={handleChange}
            />

          </div>

          {/* EMAIL */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">

              Email

            </label>

            <Input
              type="email"
              id="email"
              placeholder="email"
              defaultValue={
                currentUser.email
              }
              className="h-14 rounded-2xl border border-white/20 bg-white/10 px-5 text-white placeholder:text-gray-300 backdrop-blur-xl shadow-lg focus-visible:ring-4 focus-visible:ring-blue-500/30"
              onChange={handleChange}
            />

          </div>

          {/* PASSWORD */}

          <div className="flex flex-col gap-2">

            <label className="text-white font-semibold">

              Password

            </label>

            <Input
              type="password"
              id="password"
              placeholder="Enter new password"
              className="h-14 rounded-2xl border border-white/20 bg-white/10 px-5 text-white placeholder:text-gray-300 backdrop-blur-xl shadow-lg focus-visible:ring-4 focus-visible:ring-purple-500/30"
              onChange={handleChange}
            />

          </div>

          {/* UPDATE BUTTON */}

          <Button
            type="submit"
            disabled={loading}
            className="mt-3 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-lg font-bold text-white shadow-[0_10px_40px_rgba(59,130,246,0.5)] hover:scale-105 hover:shadow-[0_15px_50px_rgba(139,92,246,0.7)] transition duration-300"
          >

            {loading
              ? "Updating..."
              : "🚀 Update Profile"}

          </Button>

        </form>

        {/* ACTIONS */}

        <div className="relative z-10 flex justify-between items-center px-8 pb-8">

          {/* DELETE */}

          <AlertDialog>

            <AlertDialogTrigger asChild>

              <Button
                variant="ghost"
                className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-3 text-red-400 hover:bg-red-500/20 hover:text-white transition"
              >

                🗑 Delete Account

              </Button>

            </AlertDialogTrigger>

            <AlertDialogContent className="bg-slate-900 border border-white/10 text-white">

              <AlertDialogHeader>

                <AlertDialogTitle>

                  Are you absolutely sure?

                </AlertDialogTitle>

                <AlertDialogDescription className="text-gray-400">

                  This action cannot be
                  undone. Your account
                  and data will be
                  permanently deleted.

                </AlertDialogDescription>

              </AlertDialogHeader>

              <AlertDialogFooter>

                <AlertDialogCancel className="bg-gray-700 text-white border-none">

                  Cancel

                </AlertDialogCancel>

                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={
                    handleDeleteUser
                  }
                >

                  Continue

                </AlertDialogAction>

              </AlertDialogFooter>

            </AlertDialogContent>

          </AlertDialog>

          {/* SIGN OUT */}

          <Button
            variant="ghost"
            onClick={handleSignout}
            className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-cyan-400 hover:bg-cyan-500/20 hover:text-white transition"
          >

            🚪 Sign Out

          </Button>

        </div>

        {/* ERROR */}

        {error && (

          <div className="px-8 pb-8">

            <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-center text-red-400 backdrop-blur-xl">

              {error}

            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default DashboardProfile