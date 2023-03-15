import { Component } from "solid-js";
import { Container, TopSection } from "./Style";
import { Image } from "@/shared/ui/Image";
import { Title } from "@/shared/ui/Title";
import { useUnit } from "effector-solid";
import { $profileInfo } from "@/model/profile";

export const Profile: Component = () => {
  const { profile } = useUnit({ profile: $profileInfo });
  return (
    <Container>
      <TopSection>
        <Image type="avatar" />
        <Title>{profile().user.name}</Title>
      </TopSection>
    </Container>
  );
};
