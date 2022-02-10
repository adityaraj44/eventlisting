import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import ThemeContext from "../../context/theme.context";

const Footer = () => {
  const themeContext = useContext(ThemeContext);
  const {
    nltheme,
    ndtheme,

    ddtheme,
  } = themeContext;

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;
  return (
    <Box
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="center"
      mb={15}
    >
      <Text
        mt="5"
        mb="5"
        mr="1"
        fontSize="sm"
        fontWeight="semibold"
        color={darkTheme ? "white" : "naruto.black"}
        textAlign="center"
      >
        Made in India by
      </Text>
      <Text
        fontWeight="bold"
        fontSize="sm"
        color={narutoTheme ? "naruto.red" : "demon.green"}
        mt="5"
        mb="5"
        textAlign="center"
      >
        Aditya Raj
      </Text>
    </Box>
  );
};

export default Footer;
