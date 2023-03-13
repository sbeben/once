import { Component, Match, Switch } from "solid-js";
import { BackButton } from "./Style";

export const Button: Component<{
  onClick: () => any;
  type: "regular" | "back" | "goToMap" | "revealCode";
  children?: string;
  disabled?: boolean;
}> = (props) => {
  return (
    <Switch>
      <Match when={props.type === "regular"}>
        <button onClick={props.onClick} disabled={props.disabled ?? false}>
          {props.children}
        </button>
      </Match>
      <Match when={props.type === "back"}>
        <BackButton
          onClick={props.onClick}
          disabled={props.disabled ?? false}
        >{`< `}</BackButton>
      </Match>
      <Match when={props.type === "goToMap"}>
        <button onClick={props.onClick} disabled={props.disabled ?? false}>
          {props.children}
        </button>
      </Match>
      <Match when={props.type === "revealCode"}>
        <button
          onClick={props.onClick}
          disabled={props.disabled ?? false}
        >{`Reveal code`}</button>
      </Match>
    </Switch>
  );
};
