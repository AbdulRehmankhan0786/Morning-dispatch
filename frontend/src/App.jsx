import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./pages/Post"
import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";
import LiveNews from "./pages/LiveNews";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News"
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Search from "./pages/Search";

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import PrivateRoute from "./components/shared/PrivateRoute";
import AdminPrivateRoute from "./components/shared/AdminPrivateRoute";
import ScrollToTop from "./components/shared/ScrollToTop";

import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>

      <Header />
      <ScrollToTop />

      <Routes>

        {/* Authentication */}
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        {/* Public Pages */}
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/news" element={<News />} />
       
        <Route path="/live-news" element={<LiveNews />} />
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<EditPost />} />
        </Route>

      </Routes>

      <Footer />

      <Toaster />

    </BrowserRouter>
  );
};

export default App;