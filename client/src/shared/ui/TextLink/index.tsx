import { Component } from "solid-js";
import { Wrapper } from "./Style";

type Props = {
  children: string;
  onClick: () => any;
};

export const TextLink: Component<Props> = (props) => {
  return <Wrapper onClick={props.onClick}>{props.children}</Wrapper>;
};
