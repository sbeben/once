import { sample } from "effector";
import { $postDraft, postDraftChanged, uploadPost, uploadPostFx } from ".";

sample({
  clock: postDraftChanged,
  source: $postDraft,
  fn: (draft, change) => ({
    ...draft,
    [Object.keys(change)[0]]: Object.values(change)[0],
  }),
  target: $postDraft,
});

sample({
  clock: uploadPost,
  source: $postDraft,
  target: uploadPostFx,
});
