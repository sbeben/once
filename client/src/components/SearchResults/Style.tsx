import { styled } from "solid-styled-components";

export const Container = styled("div")<{ isMobile: boolean }>`
  height: 100%;
  position: ${(props) => (props.isMobile ? "relative" : "sticky")};
  ${(props) => !props.isMobile && `top:${props.theme.sizes.headerWithBorder}`};
  ${(props) => !props.isMobile && "left: 0"};
  width: ${(props) =>
    props.isMobile ? "100%" : props.theme.sizes.sidebarWidth};
  ${(props) =>
    props.isMobile && `border-right: 0.1rem solid ${props.theme.color.black}`};
  z-index: ${(props) => props.theme.zIndex.overlay};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
`;

export const Divider = styled("div")`
  width: 100%;
  height: 2rem;
  background-color: ${(props) => props.theme.color.grey};
  border: 0.1rem 0 0.1rem 0 solid ${(props) => props.theme.color.black};
  display: flex;
  align-items: center;
`;
