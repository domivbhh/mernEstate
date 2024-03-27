import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import  Home  from "./pages/Home";
import  About  from "./pages/About";
import Signin from "./pages/Signin";
import SignOut from "./pages/SignOut";
import Header from './components/Header';



const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Signin />} />
        <Route path="/" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App


