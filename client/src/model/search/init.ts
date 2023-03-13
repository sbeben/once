import { sample } from "effector";
import { throttle } from "patronum";
import {
  $foundContacts,
  $foundUsers,
  $searchQuery,
  changeSearchQuery,
  search,
  searchFx,
} from ".";
import { $contacts } from "../conversations";

sample({
  clock: changeSearchQuery,
  target: $searchQuery,
});

sample({
  clock: changeSearchQuery,
  source: $searchQuery,
  filter: (query) => query.length > 2,
  target: search,
});

sample({
  clock: search,
  source: { contacts: $contacts, query: $searchQuery },
  fn: ({ contacts, query }) => {
    return contacts
      ? contacts.filter((c) => c.user.name.toLowerCase().includes(query))
      : null;
  },
  target: $foundContacts,
});

const throttledSearch = throttle({
  source: search,
  timeout: 2000,
});

sample({
  clock: throttledSearch,
  source: $searchQuery,
  target: searchFx,
});

sample({
  clock: searchFx.doneData,
  target: $foundUsers,
});

searchFx.finally.watch((v) => console.log("search", v));
