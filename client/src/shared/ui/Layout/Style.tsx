import { styled } from "solid-styled-components";

export const Wrapper = styled("div")`
  height: 100%;
`;

export const Wrap = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const Head = styled("div")`
  height: ${(props) => props.theme.sizes.headerHeight};
  padding: 0.8rem 1rem 1rem 4rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.black};
`;

export const Container = styled("div")<{ isMobile: boolean }>`
  width: 100%;
  height: ${(props) =>
    props.isMobile ? "calc(100vh - 10rem)" : "calc(100vh - 5rem)"};
`;

export const MenuContainer = styled("div")`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 1rem 0 1rem;
`;
