import React, { createContext, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

// USE CONTEXT --> https://reactjs.org/docs/context.html

export const AppContext = createContext();

function App() {

  const [token, setToken] = useState("");
  const [isLIn, setIsLIn] = useState(false);
  const [errors, setErrors] = useState("");

  return (
    <AppContext.Provider value={{ token, setToken, isLIn, setIsLIn, errors, setErrors }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />{" "}
            <Route path="/about" element={<About />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/register" element={<Register />} />{" "}
            <Route path="/dashboard" element={<Dashboard />} />{" "}
          </Route>{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </AppContext.Provider>
  );
}

export default App;
