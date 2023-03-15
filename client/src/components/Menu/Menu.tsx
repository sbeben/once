import { chatsRoute, profileRoute } from "@/shared/lib/routes";
import { Title } from "@/shared/ui/Title";
import { Link } from "atomic-router-solid";
import { Component } from "solid-js";
import { Container } from "./Style";

export const Menu: Component = () => {
  return (
    <Container>
      <Link to={profileRoute} params={{ id: "me" }}>
        <Title>P</Title>
      </Link>
      <Link to={chatsRoute}>
        <Title>C</Title>
      </Link>
    </Container>
  );
};
