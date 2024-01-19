import { useState } from "react";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showEmailEmptyWarning, setShowEmailEmptyWarning] = useState(false);
  const [showUsernameEmptyWarning, setShowUsernameEmptyWarning] =
    useState(false);
  const [showPasswordEmptyWarning, setShowPasswordEmptyWarning] =
    useState(false);
  const [showConfirmPasswordEmptyWarning, setShowConfirmPasswordEmptyWarning] =
    useState(false);

  async function checkSignup(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim() == "") {
      setShowEmailEmptyWarning(true);
    }
    if (username.trim() == "") {
      setShowUsernameEmptyWarning(true);
    }
    if (password.trim() == "") {
      setShowPasswordEmptyWarning(true);
    }
    if (confirmPassword.trim() == "") {
      setShowConfirmPasswordEmptyWarning(true);
    } else handleSignup();
  }

  async function handleSignup() {}

  const requiredWarningStyle = "border-red-500 bg-red-50";
  const requiredWarning = (
    <div className="mb-2 mt-1 text-xs text-red-500">This field is required</div>
  );

  return (
    <div className="m-auto min-h-[560px] w-fit p-4">
      <form
        id="login-form"
        className="mx-auto grid w-72 grid-cols-1"
        onSubmit={checkSignup}
      >
        <h1 className="my-4 text-center text-2xl font-bold">Sign up</h1>

        <div>
          <label className="mb-1 block text-sm" htmlFor="signup-email">
            Email
          </label>
          <div
            className={`w-full rounded-md border ${showEmailEmptyWarning ? requiredWarningStyle : "mb-5 border-gray-400"} p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2`}
          >
            <input
              type="text"
              id="signup-email"
              className="w-full bg-inherit text-sm focus:outline-none"
              value={email}
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setShowEmailEmptyWarning(false);
                setEmail(e.target.value);
              }}
            />
          </div>
          {showEmailEmptyWarning && requiredWarning}
        </div>

        <div>
          <label className="mb-1 block text-sm" htmlFor="signup-username">
            Username
          </label>
          <div
            className={`w-full rounded-md border ${showUsernameEmptyWarning ? requiredWarningStyle : "mb-5 border-gray-400"} p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2`}
          >
            <input
              type="text"
              id="signup-username"
              className="w-full bg-inherit text-sm focus:outline-none"
              value={username}
              placeholder="Username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setShowUsernameEmptyWarning(false);
                setUsername(e.target.value);
              }}
            />
          </div>
          {showUsernameEmptyWarning && requiredWarning}
        </div>

        <div>
          <label className="mb-1 block text-sm" htmlFor="signup-password">
            Password
          </label>
          <div
            className={`flex w-full flex-row gap-2 rounded-md border ${showPasswordEmptyWarning ? requiredWarningStyle : "mb-5 border-gray-400"} p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2`}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="signup-password"
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
          {showPasswordEmptyWarning && requiredWarning}
        </div>

        <div>
          <label
            className="mb-1 block text-sm"
            htmlFor="signup-confirm-password"
          >
            Confirm Password
          </label>
          <div
            className={`flex w-full flex-row gap-2 rounded-md border ${showConfirmPasswordEmptyWarning ? requiredWarningStyle : "mb-5 border-gray-400"} p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2`}
          >
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="signup-confirm-password"
              className="w-full bg-inherit text-sm focus:outline-none"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setShowConfirmPasswordEmptyWarning(false);
                setConfirmPassword(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-right text-sm font-bold text-violet-500"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {showConfirmPasswordEmptyWarning && requiredWarning}
        </div>

        <button className="my-4 rounded-md bg-violet-500 p-3 font-medium text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2">
          Sign up
        </button>
      </form>
    </div>
  );
}
