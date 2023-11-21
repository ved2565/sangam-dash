import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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
import AddSchemes from "./components/AddSchemes.jsx";
import VisnagarMap from "./components/Maps/VisnagarMap.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AuthLayout from "./components/AuthLayout.jsx";

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={
        <AuthLayout authentication={true}>
          <App />
        </AuthLayout>
      }
    >
      <Route path="" element={<Home />} />
      <Route path="/population" element={<Population />} />
      <Route path="/upload" element={<UploadCSV />} />
      <Route path="/demography" element={<Demography />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/visnagar" element={<VisnagarMap />} />
      <Route path="/addscheme" element={<AddSchemes />} />
    </Route>
    ,
    <Route path="/login" element={<LoginPage />} />,
    <Route path="/register" element={<RegisterPage />} />
  </>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
