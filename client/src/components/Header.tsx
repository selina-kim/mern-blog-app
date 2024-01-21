import * as UsersApi from "../api/users_api";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import { useContext } from "react";

interface HeaderProps {
  onLogoutSuccessful: () => void;
}

export function Header({ onLogoutSuccessful }: HeaderProps) {
  const { username } = useParams();
  const { loggedInUser } = useContext(UserContext);

  async function logout() {
    try {
      await UsersApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <header className="fixed left-0 top-0 z-10 box-border w-full border-b-[1px] border-violet-500 bg-white">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-8">
        {loggedInUser ? (
          <Link to={`/${loggedInUser.username}`} className="text-2xl font-bold">
            blog
          </Link>
        ) : (
          <Link to="/" className="text-2xl font-bold">
            blog
          </Link>
        )}

        {loggedInUser ? (
          <nav className="flex gap-4">
            {loggedInUser.username == username && username && (
              <Link to="editor">Create Post</Link>
            )}
            <button onClick={logout}>Logout</button>
          </nav>
        ) : (
          <nav className="flex gap-4">
            <Link to="login">Login</Link>
            <Link to="signup">Sign up</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
