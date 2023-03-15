import { createRouteView } from "atomic-router-solid";
import { profileRoute } from "@/shared/lib/routes";
import { Profile } from "@/components/Profile";
import { chainRoute } from "atomic-router";
import { $profileInfo, loadProfileFx } from "@/model/profile";

const preloadedProfileRoute = chainRoute({
  route: profileRoute,
  beforeOpen: {
    effect: loadProfileFx,
    mapParams: ({ params }) => params.id,
  },
});

export const ProfilePage = createRouteView({
  //TODO handle this
  //@ts-expect-error
  route: preloadedProfileRoute,
  view() {
    return <Profile />;
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
