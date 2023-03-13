import { Component } from "solid-js";
import { Container, TopSection } from "./Style";
import { Image } from "@/shared/ui/Image";
import { Title } from "@/shared/ui/Title";

export const Profile: Component = () => {
  return (
    <Container>
      <TopSection>
        <Image type="avatar" />
        <Title>Name</Title>
      </TopSection>
    </Container>
  );
};
