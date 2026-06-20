import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/user/userSlice";

const SignInForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.user || {}
  );

  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {

    try {

      dispatch(signInStart());

      const res = await fetch(
        "https://morning-dispatch.onrender.com/api/auth/signin",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify(values),
        }
      );

      // 🔥 handle non-json errors safely
      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {

        dispatch(
          signInFailure(data.message || "Signin failed")
        );

        return;
      }

      dispatch(signInSuccess(data));

      navigate("/");

    } catch (error) {

      console.log(error);

      dispatch(
        signInFailure("Something went wrong")
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Sign In
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

        </form>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        <p className="text-center mt-4 text-sm">

          Don't have an account?{" "}

          <Link
            to="/sign-up"
            className="text-blue-500"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
};

export default SignInForm;