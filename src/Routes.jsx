import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Login from "pages/Login";
import { ToastContainer } from "react-toastify";
import Posts from "pages/Post";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "pages/AboutUs";
import RequiredAuth from "components/RequiredAuth";
const ProjectRoutes = () => {
  <ToastContainer />;
  let element = useRoutes([
    {
      path: "/",
      element: (
        <RequiredAuth>
          <Home />
        </RequiredAuth>
      ),
    },
    { path: "*", element: <NotFound /> },

    {
      path: "login",
      element: <Login />,
    },

    {
      path: "posts",
      element: (
        <RequiredAuth>
          <Posts />
        </RequiredAuth>
      ),
    },
    {
      path: "about",
      element: (
        <RequiredAuth>
          <AboutUs />
        </RequiredAuth>
      ),
    },
  ]);

  return element;
};

export default ProjectRoutes;
