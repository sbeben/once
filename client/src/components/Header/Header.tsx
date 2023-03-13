import { SearchBar } from "@/enteties/SearchBar/SearchBar";
import { $isMobile } from "@/model/api";
import {
  $currentConversationName,
  $isChatting,
  backFromChatToContacts,
} from "@/model/conversations";
import { chatsRoute } from "@/shared/lib/routes";
import { Button } from "@/shared/ui/Button";
import { Title } from "@/shared/ui/Title";
import { Link } from "atomic-router-solid";
import { useUnit } from "effector-solid";
import { Component, Match, Show, Switch } from "solid-js";
import { Menu } from "../Menu";
import { Container, Logo } from "./Style";

export const Header: Component = () => {
  const { isMobile, isChatting, name, back } = useUnit({
    isMobile: $isMobile,
    isChatting: $isChatting,
    name: $currentConversationName,
    back: backFromChatToContacts,
  });
  return (
    <Container>
      <Switch>
        <Match when={isMobile()}>
          <Show when={!isChatting()}>
            <Link to={chatsRoute}>
              <Logo>Once</Logo>
            </Link>
            <SearchBar />
          </Show>
          <Show when={isChatting()}>
            <Button type="back" onClick={() => back()} />
            <Title>{name()}</Title>
          </Show>
        </Match>
        <Match when={!isMobile()}>
          <Link to={chatsRoute}>
            <Logo>Once</Logo>
          </Link>
          <SearchBar />
          <Menu />
        </Match>
      </Switch>
    </Container>
  );
};
