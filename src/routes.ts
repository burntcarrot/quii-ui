import type { RouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import Login from "lib/pages/login";
import Profile from "lib/pages/profile";
import Register from "lib/pages/register";
import Projects from "./lib/pages/projects";

export const routes: Array<RouteProps> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/projects",
    component: Projects,
  },
];

export const privateRoutes: Array<RouteProps> = [];
