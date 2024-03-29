import { SearchBar } from "@/enteties/SearchBar/SearchBar";
import { $isMobile } from "@/model/api";
import {
  $currentConversationName,
  $isChatting,
  backFromChatToContacts,
} from "@/model/conversations";
import { $isSearching, $searchQuery, changeSearchQuery } from "@/model/search";
import { chatsRoute } from "@/shared/lib/routes";
import { Button } from "@/shared/ui/Button";
import { Title } from "@/shared/ui/Title";
import { Link } from "atomic-router-solid";
import { useUnit } from "effector-solid";
import { Component, Match, Show, Switch } from "solid-js";
import { Menu } from "../Menu";
import { Container, Logo, LogoWrap } from "./Style";

export const Header: Component = () => {
  const { isMobile, isChatting, isSearching, name, back, query, changeQuery } =
    useUnit({
      isMobile: $isMobile,
      isChatting: $isChatting,
      isSearching: $isSearching,
      name: $currentConversationName,
      back: backFromChatToContacts,
      query: $searchQuery,
      changeQuery: changeSearchQuery,
    });
  return (
    <Container>
      <Show when={!(isMobile() && isChatting())}>
        <Show when={!(isSearching() && isMobile())}>
          <LogoWrap isMobile={isMobile()}>
            <Link to={chatsRoute}>
              <Logo>Once</Logo>
            </Link>
          </LogoWrap>
        </Show>
        <SearchBar
          value={query()}
          onInput={(e) => changeQuery(e.currentTarget.value)}
        />
      </Show>

      <Show when={isChatting() && isMobile()}>
        <Button type="back" onClick={() => back()} />
        <Title>{name()}</Title>
      </Show>

      <Show when={!isMobile()}>
        <Menu />
      </Show>
    </Container>
  );
};
