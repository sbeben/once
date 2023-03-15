import { MIN_SEARCH_QUERY_LENGTH } from "@/shared/lib/constants";
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
import {
  $contacts,
  goToChatClicked,
  selectConversation,
} from "../conversations";

sample({
  clock: changeSearchQuery,
  target: $searchQuery,
});

sample({
  clock: changeSearchQuery,
  source: $searchQuery,
  filter: (query) => query.length >= MIN_SEARCH_QUERY_LENGTH,
  target: search,
});

// sample({
//   clock: search,
//   source: { contacts: $contacts, query: $searchQuery },
//   fn: ({ contacts, query }) => {
//     return contacts
//       ? contacts.filter((c) => c.user.name.toLowerCase().includes(query))
//       : null;
//   },
//   target: $foundContacts,
// });

const throttledSearch = throttle({
  source: search,
  timeout: 2000,
});

sample({
  clock: throttledSearch,
  source: $searchQuery,
  filter: (query) => query.length >= MIN_SEARCH_QUERY_LENGTH,
  target: searchFx,
});

sample({
  clock: searchFx.doneData,
  target: $foundUsers,
});

sample({
  clock: [goToChatClicked, selectConversation],
  target: $searchQuery.reinit,
});

sample({
  clock: $searchQuery.updates.filterMap((query) => query.length === 0),
  target: $foundUsers.reinit,
});

$foundContacts.updates.watch((v) => console.log("foundC", v));
$foundContacts.watch((v) => console.log("fondU", v));
