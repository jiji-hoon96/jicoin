import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    liColor: string;
    accentColor: string;
    hoverColor: string;
    viewColor: string;
    nullColor: string;
  }
}
