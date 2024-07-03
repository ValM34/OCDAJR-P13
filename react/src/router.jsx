import { createBrowserRouter } from "react-router-dom";
import Home from './pages/index';
import SignIn from './pages/sign-in';
import User from './pages/user';
import ErrorPage from "./pages/error-page";
import UpdateProfil from "./pages/updateProfil";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <User />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/update",
    element: <UpdateProfil />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/erreur404",
    element: <ErrorPage />,
  },
]);
