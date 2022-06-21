import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  buttonColor: "#dcdde1",
  defaultBoxColor: "black",
  fontColor: "#dcdde1",
  boxColor: "transparent",
  darkbgGradient : "linear-gradient(to right, #606c88, #3f4c6b)",
  loginColor: "white",
  errorColor : "orangered",
  marketColor: "#05133a",
};

export const lightTheme: DefaultTheme = {
  bgColor: "#dcdde1", //하얀색
  buttonColor: "#dcdde1", //하얀색
  defaultBoxColor: "white",
  fontColor: "#2f3640", // electromagnetic
  boxColor: "transparent", //Chain gang grey
  darkbgGradient:"linear-gradient(to top, #c9d6ff, #e2e2e2)",
  loginColor: "black",
  errorColor : "orangered",
  marketColor: "#0044ff",
};
