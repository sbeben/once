import { createRouteView } from "atomic-router-solid";
import { homeRoute } from "@/shared/lib/routes";

export const HomePage = createRouteView({
  route: homeRoute,
  view() {
    // const posts = useUnit($posts);

    return <div>Home route</div>;
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
