import { Component, Match, Switch } from "solid-js";
import { Avatar } from "./Stye";

type Props = {
  type: "avatar";
  //src: string
};

export const Image: Component<Props> = (props) => {
  return (
    <Switch>
      <Match when={props.type === "avatar"}>
        <Avatar />
      </Match>
    </Switch>
  );
};
