import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/Cart/CartPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
