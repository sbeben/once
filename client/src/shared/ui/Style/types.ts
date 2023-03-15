import "solid-styled-components";

type Font = {
  family: {
    default: string;
  };
  weight: {
    regular: number;
    medium: number;
    bold: number;
  };
  style: {
    normal: string;
    italic: string;
    oblique: string;
    inherit: string;
  };
  size: {
    extraSmall: string;
    small: string;
    regular: string;
    default: string;
    medium: string;
    large: string;
    largeX: string;
    maxPlus: string;
  };
  letterSpacing: {
    extraSmall: string;
    small: string;
    min: string;
  };
  lineHeight: {
    extraSmall: number;
    smallerX: number;
    smaller: number;
    lowSmall: number;
    small: number;
    regular: number;
    medium: number;
    large: number;
    extraLarge: number;
  };
};

type ColorMap = {
  transparent: string;

  white: string;
  black: string;
  grey: string;

  text: string;
  textSecondary: string;
  textAdditional: string;

  button: string;
  pageBg: string;
  element: string;

  elementBg: string;
  elementBgSecond: string;
  elementBgThird: string;

  elementBorder: string;
  elementBorderSecond: string;
  elementBorderThird: string;

  default: string;
  defaultSecondary: string;
  primary: string;
  primarySecondary: string;

  pink: string;
  purple: string;
  irisBlue: string;
  trueBlue: string;

  success: string;
  warning: string;
  danger: string;

  modalBg: string;
  modalHeader: string;
  modalOverflow: string;

  disabled: string;

  gradientButton: string;
  gradientEvent: string;
  gradientMath: string;
  gradientPhysics: string;
  gradientLiterature: string;
  gradientBiology: string;
};

type BreakpointMap = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

type Opacity = {
  default: number;
  opacity09: number;
  opacity08: number;
  opacity07: number;
  opacity06: number;
  opacity05: number;
  opacity04: number;
  opacity03: number;
  opacity02: number;
  opacity01: number;
  invisible: number;
};

type ZIndex = {
  modal: number;
  modalContainer: number;
  overlay: number;
  navigation: number;
  preloader: number;
  minimal: number;
};

type Sizes = {
  headerHeight: string;
  menuHeight: string;
  headerWithBorder: string;
  sidebarWidth: string;
  sidebarWithBorder: string;
};

type WindowWidth = {
  desktop: number;
};

declare module "solid-styled-components" {
  export interface DefaultTheme {
    font: Font;
    zIndex: ZIndex;
    color: ColorMap;
    opacity: Opacity;
    sizes: Sizes;
    windowWidth: WindowWidth;
  }
}
