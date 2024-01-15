import { useState } from "react";

export function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="m-auto min-h-[560px]">
      <form
        id="login-form"
        className="mx-auto grid w-72 grid-cols-1 gap-y-5"
        onSubmit={handleSignup}
      >
        <h1 className="my-4 text-center text-2xl font-bold">
          Sign up with Email
        </h1>

        <div>
          <label className="block text-sm" htmlFor="signup-email">
            Email
          </label>
          <div className="w-full rounded-md border-[1px] border-gray-400 p-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-violet-500">
            <input
              type="text"
              id="signup-email"
              className="w-full text-sm focus:outline-none"
              value={email}
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm" htmlFor="signup-username">
            Username
          </label>
          <div className="w-full rounded-md border-[1px] border-gray-400 p-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-violet-500">
            <input
              type="text"
              id="signup-username"
              className="w-full text-sm focus:outline-none"
              value={username}
              placeholder="Username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm" htmlFor="signup-password">
            Password
          </label>
          <div className="flex w-full flex-row gap-2 rounded-md border-[1px] border-gray-400 p-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-violet-500">
            <input
              type={showPassword ? "text" : "password"}
              id="signup-password"
              className="w-full text-sm focus:outline-none"
              value={password}
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        </div>

        <div>
          <label className="block text-sm" htmlFor="signup-confirm-password">
            Confirm Password
          </label>
          <div className="flex w-full flex-row gap-2 rounded-md border-[1px] border-gray-400 p-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-violet-500">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="signup-confirm-password"
              className="w-full text-sm focus:outline-none"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        </div>

        <button className="my-4 rounded-md bg-violet-500 p-3 font-medium text-white">
          Sign up
        </button>
      </form>
    </div>
  );
}
