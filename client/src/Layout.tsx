import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="mx-auto min-h-screen max-w-3xl px-4 pt-[97px]">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
