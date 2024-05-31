import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Asset from "./components/assets/Asset";
import PlayList from "./components/playlists/PlayList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/all.min.css";
import "./css/style.css";

import "bootstrap/dist/js/bootstrap.bundle.min";

import { GoogleOAuthProvider } from '@react-oauth/google';

//import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/register",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/asset/create",
    element: <App />,
    children: [
      {
        path: "/asset/create",
        element: <Asset />,
      },
    ],
  },
  {
    path: "/asset/edit/:id",
    element: <App />,
    children: [
      {
        path: "/asset/edit/:id",
        element: <Asset />,
      },
    ],
  },
  {
    path: "/playlist/create",
    element: <App />,
    children: [
      {
        path: "/playlist/create",
        element: <PlayList />,
      },
    ],
  },
  {
    path: "/playlist/edit/:id",
    element: <App />,
    children: [
      {
        path: "/playlist/edit/:id",
        element: <PlayList />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId="611076505603-fate38lg6oc40rf13oi9a7neijus3v5q.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>

  </React.StrictMode>
);
