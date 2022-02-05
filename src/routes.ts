import type { RouteProps } from "react-router-dom";

import CreateProject from "lib/pages/create-project";
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
  {
    path: "/create",
    component: CreateProject,
  },
];

export const privateRoutes: Array<RouteProps> = [];
