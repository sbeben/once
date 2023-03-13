import { router } from "@/App";
import { authRoute, chatsRoute } from "@/shared/lib/routes";
import { RouteParamsAndQuery } from "atomic-router";
import { sample } from "effector";
import { splitMap } from "patronum";
import {
  $conversations,
  $currentConversation,
  $currentConversationId,
  $currentConversationMessages,
  $isSendMessageDisabled,
  $messageTextInput,
  backFromChatToContacts,
  createOrJoinConversationFx,
  goToChatClicked,
  initWebsocketFx,
  selectConversation,
  sendMessage,
  sendMessageFx,
  webSocketConnectionFailed,
  webSocketMessageReceived,
} from ".";
import { WSConversation } from "./types";

// sample({
//   clock: chatsRoute.opened,
//   target: initWebsocketFx,
// });

sample({
  clock: webSocketConnectionFailed,
  fn: () => {
    return {} as RouteParamsAndQuery<{}>;
  },
  target: authRoute.navigate,
});

sample({
  clock: goToChatClicked,
  target: createOrJoinConversationFx,
});

sample({
  clock: backFromChatToContacts,
  target: $currentConversationId.reinit,
});

sample({
  clock: selectConversation,
  target: $currentConversationId,
});

const { roomList, roomCreated, roomJoined, roomMessage } = splitMap({
  source: webSocketMessageReceived,
  cases: {
    roomList: ({ type, data }) => {
      if (type === "roomList") return data;
    },
    roomCreated: ({ type, data }) => {
      if (type === "roomCreated") return data;
    },
    roomJoined: ({ type, data }) => {
      if (type === "roomJoined") return data;
    },
    roomMessage: ({ type, data }) => {
      if (type === "roomMessage") return data;
    },
  },
});

sample({
  clock: roomList,
  target: $conversations,
});

sample({
  clock: roomCreated,
  source: $conversations,
  fn: (rooms, newRoom) => [...rooms, newRoom],
  target: [
    $conversations,
    selectConversation.prepend(
      (newRooms: WSConversation[]) => newRooms.at(-1).id
    ),
    chatsRoute.navigate,
  ],
});

sample({
  clock: roomJoined,
  fn: ({ id }) => id,
  filter: $conversations.map((conv) => Boolean(conv)),
  target: [selectConversation, chatsRoute.navigate],
});

sample({
  clock: roomMessage,
  source: $conversations,
  fn: (rooms, message) => {
    const newRooms = rooms.map((room) => {
      if (room.id === message.room) {
        return { ...room, messages: [...room.messages, message] };
      }
      return room;
    });
    return newRooms;
  },
  target: $conversations,
});

sample({
  clock: sendMessage,
  source: { text: $messageTextInput, room: $currentConversation },
  fn: ({ text, room }) => ({ text, room: room.id }),
  target: sendMessageFx,
});

sample({
  clock: sendMessageFx.done,
  target: $messageTextInput.reinit,
});
