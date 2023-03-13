// import { color } from "./color";

import { DefaultTheme } from "solid-styled-components";

const palette = {
  transparent: "transparent",

  white: "#fff",
  whiteEasy: "#fcfcfd",
  whiteLight: "#f8f9fb",
  whiteRegular: "#f1f3f4",
  whiteMedium: "#f6fafe",
  whiteBold: "#f0f4f9",
  whiteHard: "#dbeaf4",
  whiteDark: "#96b0c2",

  black: "#000",
  black072: "hsla(201, 88%, 3%, 0.72)",

  grey: "#7d94a0",
  greyEasy: "#c7d4db",
  greyMedium: "#4b5b63",
  greyBold: "#272f34",

  blue: "#1aadff",
  blueMedium: "#00b2ff",
  blueHard: "#4491f9",

  blue08: "hsla(201, 100%, 55%, 0.08)",
  blue016: "hsla(201, 100%, 55%, 0.16)",
  blueHard016: "hsla(214, 94%, 62%, 0.16)",

  green: "#01d762",
  orange: "#ff9f0f",
  red: "#fb5248",

  pink: "#fa5bb0",
  purple: "#c070ff",
  irisBlue: "#3cc3d7",

  whiteGradient: "#FFF 23.44%, #f0f4f9 100%",
  greyGradient: "#f3f7fc 0%, #f7fafd 0.01%, #ecf1f8 100%",
  purpleGradient: "#C070FF 0%, #9C38FF 49.25%, #6B27FC 100%",
  blueGradient: "#00B2FF 0.31%, #0084FF 49.25%, #0048FF 100%",
  pinkGradient: "#FE81C4 0%, #FA5BB0 50.54%, #F83F86 100%",
  irisBlueGradient: "#64E3ED 0%, #3CC3D7 51.04%, #0DA2C9 100%",
};

export const color = {
  transparent: palette.transparent,

  white: palette.white,
  black: palette.black,

  text: palette.greyBold,
  textSecondary: palette.greyMedium,
  textAdditional: palette.grey,

  button: palette.blue,
  pageBg: palette.white,
  element: palette.whiteDark,

  elementBg: palette.whiteEasy,
  elementBgSecond: palette.whiteLight,
  elementBgThird: palette.whiteRegular,

  elementBorder: palette.whiteHard,
  elementBorderSecond: palette.greyBold,
  elementBorderThird: palette.grey,

  default: palette.blue,
  defaultSecondary: palette.blue08,
  primary: palette.blueMedium,
  primarySecondary: palette.blue016,

  pink: palette.pink,
  purple: palette.purple,
  irisBlue: palette.irisBlue,
  trueBlue: palette.blueHard,

  success: palette.green,
  warning: palette.orange,
  danger: palette.red,
  new: palette.blueHard,

  modalBg: palette.white,
  modalHeader: palette.whiteMedium,
  modalOverflow: palette.black072,

  // TODO: Change
  disabled: palette.greyEasy,

  gradientButton: palette.whiteGradient,
  gradientEvent: palette.greyGradient,
  gradientMath: palette.purpleGradient,
  gradientPhysics: palette.blueGradient,
  gradientLiterature: palette.pinkGradient,
  gradientBiology: palette.irisBlueGradient,

  // TODO: PlaceholderLoading
  // placeholderLoading: palette.whiteGradient,
  // placeholderLoadingDark: palette.greyGradient,
  // placeholderLoadingDefault: palette.blueGradient,
};

export const font = {
  family: {
    default: `'DM Sans'`,
  },
  weight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  style: {
    normal: "normal",
    italic: "italic",
    oblique: "oblique",
    inherit: "inherit",
  },
  size: {
    extraSmall: "1.2rem",
    small: "1.3rem",
    regular: "1.4rem",
    default: "1.6rem",
    medium: "2rem",
    large: "2.2rem",
    largeX: "2.4rem",
    maxPlus: "3.8rem",
  },
  letterSpacing: {
    extraSmall: "-0.075rem",
    small: "-0.05rem",
    min: "0.01em",
  },
  lineHeight: {
    extraSmall: 1,
    smallerX: 1.15,
    smaller: 1.25,
    lowSmall: 1.3,
    small: 1.5,
    regular: 2,
    medium: 2.5,
    large: 3,
    extraLarge: 3.5,
  },
};

export const opacity = {
  default: 1,
  opacity09: 0.9,
  opacity08: 0.8,
  opacity07: 0.7,
  opacity06: 0.6,
  opacity05: 0.5,
  opacity04: 0.4,
  opacity03: 0.3,
  opacity02: 0.2,
  opacity01: 0.1,
  invisible: 0,
};

export const zIndex = {
  modal: 6,
  modalContainer: 5,
  overlay: 4,
  navigation: 3,
  preloader: 2,
  minimal: 1,
  negative: -1,
};

export const sizes = {
  headerHeight: "6rem",
  menuHeight: "5rem",
};

// export const breakpoints = generateMedia({
//   xs: '22.5em', // 360
//   xsm: '32.5em', // 520
//   sm: '48em', // 768
//   md: '64em', // 1024
//   lg: '76.5em', // 1224
//   xl: '90em', // 1440
//   xxl: '240em', // 3840
//   xxxl: '320em', // 5120
//   extraXl: '480em', // 7680
// })

export const windowWidth = {
  desktop: 768,
};

export const theme: DefaultTheme = {
  font,
  color,
  zIndex,
  opacity,
  sizes,
  windowWidth,
  //  breakpoints,
};
