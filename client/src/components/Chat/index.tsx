import { ContactItem } from "@/enteties";
import { $isMobile } from "@/model/api";
import {
  $contacts,
  $currentConversationMessages,
  $isChatting,
  $isSendMessageDisabled,
  $messageTextInput,
  changeMessageText,
  selectConversation,
  sendMessage,
} from "@/model/conversations";
import { Button } from "@/shared/ui/Button";
import { Textarea } from "@/shared/ui/Textarea";
import { Title } from "@/shared/ui/Title";
import { useUnit } from "effector-solid";
import { Component, createEffect, For, Match, Show, Switch } from "solid-js";
import {
  ChatContainer,
  Contact,
  ContactsContainer,
  DesktopContainer,
  InputSection,
  Message,
  MessagesSection,
  Sender,
  Text,
  TextContainer,
} from "./Style";

export const Chat: Component = () => {
  const {
    isMobile,
    contacts,
    select,
    messages,
    text,
    input,
    send,
    isChatting,
    isSendDisabled,
  } = useUnit({
    isMobile: $isMobile,
    contacts: $contacts,
    select: selectConversation,
    isChatting: $isChatting,
    messages: $currentConversationMessages,
    text: $messageTextInput,
    input: changeMessageText,
    send: sendMessage,
    isSendDisabled: $isSendMessageDisabled,
  });

  const Contacts: Component = () => {
    return (
      <ContactsContainer isMobile={isMobile()}>
        <For each={contacts()} fallback={<div>Loading</div>}>
          {(contact) => (
            <ContactItem
              onClick={() => select(contact.id)}
              name={contact.user.name}
              lastMessage={contact.lastMessage}
            />
          )}
        </For>
      </ContactsContainer>
    );
  };

  const ChatBox: Component = () => {
    let scrollRef: HTMLParagraphElement | undefined;

    createEffect((prev) => {
      if (!scrollRef) return;
      if (prev !== messages().length) {
        scrollRef.scrollIntoView();
      }
    }, messages.length);

    return (
      <ChatContainer>
        <Show
          when={isChatting()}
          fallback={<Title>Select conversation to start chatting</Title>}
        >
          <MessagesSection>
            <For each={messages()}>
              {(message, index) => (
                <Message own={message.isMe} ref={scrollRef}>
                  <TextContainer own={message.isMe}></TextContainer>
                  <Text own={message.isMe}>{message.text}</Text>
                  {/* <Sender>{message.sender}</Sender> */}
                </Message>
              )}
            </For>
          </MessagesSection>
          <InputSection>
            <Textarea
              value={text()}
              onChange={(e) => input(e.currentTarget.value)}
            />
            <Button
              type="regular"
              onClick={() => send()}
              disabled={isSendDisabled()}
            >
              send
            </Button>
          </InputSection>
        </Show>
      </ChatContainer>
    );
  };

  return (
    <Switch>
      <Match when={isMobile()}>
        <Show when={isChatting()} fallback={<Contacts />}>
          <ChatBox />
        </Show>
      </Match>
      <Match when={!isMobile()}>
        <DesktopContainer>
          <Contacts />
          <ChatBox />
        </DesktopContainer>
      </Match>
    </Switch>
  );
};
