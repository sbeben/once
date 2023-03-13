import { Input } from "@/shared/ui/Input";
import { Component, JSX } from "solid-js";
import { Container } from "./Style";

type Props = {
  value: string;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
};

export const SearchBar: Component<Props> = (props) => {
  return (
    <Container>
      <Input
        type="text"
        value={props.value}
        onInput={props.onInput}
        placeholder="search"
      />
    </Container>
  );
};
