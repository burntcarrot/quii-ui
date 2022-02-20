import type { RouteProps } from "react-router-dom";

import CreateProject from "lib/pages/create-project";
import Home from "lib/pages/home";
import Login from "lib/pages/login";
import Profile from "lib/pages/profile";
import Register from "lib/pages/register";

import Projects from "./lib/pages/projects";
import GetProject from "lib/pages/get-project";
import GetTask from "lib/pages/get-tasks";
import CreateTask from "lib/pages/create-task";
import GetTaskByID from "lib/pages/get-task-by-id";

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
  {
    path: "/projects/:projectName",
    component: GetProject,
  },
  {
    path: "/projects/:projectName/tasks",
    component: GetTask,
  },
  {
    path: "/projects/:projectName/tasks/:taskID",
    component: GetTaskByID,
  },
  {
    path: "/projects/:projectName/tasks/new",
    component: CreateTask,
  },
];

export const privateRoutes: Array<RouteProps> = [];
