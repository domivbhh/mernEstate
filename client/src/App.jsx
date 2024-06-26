import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import  Home  from "./pages/Home";
import  About  from "./pages/About";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import ListingPage from './pages/ListingPage';
import Search from './pages/Search';



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>

        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/listing/:id" element={<ListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


