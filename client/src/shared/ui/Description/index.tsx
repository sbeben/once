import { Component } from "solid-js";
import { Wrapper } from "./Style";

type Props = {
  children: string;
};

export const Description: Component<Props> = (props) => {
  return <Wrapper>{props.children}</Wrapper>;
};
