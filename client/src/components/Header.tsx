import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-10 box-border w-full border-b-[1px] border-violet-500 bg-white">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-8">
        <Link to="/" className="text-2xl font-bold">
          blog
        </Link>
        <nav className="flex gap-4">
          <Link to="editor">Create Post</Link>
          <Link to="login">Login</Link>
          <Link to="signup">Sign up</Link>
        </nav>
      </div>
    </header>
  );
}
