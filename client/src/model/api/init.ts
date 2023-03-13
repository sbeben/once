import { sample } from "effector";
import { $windowSize, AppGate, setWindowSize } from ".";
import { initWebsocketFx } from "../conversations";

sample({
  clock: AppGate.open,
  target: initWebsocketFx,
});

sample({
  clock: setWindowSize,
  target: $windowSize,
});
