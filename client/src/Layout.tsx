import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { User } from "./models/user";

interface LayoutProps {
  loggedInUser: User | null;
  onLogoutSuccessful: () => void;
}

function Layout({ loggedInUser, onLogoutSuccessful }: LayoutProps) {
  return (
    <>
      <Header
        loggedInUser={loggedInUser}
        onLogoutSuccessful={onLogoutSuccessful}
      />
      <div className="mx-auto mt-[97px] h-[calc(100vh-97px)] min-h-fit max-w-3xl px-4">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
