import MainNavbar from "./components/MainNavbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
};

export default App;