import { styled } from "solid-styled-components";

export const DesktopContainer = styled("div")`
  width: 100%;
  min-height: 100%;
  height: 100%;
  display: flex;
`;

export const ContactsContainer = styled("div")<{ isMobile: boolean }>`
  height: 100%;
  position: sticky;
  top: 5rem;
  left: 0;
  width: ${(props) => (props.isMobile ? "100%" : "32rem")};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-right: ${(props) =>
    !props.isMobile ? `0.1rem solid ${props.theme.color.black}` : "none"};
`;
export const Contact = styled("div")``;
export const ContactName = styled("div")`
  //padding-left: 1rem;
`;

export const ChatContainer = styled("div")`
  //width: 100vw;
  //height: calc(100vh - 5rem);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;
// export const CurrentChatBar = styled("div")`
//   padding: 0.8rem 1rem 1rem 4rem;
//   border-bottom: 0.1rem solid ${(props) => props.theme.color.black};
// `;

export const MessagesSection = styled("div")`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  /* display: flex;
  flex-direction: column; */
`;

export const NoConversation = styled("div")`
  font-size: ${(props) => props.theme.font.size.largeX};
`;
export const Message = styled("div")<{ own: boolean }>`
  padding: 0 1rem 1rem 1rem;
  /* //margin: 1rem; */
  /* width: 70%; */
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: ${(props) => (!props.own ? "flex-start" : "flex-end")};
`;

export const TextContainer = styled("div")<{ own: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-direction: ${(props) => (props.own === true ? "row-reverse" : "row")};
`;

export const Text = styled("p")<{ own: boolean }>`
  margin: 0;
  padding: 1.4rem 2.4rem;
  width: auto;
  max-width: 70%;
  text-align: "left";
  border: 0.1rem solid
    ${(props) =>
      props.own ? props.theme.color.black : props.theme.color.white};
  background-color: ${(props) =>
    !props.own ? props.theme.color.black : props.theme.color.white};
  color: ${(props) =>
    props.own ? props.theme.color.black : props.theme.color.white};
`;
export const Sender = styled("p")``;
export const InputSection = styled("div")`
  width: 100%;
  display: flex;
`;
