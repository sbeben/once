import { createRouteView } from "atomic-router-solid";
import { chatsRoute } from "@/shared/lib/routes";
import { Chat } from "@/components/Chat";

export const ChatsPage = createRouteView({
  route: chatsRoute,
  view() {
    return <Chat />;
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
