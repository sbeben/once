import { styled } from "solid-styled-components";

export const Container = styled("div")`
  border: 0.1rem solid ${(props) => props.theme.color.black};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TopSection = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PicAndName = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Icons = styled("div")``;

export const MiddleSection = styled("div")``;

export const BottomSection = styled("div")``;
