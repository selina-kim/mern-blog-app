import * as UsersApi from "../api/users_api";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import { useContext } from "react";
import { RiFileAddLine } from "react-icons/ri";

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
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4 sm:h-24">
        <div className="flex flex-row gap-x-2">
          <Link
            to={loggedInUser ? `/blog/${loggedInUser.username}` : "/"}
            className="text-lg font-bold sm:text-2xl"
          >
            blog
          </Link>
          {username && (
            <>
              <div className="w-0.5 bg-black" />
              <Link to={`/blog/${username}`}>
                <h1 className="text-lg sm:text-2xl">{username}</h1>
              </Link>
            </>
          )}
        </div>

        {loggedInUser ? (
          <nav className="flex flex-row items-center gap-x-3 text-sm sm:gap-x-4 sm:text-base">
            {loggedInUser.username == username && username && (
              <Link
                to="editor"
                className="w-20 rounded-md bg-violet-500 p-2 text-center text-white"
              >
                Post
                <RiFileAddLine className="-mr-0.5 -mt-0.5 ml-2 inline text-lg" />
              </Link>
            )}
            <button onClick={logout}>Logout</button>
          </nav>
        ) : (
          <nav className="flex flex-row items-center gap-4 text-sm sm:text-base">
            <Link to="login">Login</Link>
            <Link
              to="signup"
              className="w-20 rounded-md bg-violet-500 p-2 text-center text-white"
            >
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
