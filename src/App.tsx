import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Menu } from "./Components/Menu";
import { Route, Routes } from "react-router";
import Dashboard from "./Components/Routes/Dashboard";
import OpenTasks from "./Components/Routes/OpenTasks";
import AllTasks from "./Components/Routes/AllTasks";
import Settings from "./Components/Routes/Settings";
import { Login } from "./Components/Routes/Login";
import { ProtectedRoute } from "./Components/Routes/Protected";
import { useSelector } from "react-redux";
import { RootState } from "./Store";
import Register from "./Components/Routes/Register";
import Snackbar from "./Components/Snackbar";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="App">
      {isAuthenticated && <Menu />}
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />{" "}
        <Route
          path="/OpenTasks"
          element={
            <ProtectedRoute>
              <OpenTasks />
            </ProtectedRoute>
          }
        />  
        <Route
          path="/AllTasks"
          element={
            <ProtectedRoute>
              <AllTasks/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Snackbar />
    </div>
  );
}

export default App;
