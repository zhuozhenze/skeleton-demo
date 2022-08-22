import React from "react";
import { RouteObject, useRoutes, Navigate } from "react-router-dom";
import lazyLoad from "./utils/lazyLoad";
import HomePage from "@pages/home";
import NotFoundPage from "@pages/404";

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home/profile" />,
  },
  {
    path: "/home",
    element: <HomePage />,
    children: [
      {
        path: "profile",
        element: lazyLoad(React.lazy(() => import("@pages/profile"))),
      },
      {
        path: "video",
        element: lazyLoad(React.lazy(() => import("@pages/video"))),
      },
      {
        path: "upload",
        element: lazyLoad(React.lazy(() => import("@pages/upload"))),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const Router = () => {
  const Router = useRoutes(routeList);
  return Router;
};

export default Router;
