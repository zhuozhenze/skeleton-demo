import { Routes, Route } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import HomePage from "@pages/home";
import NotFoundPage from "@pages/404";
import ProfilePage from "@pages/profile";
import VideoPage from "@pages/video";
import UploadPage from "@pages/upload";

interface RouteType extends RouteProps {
  childRoute?: RouteType[];
}

const routeList: RouteType[] = [
  {
    path: "/",
    element: <HomePage />,
    childRoute: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "video",
        element: <VideoPage />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const HOCRoute = (props: RouteType) => {
  return (
    <Route {...props}>
      {props.childRoute &&
        props.childRoute.map((child, index) => {
          return <HOCRoute key={child.path || index} {...child} />;
        })}
    </Route>
  );
};

const Router = () => {
  return (
    <Routes>
      {routeList.map((props) => {
        return HOCRoute(props);
      })}
    </Routes>
  );
};

export default Router;
