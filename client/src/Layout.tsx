import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

interface LayoutProps {
  onLogoutSuccessful: () => void;
}

function Layout({ onLogoutSuccessful }: LayoutProps) {
  return (
    <>
      <Header onLogoutSuccessful={onLogoutSuccessful} />
      <div className="mx-auto mt-[65px] h-[calc(100vh-65px)] min-h-fit max-w-3xl px-4 sm:mt-[97px] sm:h-[calc(100vh-97px)]">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
