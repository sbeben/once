import { createGlobalStyles } from "solid-styled-components";
import { color, font } from "./theme";

export const GlobalStyles = () => {
  const Styles = createGlobalStyles`
  html,
  body,
  #root {
    font-family: ${font.family.default};
  }
  html {
    box-sizing: border-box;
    min-height: 100vh;
    font-size: 62.5%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    margin: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    display: grid;
    min-height: 100vh;
    font-size: ${font.size.default};
    line-height: 1.5;
    color: ${color.text};
    background-color: ${color.pageBg};
    overflow-x: visible;
  }
  b {
    font-weight: ${font.weight.bold};
  }
  small {
    font-size: ${font.size.regular};
  }
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
    -webkit-text-decoration-skip: objects;
  }
  h1 {
    font-weight: ${font.weight.bold};
    font-size: ${font.size.maxPlus};
  }
  button {
    font-family: ${font.family.default};
    font-weight: ${font.weight.bold};
  }
  input {
    appearance: none;
  }
  input[type="search"]::-webkit-search-cancel-button,
  input[type="time"]::-webkit-calendar-picker-indicator,
  input[type="date"]::-webkit-calendar-picker-indicator,
  input[type="week"]::-webkit-calendar-picker-indicator,
  input[type="month"]::-webkit-calendar-picker-indicator,
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    display: none;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-font-feature-settings: "liga", "clig", "calt";
    -ms-font-feature-settings: "liga", "clig", "calt";
    -webkit-font-feature-settings: "liga", "clig", "calt";
    font-feature-settings: "liga", "clig", "calt";
    text-rendering: optimizeLegibility;
  }
  img {
    border-style: none;
  }
  video {
    width: 100%;
  }  
  `;
  return <Styles />;
};
/* TODO: add local path */
/* ${breakpoints.greaterThan("xxl")`
      font-size: calc(62.5% * 2.6);
    `};
    ${breakpoints.greaterThan("xxxl")`
      font-size: calc(62.5% * 3);
    `};
    ${breakpoints.greaterThan("extraXl")`
      font-size: calc(62.5% * 5.2);
    `}; 

@font-face {
    font-family: ${font.family.default};
    font-style: normal;
    font-weight: ${font.weight.regular};
    font-display: swap;
    src: url(${fonts.DMSansRegularWoff2}) format('woff2')
  }
  @font-face {
    font-family: ${font.family.default};
    font-style: normal;
    font-weight: ${font.weight.medium};
    font-display: swap;
    src: url(${fonts.DMSansMediumWoff2}) format('woff2')
  }
  @font-face {
    font-family: ${font.family.default};
    font-style: normal;
    font-weight: ${font.weight.bold};
    font-display: swap;
    src: url(${fonts.DMSansBoldWoff2}) format('woff2')
  }*/
