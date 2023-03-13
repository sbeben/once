import { children, Component, JSXElement, Show } from "solid-js";
import { useUnit } from "effector-solid";
import { $isMobile } from "@/model/api";
import { Header, Menu } from "@/components";
import { Container, MenuContainer, Wrapper } from "./Style";

type Props = {
  children: JSXElement[];
};

export const AppLayout: Component = (props: Props) => {
  const { isMobile } = useUnit({ isMobile: $isMobile });
  const c = children(() => props.children);
  return (
    <Wrapper>
      <Header />
      <Container isMobile={isMobile()}>{c()}</Container>
      <Show when={isMobile()}>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Show>
    </Wrapper>
  );
};
