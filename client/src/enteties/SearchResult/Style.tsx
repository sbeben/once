import { styled } from "solid-styled-components";

export const Container = styled("div")`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Pic = styled("div")`
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  background-color: black;
`;

export const Name = styled("p")`
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
