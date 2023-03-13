import { createRouteView } from "atomic-router-solid";
import { profileRoute } from "@/shared/lib/routes";
import { Profile } from "@/components/Profile";

export const ProfilePage = createRouteView({
  //TODO handle this
  //@ts-expect-error
  route: profileRoute,
  view() {
    return <Profile />;
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
