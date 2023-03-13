import { styled } from "solid-styled-components";

export const Container = styled("div")`
  position: sticky;
  top: 0;
  left: 0;
  height: 5rem;
  width: 100%;
  border-style: solid;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: ${(props) => props.theme.color.white};
  border-width: 0.3rem;
  border-color: ${(props) => props.theme.color.black};
  display: flex;
  align-items: center;
`;

export const Logo = styled("span")`
  font-size: ${(props) => props.theme.font.size.large};
  font-weight: ${(props) => props.theme.font.weight.bold};
  padding-left: 2rem;
  color: ${(props) => props.theme.color.black};
  cursor: pointer;
`;
