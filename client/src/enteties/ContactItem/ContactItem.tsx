import { Component } from "solid-js";
import { Container, LastMessage, Name, Pic } from "./Style";

type Props = {
  avatar?: string;
  name: string;
  lastMessage: string | null;
  onClick: () => any;
};

export const ContactItem: Component<Props> = (props) => {
  return (
    <Container onClick={props.onClick}>
      <Pic />
      <Name>{props.name}</Name>
      <LastMessage>{props.lastMessage || ""}</LastMessage>
    </Container>
  );
};
