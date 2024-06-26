import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import { BlogMainPage } from "./pages/BlogMainPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { SignupPage } from "./pages/SignupPage.tsx";
import { BlogpostPage } from "./pages/BlogpostPage.tsx";
import { BlogpostEditorPage } from "./pages/BlogpostEditorPage.tsx";
import * as UsersApi from "./api/users_api";
import { useContext, useEffect } from "react";
import { UserContext } from "./userContext.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";

export default function App() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout onLogoutSuccessful={() => setLoggedInUser(null)} />}
      >
        <Route index element={<HomePage />} />
        <Route path="blog/:username/:blogpostId" element={<BlogpostPage />} />
        <Route path="blog/:username" element={<BlogMainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="editor/:origBlogpostId?"
          element={loggedInUser ? <BlogpostEditorPage /> : <NotFoundPage />}
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
