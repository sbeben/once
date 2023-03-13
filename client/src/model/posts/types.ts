import { FieldChange } from "../api/types";

export type PostDraft = {
  text: string;
};

export type PostDraftChange = FieldChange<PostDraft>;
