import MainNavbar from "./components/MainNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
};

export default Layout;