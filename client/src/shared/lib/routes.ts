import { createRoute } from "atomic-router";

export const homeRoute = createRoute();
export const authRoute = createRoute();
export const chatsRoute = createRoute();
export const mapRoute = createRoute();
export const activitiesRoute = createRoute();
export const catalogueRoute = createRoute();
export const profileRoute = createRoute<{ id: string }>();
export const catalogueItemRoute = createRoute<{ id: string }>();
export const notFoundRoute = createRoute();

export const routes = [
  {
    path: "/",
    route: homeRoute,
  },
  { path: "/auth", route: authRoute },
  { path: "/map", route: mapRoute },
  { path: "/chat", route: chatsRoute },
  { path: "/activities", route: activitiesRoute },
  { path: "/catalogue", route: catalogueRoute },
  { path: "/profile", route: profileRoute },
  { path: "/404", route: notFoundRoute },
];
