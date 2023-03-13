import { Component } from "solid-js";
import { Wrapper } from "./Style";

export const TextSecondary: Component<{ children: string }> = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};
