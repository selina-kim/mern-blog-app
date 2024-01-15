export function Home() {
  return (
    <>
      <ul className="mb-auto mt-8 grid grid-cols-1 gap-7 px-8 text-left">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="grid grid-cols-[0.9fr_1.1fr] gap-4">
            <img
              className="rounded-lg"
              src="https://images.unsplash.com/photo-1483004406427-6acb078d1f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold">TITLE smth smth asldkf</h2>
              <div className="flex flex-row justify-start gap-x-2">
                <p className="inline text-xs font-semibold">Username</p>
                <time className="text-xs font-semibold text-gray-400">
                  2024-01-25 15:30
                </time>
              </div>
              <p className="mt-3 text-sm">Summary</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
