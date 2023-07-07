import { oneDayInMs } from "@/shared/lib/constants";
import { combine, createEffect, createEvent, createStore } from "effector";
import { GoToChat, WSConversation, WSEventReceived, WSMessage } from "./types";

export let socket: WebSocket;
export const webSocketMessageReceived = createEvent<WSEventReceived>();
export const webSocketConnectionFailed = createEvent<unknown>();
export const initWebsocketFx = createEffect<void, void>(() => {
  socket = new WebSocket(`${import.meta.env.VITE_WS_HOST_LINK}wsconnect`);
  socket.onopen = function (e) {
    // console.log("[open] Connection established");
    // console.log("Sending to server");
  };
  socket.onmessage = function (event) {
    const parsedData: WSEventReceived = JSON.parse(event.data);
    webSocketMessageReceived(parsedData);
  };
  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("socketClose", event);
      console.log("[close] Connection died");
    }
  };
  socket.onerror = function (error) {
    //console.log("socketerr", error);
    webSocketConnectionFailed();
    //console.log(`${error.message}`);
  };
});

export const selectConversation = createEvent<string>();
export const $conversations = createStore<WSConversation[] | null>(null);
export const $conversationsLoading = $conversations.map((c) => !!c);
export const $contacts = $conversations.map((conversations) => {
  return (
    conversations?.map((conv) => {
      const user = conv.users.find((u) => !u.isMe);
      return {
        id: conv.id,
        user,
        lastMessage: conv.messages?.at(-1)?.text ?? null,
      };
    }) ?? null
  );
});
export const $currentConversationId = createStore<string | null>(null);
export const $currentConversation = combine(
  { rooms: $conversations, id: $currentConversationId },
  ({ rooms, id }) => {
    if (!rooms || !id) {
      return null;
    }
    return rooms.find((room) => room.id === id) ?? null;
  }
);
export const $currentConversationName = $currentConversation.map((conv) => {
  return conv?.users?.find((u) => !u.isMe).name ?? null;
});
export const $currentConversationMessages = $currentConversation.map((conv) => {
  return conv?.messages ?? null;
});
export const $isChatting = $currentConversation.map((conv) =>
  conv ? true : false
);
export const backFromChatToContacts = createEvent<void>();

export const changeMessageText = createEvent<string>();
export const $messageTextInput = createStore<string>("").on(
  changeMessageText,
  (prev, next) => next
);
export const sendMessage = createEvent<void>();
export const sendMessageFx = createEffect(({ text, room }) => {
  if (socket) {
    socket.send(JSON.stringify({ type: "message", data: { text, room } }));
  }
});

export const $isSendMessageDisabled = combine(
  { currConv: $currentConversationMessages },
  ({ currConv }) => {
    if (!currConv || currConv.length === 0) return false;
    const currTime = new Date().getTime();
    //TODO check ts update https://github.com/microsoft/TypeScript/issues/48829
    //@ts-expect-error
    const lastOwnMessage = currConv.findLast(
      (message: WSMessage) => message.isMe
    );
    if (!lastOwnMessage) return false;
    const lastMessageTime = new Date(lastOwnMessage.created_at).getTime();
    return currTime - lastMessageTime > oneDayInMs ? false : true;
  }
);

export const goToChatClicked = createEvent<GoToChat>();

export const createOrJoinConversationFx = createEffect<GoToChat, void>(
  (data) => {
    if (socket) {
      socket.send(
        JSON.stringify({
          type: "createOrJoinRoom",
          data,
        })
      );
    }
  }
);
