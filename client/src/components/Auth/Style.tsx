import { styled } from "solid-styled-components";

export const Container = styled("div")`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled("div")<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "auto" : "60%")};
  height: 50%;
  border: 0.3rem solid ${(props) => props.theme.color.black};
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  justify-content: space-evenly;
  align-items: center;
`;

export const LogoSection = styled("div")<{ isMobile: boolean }>`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled("h1")<{ isMobile: boolean }>`
  margin: 0;
  padding: 0;
  font-size: ${(props) => (props.isMobile ? "2.4rem" : "5rem")};
`;

export const Divider = styled("div")<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "80%" : "0.1rem")};
  height: ${(props) => (!props.isMobile ? "80%" : "0.1rem")};
  background-color: ${(props) => props.theme.color.black};
`;

export const FormSection = styled("div")`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
