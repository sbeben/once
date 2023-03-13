import { Component, JSX } from "solid-js";
import { StyledOption, StyledSelect } from "./Style";

type Props = {
  name: string;
  value: string | number;
  id?: string;
  options: (string | number)[];
  onChange: JSX.EventHandler<HTMLSelectElement, InputEvent>;
};

export const Select: Component<Props> = (props) => {
  return (
    <StyledSelect
      name={props.name}
      id={props.id || undefined}
      onChange={props.onChange}
      value={props.value}
    >
      {props.options.map((o) => {
        return <StyledOption>{o}</StyledOption>;
      })}
    </StyledSelect>
  );
};
