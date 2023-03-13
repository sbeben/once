import { createEffect, createEvent, createStore } from "effector";
import { backendRequestFx } from "..";
import { FetchedProfile } from "../contracts";

export const goToProfileClicked = createEvent<{ id: string }>();
export const loadProfileFx = createEffect<string, FetchedProfile>(
  async (id) => {
    return (await backendRequestFx({
      method: "GET",
      path: `profile/${id}`,
    })) as FetchedProfile;
  }
);
export const $profileInfo = createStore<FetchedProfile | null>(null);
