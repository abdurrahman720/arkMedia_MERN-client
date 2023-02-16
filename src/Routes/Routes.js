import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>
    }
])