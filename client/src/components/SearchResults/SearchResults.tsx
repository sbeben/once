import { SearchResult } from "@/enteties/SearchResult";
import { $isMobile } from "@/model/api";
import {
  $foundContacts,
  $foundUsers,
  $searchQuery,
  searchFx,
} from "@/model/search";
import { MIN_SEARCH_QUERY_LENGTH } from "@/shared/lib/constants";
import { Description } from "@/shared/ui/Description";
import { useUnit } from "effector-solid";
import { Component, For, Match, Show, Switch } from "solid-js";
import { Container, Divider } from "./Style";

export const SearchResults: Component = () => {
  const { isMobile, contacts, users, searching, query } = useUnit({
    isMobile: $isMobile,
    contacts: $foundContacts,
    users: $foundUsers,
    searching: searchFx.pending,
    query: $searchQuery,
  });
  return (
    <Container isMobile={isMobile()}>
      <Show when={contacts()?.length > 0 ?? false}>
        <Divider>contacts</Divider>
        <For each={contacts()}>
          {(contact, index) => (
            <SearchResult
              type="contact"
              chatId={contact.id}
              userId={contact.user.id}
              name={contact.user.name}
            />
          )}
        </For>
      </Show>
      <Divider>global search</Divider>
      <Switch>
        <Match when={!users() && !searching()}>
          <Description>{`Type at least 3 letters to search globally`}</Description>
        </Match>
        <Match when={!users() && searching()}>
          <Description>Searching...</Description>
        </Match>
        <Match when={users()?.length === 0 ?? false}>
          <Description>No users found...</Description>
        </Match>
        <Match when={users()?.length > 0 ?? false}>
          <For each={users()}>
            {(user, index) => (
              <SearchResult type="user" userId={user.id} name={user.name} />
            )}
          </For>
        </Match>
      </Switch>
    </Container>
  );
};
