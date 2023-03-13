import { Component, JSX } from "solid-js";
import { Area } from "./Style";

type Props = {
  value: string;
  placeholder?: string;
  onChange: JSX.EventHandlerUnion<HTMLTextAreaElement, Event>;
};

export const Textarea: Component<Props> = (props) => {
  return (
    <Area
      value={props.value || ""}
      placeholder={props.placeholder || ""}
      onChange={props.onChange}
    />
  );
};
