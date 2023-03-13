import { styled } from "solid-styled-components";

export const Avatar = styled("img")`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.black};
`;
