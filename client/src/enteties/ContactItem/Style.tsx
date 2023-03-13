import { styled } from "solid-styled-components";

export const Container = styled("div")`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 4.6rem auto;
  gap: 0.4rem;
  grid-template-areas:
    "Pic Name"
    "Pic Message";
  white-space: nowrap;
  overflow: hidden;
`;

export const Pic = styled("div")`
  grid-area: Pic;
  max-width: 4.2rem;
  max-height: 4.2rem;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: black;
`;

export const Name = styled("p")`
  grid-area: Name;
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LastMessage = styled("p")`
  grid-area: Message;
  margin: 0;
  padding: 0;
  font-size: ${(props) => props.theme.font.size.small};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
