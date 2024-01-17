import { useState } from "react";

export function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="m-auto min-h-[560px] w-fit p-4">
      <form className="grid w-72 grid-cols-1 gap-y-5" onSubmit={handleLogin}>
        <h1 className="my-4 text-center text-2xl font-bold">
          Login with Email
        </h1>

        <div>
          <label className="mb-1 block text-sm" htmlFor="login-email">
            Email
          </label>
          <div className="w-full rounded-md border border-gray-400 p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2">
            <input
              type="text"
              id="login-email"
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
          <label className="mb-1 block text-sm" htmlFor="login-password">
            Password
          </label>
          <div className="flex w-full flex-row gap-2 rounded-md border border-gray-400 p-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2">
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
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

        <button className="my-4 rounded-md bg-violet-500 p-3 font-medium text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2">
          Login
        </button>
      </form>
    </div>
  );
}
