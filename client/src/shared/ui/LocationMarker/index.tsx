// import { Component } from "solid-js";
// import { Marker } from "./Style";

// export const LocationMarker: Component = () => {
//   return <Marker />;
// };
export let LocationMarker: HTMLElement = document.createElement("div");
LocationMarker.style.cssText =
  "width:2rem;height:2rem;border-color:transparent;border-radius:50%;background-color:blue;transform:translate(-0.3rem,-0.3rem)";
