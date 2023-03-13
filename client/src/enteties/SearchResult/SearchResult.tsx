import { Component } from "solid-js";
import { Button } from "@/shared/ui/Button";
import { Container, Name, Pic } from "./Style";
import { useUnit } from "effector-solid";
import { goToChatClicked, selectConversation } from "@/model/conversations";
import { goToProfileClicked } from "@/model/profile";

type Props =
  | {
      type: "contact";
      chatId: string;
      userId: string;
      name: string;
    }
  | { type: "user"; userId: string; name: string };

export const SearchResult: Component<Props> = (props) => {
  const { goToChat, goToProfile, selectChat } = useUnit({
    goToChat: goToChatClicked,
    selectChat: selectConversation,
    goToProfile: goToProfileClicked,
  });

  const handleGoToChat = () => {
    if (props.type === "contact") selectChat(props.chatId);
    if (props.type === "user") goToChat({ userId: props.userId });
  };

  return (
    <Container>
      <Pic />
      <Name>{props.name}</Name>
      <Button type="regular" onClick={() => handleGoToChat()}>
        C
      </Button>
      <Button type="regular" onClick={() => goToProfile({ id: props.userId })}>
        P
      </Button>
    </Container>
  );
};
