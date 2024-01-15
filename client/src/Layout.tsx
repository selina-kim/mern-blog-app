import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="mx-auto min-h-screen max-w-3xl pt-[97px]">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
