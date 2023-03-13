import { styled } from "solid-styled-components";

export const Container = styled("div")`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const TopSection = styled("div")`
  display: flex;
  gap: 1rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.black};
`;

export const ReviewsSection = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
