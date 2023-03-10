import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Media from "../Pages/Media";
import PostDetails from "../Pages/PostDetails";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        loader: ({ params }) =>
          fetch(`https://ark-media-server.vercel.app/get-post/${params.id}`),
        element: <PostDetails />,
      },
      {
        path: "/media",
        element: <Media />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/:userEmail",
        loader: ({ params }) =>
          fetch(
            `https://ark-media-server.vercel.app/get-user?email=${params.userEmail}`
          ),
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
