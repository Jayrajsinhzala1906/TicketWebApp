import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./helpers/getCurrentUser";
import { setUser } from "./features/user/userSlice";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser().then((user) => {
      dispatch(setUser(user));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
