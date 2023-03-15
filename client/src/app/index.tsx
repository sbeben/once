import { Component, onCleanup, onMount } from "solid-js";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { useUnit } from "effector-solid";
import { RouterProvider, createRoutesView } from "atomic-router-solid";
import "@/model/api/init";
import "@/model/auth/init";
import "@/model/posts/init";
import "@/model/search/init";
import "@/model/profile/init";
import "@/model/conversations/init";
import {
  authRoute,
  chatsRoute,
  homeRoute,
  profileRoute,
  routes,
} from "@/shared/lib/routes";
import { AuthPage, HomePage } from "@/pages";
import { AppLayout } from "@/shared/ui/Layout";
import { ThemeProvider } from "solid-styled-components";
import { theme } from "@/shared/ui/Style/theme";
import { GlobalStyles } from "@/shared/ui/Style/global";
import { ProfilePage } from "@/pages/profile";
import { ChatsPage } from "@/pages/chats";
import { AppGate, setWindowSize } from "@/model/api";
import { $isSearching } from "@/model/search";

export const router = createHistoryRouter({ routes });
const history = createBrowserHistory();
router.setHistory(history);

const RoutesView = createRoutesView({
  routes: [
    { route: homeRoute, view: HomePage },
    { route: profileRoute, view: ProfilePage, layout: AppLayout },
    { route: chatsRoute, view: ChatsPage, layout: AppLayout },
    { route: authRoute, view: AuthPage },
  ],
  otherwise() {
    return <div>Page not found!</div>;
  },
});

// sample({
//   clock: router.initialized,
//   target: initWebsocketFx,
// });

// sample({
//   clock: router.routeNotFound,
//   fn: () => ({} as RouteParamsAndQuery<RouteParams>),
//   target: mapRoute.navigate,
// });

const App: Component = () => {
  const handleResize = (event: Event) => {
    setWindowSize({ height: window.innerHeight, width: window.innerWidth });
  };

  onMount(() => {
    window.addEventListener("resize", handleResize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", handleResize);
  });

  return (
    <RouterProvider router={router}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppGate />
        <RoutesView />
      </ThemeProvider>
    </RouterProvider>
  );
};

export default App;
