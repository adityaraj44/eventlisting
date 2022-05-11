import React, { useContext, useState } from "react";
import {
  Container,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  SmallCloseIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { FiLogIn } from "react-icons/fi";

import { useMediaQuery } from "../custom-hooks";
import ThemeContext from "../../context/theme.context";
import UserContext from "../../context/user.context";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const { loginUser } = userContext;
  document.title = "evme - Login";
  const themeContext = useContext(ThemeContext);
  const {
    nltheme,
    ndtheme,

    ddtheme,
  } = themeContext;

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [isValidUsername, setisValidUsername] = useState(null);
  const [isValidPassword, setisValidPassword] = useState(null);
  const [show, setShow] = useState(false);
  const handleShowClick = () => setShow(!show);

  const validateUsername = (username) => {
    if (username.length < 5) {
      setisValidUsername(false);
    } else {
      setisValidUsername(true);
    }
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setisValidPassword(false);
    } else {
      setisValidPassword(true);
    }
  };

  const onUsernameChange = (e) => {
    setCredentials({
      ...credentials,
      username: e.target.value,
    });
  };
  const onPasswordChange = (e) => {
    setCredentials({
      ...credentials,
      password: e.target.value,
    });
  };

  const onKeyUsernameCapture = (e) => {
    validateUsername(credentials.username);
  };
  const onKeyPasswordCapture = (e) => {
    validatePassword(credentials.password);
  };

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const onLoginHandleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (credentials.username.length < 5 || credentials.password.length < 6) {
      toast({
        title: "Error",
        description: "Username or password length requirement not met",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } else {
      await loginUser(credentials);
      setIsLoading(false);
      if (localStorage.getItem("token")) {
        history.push("/events");
      }
    }
  };

  return (
    <Container
      shadow={`${isMobile ? "" : "base"}`}
      rounded="lg"
      maxW="2xl"
      mt="55"
      mb="55"
      p="1"
    >
      <Box mx="8">
        <Heading
          mt="5"
          fontWeight="thin"
          letterSpacing="tighter"
          mb="3"
          textAlign="left"
          color={darkTheme ? "white" : "naruto.black"}
          as="h1"
        >
          <span>
            <Heading
              display="inline"
              color={narutoTheme ? "naruto.orange" : "demon.green"}
            >
              L
            </Heading>
          </span>
          OGIN
        </Heading>
        <Divider />
      </Box>

      <Box my="16" mx="8">
        <form>
          <FormControl mb="10" isRequired>
            <FormLabel
              fontWeight="semibold"
              color={darkTheme ? "white" : "naruto.black"}
              mb="4"
              htmlFor="username"
            >
              Username
            </FormLabel>
            <InputGroup>
              <Input
                fontWeight="light"
                size="md"
                color={darkTheme ? "gray.300" : "naruto.black"}
                value={credentials.username}
                minLength={5}
                focusBorderColor={narutoTheme ? "naruto.yellow" : "demon.pink"}
                onChange={onUsernameChange}
                variant={darkTheme ? "outline" : "filled"}
                placeholder="Your unique username"
                id="username"
                name="username"
                type="text"
                onKeyUpCapture={onKeyUsernameCapture}
                onBlur={() => setisValidUsername(null)}
              />

              {isValidUsername && (
                <InputRightElement
                  my="auto"
                  children={<CheckCircleIcon color="green.600" />}
                />
              )}
              {isValidUsername === false && (
                <InputRightElement
                  my="auto"
                  children={<SmallCloseIcon size="sm" color="naruto.red" />}
                />
              )}
            </InputGroup>
            {isValidUsername === false && (
              <FormHelperText color="naruto.red" mt="4">
                Your username should be unique and atleast 5 characters
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb="10" isRequired>
            <FormLabel
              fontWeight="semibold"
              color={darkTheme ? "white" : "naruto.black"}
              mb="4"
              htmlFor="password"
            >
              Password
            </FormLabel>
            <InputGroup>
              <Input
                fontWeight="light"
                size="md"
                color={darkTheme ? "gray.300" : "naruto.black"}
                minLength={6}
                value={credentials.password}
                focusBorderColor={narutoTheme ? "naruto.yellow" : "demon.pink"}
                onChange={onPasswordChange}
                variant={darkTheme ? "outline" : "filled"}
                placeholder="Your password"
                id="password"
                name="password"
                type={show ? "text" : "password"}
                onKeyUpCapture={onKeyPasswordCapture}
                onBlur={() => setisValidPassword(null)}
              />
              <InputRightElement width="5" mr="3">
                <IconButton
                  bgColor={narutoTheme ? "naruto.orange" : "demon.green"}
                  color={"white"}
                  size="sm"
                  onClick={handleShowClick}
                  icon={
                    !show ? (
                      <ViewOffIcon fontSize="15" />
                    ) : (
                      <ViewIcon fontSize="15" />
                    )
                  }
                  _hover={{
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                  _active={{
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                />
              </InputRightElement>
              {isValidPassword && (
                <InputRightElement
                  my="auto"
                  mr="8"
                  children={<CheckCircleIcon color="green.600" />}
                />
              )}
              {isValidPassword === false && (
                <InputRightElement
                  my="auto"
                  mr="8"
                  children={<SmallCloseIcon color="naruto.red" />}
                />
              )}
            </InputGroup>
            {isValidPassword === false && (
              <FormHelperText color="naruto.red" mt="4">
                Password length should be atleast 6 characters
              </FormHelperText>
            )}

            <ButtonGroup
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                fontWeight="medium"
                isLoading={isLoading}
                mt="10"
                type="submit"
                bgColor={narutoTheme ? "naruto.orange" : "demon.pink"}
                color="white"
                variant="solid"
                _hover={{
                  bgColor: `${narutoTheme ? "naruto.red" : "demon.blue"}`,
                }}
                _active={{
                  bgColor: `${narutoTheme ? "naruto.red" : "demon.blue"}`,
                }}
                rightIcon={<FiLogIn />}
                onClick={onLoginHandleSubmit}
              >
                Login
              </Button>
              <Button
                fontWeight="medium"
                onClick={() =>
                  setCredentials({
                    username: "",
                    password: "",
                  })
                }
                mt="10"
                rightIcon={<SmallCloseIcon fontSize="lg" />}
                type="reset"
                bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                color="white"
                variant="solid"
                _hover={{
                  bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                }}
                _active={{
                  bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                }}
              >
                Clear
              </Button>
            </ButtonGroup>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
