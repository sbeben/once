import { createRouteView } from "atomic-router-solid";
import { authRoute } from "@/shared/lib/routes";
import { Auth } from "@/components/Auth";

export const AuthPage = createRouteView({
  route: authRoute,
  view() {
    return <Auth />;
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
