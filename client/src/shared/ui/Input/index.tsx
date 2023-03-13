import { Component, JSX } from "solid-js";
import { StyledInput } from "./Style";
type Props = {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  value?: string | number;
  placeholder?: string;
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>;
};

export const Input: Component<Props> = (props) => {
  return (
    <StyledInput
      type={props.type}
      placeholder={props.placeholder || ""}
      value={props.value}
      onInput={props.onInput}
    />
  );
};
