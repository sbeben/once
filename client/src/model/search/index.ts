import { createEffect, createEvent, createStore } from "effector";
import { backendRequestFx } from "..";
import { FetchedUser } from "../contracts";
import { Contacts } from "../conversations/types";

export const changeSearchQuery = createEvent<string>();
export const $searchQuery = createStore<string>("");
export const $isSearching = $searchQuery.map((query) =>
  query.length > 0 ? true : false
);

export const search = createEvent<void>();
export const searchFx = createEffect<string, FetchedUser[]>(async (query) => {
  return (await backendRequestFx({
    method: "GET",
    path: `search?query=${query}`,
  })) as FetchedUser[];
});

export const $foundUsers = createStore<FetchedUser[] | null>(null);
export const $foundContacts = createStore<Contacts | null>(null);
