import { profileRoute } from "@/shared/lib/routes";
import { RouteParamsAndQuery } from "atomic-router";
import { sample } from "effector";
import { $profileInfo, goToProfileClicked, loadProfileFx } from ".";
import { $searchQuery } from "../search";

sample({
  clock: goToProfileClicked,
  filter: (data) => Boolean(data),
  fn: ({ id }) => {
    return { params: { id } } as RouteParamsAndQuery<{ id: string }>;
  },
  target: [profileRoute.navigate, $searchQuery.reinit],
});

sample({
  clock: loadProfileFx.doneData,
  target: $profileInfo,
});

$profileInfo.watch((v) => console.log("profile", v));
