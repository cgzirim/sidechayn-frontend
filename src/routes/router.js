import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Explore from "../pages/ExplorePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Profile from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import ComingSoon from "../pages/ComingSoon";
import Playlist from "../pages/PlaylistPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
    },
    {
        path: '/explore',
        element: <Explore />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/saved-tracks',
        element: <ComingSoon />
    },
    {
        path: '/achievements',
        element: <ComingSoon />
    },
    {
        path: '/settings',
        element: <ComingSoon />
    },
    {
        path: '/playlist',
        element: <Playlist />
    },
    {
        path: '/playlist/:id',
        element: <ComingSoon />
    },
    {
        path: '*',
        element: <ErrorPage />,
    }
])