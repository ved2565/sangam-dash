import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Home from "./components/Home.jsx";
import Population from "./components/Population.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import UploadCSV from "./components/UploadCSV.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Demography from "./components/Demography.jsx";
import AddSchemes from "./components/AddSchmes.jsx";
import AddSchemes from "./components/AddScheme.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/population" element={<Population />} />
      <Route path="/upload" element={<UploadCSV />} />
      <Route path="/demography" element={<Demography />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/addScheme" element={<AddSchemes />} />
      <Route path="/addscheme" element={<AddSchemes />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
