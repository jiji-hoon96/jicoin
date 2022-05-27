import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    buttonColor: string;
    hoverColor: string;
    fontColor: string;
    boxColor: string;
  }
}
