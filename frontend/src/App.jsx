import React, { useContext, useEffect } from 'react'
import "./App.css"
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import Appointment from "./Pages/Appointment"
import AboutUs from "./Pages/AboutUs"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { Context } from "./main";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/patient/me", {
          withCredentials: true
        });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    }
    fetchUser();
  }, [isAuthenticated])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position='top-center' />
      </Router>
    </>
  )
}

export default App