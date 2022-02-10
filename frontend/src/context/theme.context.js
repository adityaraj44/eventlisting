import { useToast } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const toast = useToast();
  const [nltheme, setNlTheme] = useState(true);
  const [ndtheme, setNdTheme] = useState(false);
  const [dltheme, setDlTheme] = useState(false);
  const [ddtheme, setDdTheme] = useState(false);
  const [themeColors, setThemeColors] = useState({
    backgroundPrimary: "#ffffff",
    backgroundSecondary: "#121212",
  });

  const toggleNlTheme = async () => {
    if (nltheme === true) {
      return;
    } else {
      setNlTheme(true);
      toast({
        title: "Theme Changed",
        description: "Naruto light theme enabled",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setThemeColors({
        ...themeColors,
        backgroundPrimary: "#ffffff",
        backgroundSecondary: "#121212",
      });

      setNdTheme(false);
      setDlTheme(false);
      setDdTheme(false);
    }
  };
  const toggleNdTheme = () => {
    if (ndtheme === true) {
      return;
    } else {
      setNlTheme(false);
      setNdTheme(true);
      toast({
        title: "Theme Changed",
        description: "Naruto dark theme enabled",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setThemeColors({
        backgroundPrimary: "#121212",
        backgroundSecondary: "#1a1a1a",
      });
      setDlTheme(false);
      setDdTheme(false);
    }
  };
  const toggleDlTheme = () => {
    if (dltheme === true) {
      return;
    } else {
      setNlTheme(false);
      setNdTheme(false);
      setDlTheme(true);
      setThemeColors({
        backgroundPrimary: "#ffffff",
        backgroundSecondary: "#121212",
      });
      toast({
        title: "Theme Changed",
        description: "Demon slayer light theme enabled",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setDdTheme(false);
    }
  };
  const toggleDdTheme = () => {
    if (ddtheme === true) {
      return;
    } else {
      setNlTheme(false);
      setNdTheme(false);
      setDlTheme(false);
      setDdTheme(true);
      setThemeColors({
        backgroundPrimary: "#121212",
        backgroundSecondary: "#1a1a1a",
      });
      toast({
        title: "Theme Changed",
        description: "Demon slayer dark theme enabled",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        nltheme,
        ndtheme,
        dltheme,
        ddtheme,
        toggleNlTheme,
        toggleNdTheme,
        toggleDlTheme,
        toggleDdTheme,
        themeColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
