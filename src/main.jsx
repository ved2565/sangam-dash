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
import Home from "./components/Home/Home.jsx";
import Population from "./components/Population/Population.jsx";
import LoginPage from "./components/Auth/LoginPage.jsx";
// import RegisterPage from "./components/Auth/RegisterPage.jsx";
import UploadCSV from "./components/Utils/UploadCSV.jsx";
import UserProfile from "./components/Auth/UserProfile.jsx";
import Demography from "./components/Demography/Demography.jsx";
import AddSchemes from "./components/Schemes/AddSchemes.jsx";
import VisnagarMap from "./components/Demography/Maps/VisnagarMap.jsx";
// import AuthLayout from "./components/Utils/AuthLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Temp1 from "./components/Dump/Temp1.jsx";

const routes = createRoutesFromElements(
  <>
    <Route
      path="/"
      element={
        // <AuthLayout authentication={true}>
          <App />
        // </AuthLayout>
      }
    >
      <Route path="" element={<Home />} />
      <Route path="/population" element={<Population />} />
      <Route path="/upload" element={<UploadCSV />} />
      <Route path="/demography" element={<Demography />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/visnagar" element={<VisnagarMap />} />
      <Route path="/addscheme" element={<AddSchemes />} />
      <Route path="/register" element={<Temp1 />} />
    </Route>
    ,
    <Route path="/login" element={<LoginPage />} />,
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
