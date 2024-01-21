import { useContext, useState } from "react";
import * as UsersApi from "../api/users_api";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

export function LoginPage() {
  const { setLoggedInUser } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showUsernameEmptyWarning, setShowUsernameEmptyWarning] =
    useState(false);
  const [showPasswordEmptyWarning, setShowPasswordEmptyWarning] =
    useState(false);

  const [validationWarning, setValidationWarning] = useState("");

  const [redirectHome, setRedirectHome] = useState(false);

  function hasEmptyField() {
    let empty = false;

    if (username.trim() == "") {
      setShowUsernameEmptyWarning(true);
      empty = true;
    }
    if (password.trim() == "") {
      setShowPasswordEmptyWarning(true);
      empty = true;
    }

    if (empty) return true;
    else return false;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setValidationWarning("");
    if (!hasEmptyField()) {
      try {
        const loggedIn = await UsersApi.login({
          username: username,
          password: password,
        });
        if (loggedIn) {
          const user = await UsersApi.getLoggedInUser();
          setLoggedInUser(user);
        }
        setRedirectHome(true);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setValidationWarning(error.message);
        }
      }
    }
  }

  const inputFieldWarningStyle = "border-red-500 bg-red-50";
  const inputFieldWarning = (warningMessage: string) => (
    <div className="mb-2 mt-1 text-xs text-red-500">{warningMessage}</div>
  );

  if (redirectHome) return <Navigate to={`/${username}`} />;

  return (
    <div className="m-auto min-h-[560px] w-fit p-4">
      <form className="grid w-72 grid-cols-1" onSubmit={handleLogin}>
        <h1 className="my-4 text-center text-2xl font-bold">Login</h1>

        <div>
          <label className="mb-1 block text-sm" htmlFor="login-username">
            Username
          </label>
          <div
            className={`w-full rounded-md border ${showUsernameEmptyWarning ? inputFieldWarningStyle : "mb-5 border-gray-400"} p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2`}
          >
            <input
              type="text"
              id="login-username"
              className="w-full bg-inherit text-sm focus:outline-none"
              value={username}
              placeholder="Username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setShowUsernameEmptyWarning(false);
                setUsername(e.target.value);
              }}
            />
          </div>
          {showUsernameEmptyWarning &&
            inputFieldWarning("This field is required.")}
        </div>

        <div>
          <label className="mb-1 block text-sm" htmlFor="login-password">
            Password
          </label>
          <div
            className={`flex w-full flex-row gap-2 rounded-md border ${showPasswordEmptyWarning ? inputFieldWarningStyle : "mb-5 border-gray-400"} p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              className="w-full bg-inherit text-sm focus:outline-none"
              value={password}
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setShowPasswordEmptyWarning(false);
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-right text-sm font-bold text-violet-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {showPasswordEmptyWarning &&
            inputFieldWarning("This field is required.")}
          {validationWarning != "" && inputFieldWarning(validationWarning)}
        </div>

        <button className="my-4 rounded-md bg-violet-500 p-3 font-medium text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2">
          Login
        </button>
      </form>
    </div>
  );
}
