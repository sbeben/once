import { styled } from "solid-styled-components";

export const StyledInput = styled("input")`
  width: 100%;
  height: 100%;
  border: 0.1rem solid ${(props) => props.theme.color.black};
`;
