import { Component } from "solid-js";
import { BottomSection, Container, MiddleSection, TopSection } from "./Style";

type Props =
  | {
      type: "draft";
      name: string;
    }
  | {
      type: "master";
      name: string;
      text: string;
    };

export const Post: Component<Props> = (props) => {
  return (
    <Container>
      <TopSection></TopSection>
      <MiddleSection></MiddleSection>
      <BottomSection></BottomSection>
    </Container>
  );
};
