import { Component } from "solid-js";
import { Wrapper } from "./Style";

export const Title: Component<{ children: string }> = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};
