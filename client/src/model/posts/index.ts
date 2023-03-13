import { createEffect, createEvent, createStore } from "effector";
import { backendRequestFx } from "..";
import { FetchedPost } from "../contracts";
import { PostDraft, PostDraftChange } from "./types";

export const postDraftChanged = createEvent<PostDraftChange>();
export const $postDraft = createStore<PostDraft>({ text: "" });
export const uploadPost = createEvent<void>();
export const uploadPostFx = createEffect<PostDraft, FetchedPost>(
  async (post) => {
    return (await backendRequestFx({
      method: "POST",
      path: "post",
      data: post,
    })) as FetchedPost;
  }
);
