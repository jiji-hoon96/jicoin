import { makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const DARK_MODE = "DARK_MODE";
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};
