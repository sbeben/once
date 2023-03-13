import { theme } from "@/shared/ui/Style/theme";
import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-solid";
import { initWebsocketFx } from "../conversations";

export const AppGate = createGate();

export const setWindowSize = createEvent<{ height: number; width: number }>();
export const $windowSize = createStore<{ height: number; width: number }>({
  height: window.innerHeight,
  width: window.innerWidth,
});
export const $isMobile = $windowSize.map(({ height, width }) => {
  return width < theme.windowWidth.desktop ? true : false;
});
