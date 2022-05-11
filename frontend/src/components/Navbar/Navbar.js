import React, { useContext, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonGroup,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  MenuGroup,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillHeart } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import { MdSpeakerNotes } from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import {
  useOpenAlertState,
  useOpenDrawerState,
  useMediaQuery,
} from "../custom-hooks";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import ThemeContext from "../../context/theme.context";
import UserContext from "../../context/user.context";

const Navbar = () => {
  const history = useHistory();

  const userContext = useContext(UserContext);
  const { logoutUser, like, currentUser, getCurrentUser } = userContext;
  const themeContext = useContext(ThemeContext);
  const {
    nltheme,
    ndtheme,
    dltheme,
    ddtheme,
    toggleNlTheme,
    toggleNdTheme,
    toggleDlTheme,
    toggleDdTheme,
    themeColors,
  } = themeContext;

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;

  const { pathname } = useLocation();
  const { isAlertOpen, openAlert, closeAlert } = useOpenAlertState();

  const { isDrawerOpen, openDrawer, closeDrawer } = useOpenDrawerState();

  const isMobile = useMediaQuery("(max-width: 768px)");
  document.body.style.backgroundColor = `${themeColors.backgroundPrimary}`;

  const onHandleLogout = async () => {
    await logoutUser();
    history.push("/login");
    closeDrawer();
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/signup") {
      getCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleLike = async () => {
    await like();
    closeAlert();
  };

  return (
    <>
      <Flex
        style={{
          backgroundColor: `${darkTheme ? "#1a1a1a" : "white"}`,
        }}
        shadow="base"
        alignItems="center"
        padding="4"
      >
        <Box>
          <Link to="/">
            <Heading
              marginLeft="4"
              as="h1"
              cursor="pointer"
              size="lg"
              letterSpacing="wide"
              color={darkTheme ? "white" : "naruto.black"}
            >
              <span>
                <Heading
                  color={narutoTheme ? "naruto.red" : "demon.green"}
                  display="inline"
                  as="h1"
                  size="lg"
                >
                  ev
                </Heading>
              </span>
              me
            </Heading>
          </Link>
        </Box>

        <Spacer />
        <Box>
          {currentUser !== null && (
            <Tooltip
              label={
                currentUser.liked
                  ? "You've liked this website"
                  : "Like this website"
              }
            >
              <IconButton
                bgColor={
                  darkTheme
                    ? currentUser.liked
                      ? "naruto.red"
                      : "#1a1a1a"
                    : currentUser.liked
                    ? "naruto.red"
                    : "white"
                }
                color={
                  darkTheme
                    ? currentUser.liked
                      ? "white"
                      : "naruto.red"
                    : currentUser.liked
                    ? "white"
                    : "naruto.red"
                }
                mr="3"
                border={currentUser.liked ? "" : "1px"}
                size="sm"
                onClick={openAlert}
                icon={<AiFillHeart size="1.2em" />}
                _hover={{
                  bgColor: "naruto.red",
                  color: `white`,
                }}
                _active={{
                  bgColor: "naruto.red",
                  color: `white`,
                }}
              />
            </Tooltip>
          )}

          <Link to="/">
            <IconButton
              disabled={pathname === "/"}
              bgColor={narutoTheme ? "naruto.orange" : "demon.green"}
              color="white"
              mr="3"
              size="sm"
              icon={<AddIcon />}
              _hover={{
                color: "white",
                bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
              }}
              _active={{
                color: "white",
                bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
              }}
            />
          </Link>

          <AlertDialog
            motionPreset="slideInRight"
            onClose={closeAlert}
            isOpen={isAlertOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent
              style={{
                color: `${darkTheme ? "white" : ""}`,
                backgroundColor: `${darkTheme ? "#1a1a1a" : ""}`,
              }}
              marginX={`${isMobile ? "2" : ""}`}
              border={darkTheme ? "1px" : ""}
              borderColor={darkTheme ? "gray.600" : ""}
            >
              <AlertDialogHeader
                color={narutoTheme ? "naruto.red" : "demon.green"}
              >
                Like this website?
              </AlertDialogHeader>

              <AlertDialogCloseButton />
              <AlertDialogBody>
                You can like this website whenever you want.
              </AlertDialogBody>
              <AlertDialogFooter display="flex" flexWrap="wrap">
                <Button
                  bgColor={narutoTheme ? "naruto.blue" : "demon.pink"}
                  mb={2}
                  color="white"
                  fontWeight="medium"
                  ml={3}
                  _hover={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.black" : "demon.blue"}`,
                  }}
                  _active={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.black" : "demon.blue"}`,
                  }}
                  onClick={closeAlert}
                >
                  No, I am not sure
                </Button>
                <Button
                  onClick={onHandleLike}
                  bgColor={narutoTheme ? "naruto.orange" : "demon.green"}
                  mb={2}
                  color="white"
                  fontWeight="medium"
                  ml={3}
                  _hover={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                  _active={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                >
                  Yes, I like it.
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {!isMobile && (
            <>
              <Menu closeOnSelect={true} autoSelect={false}>
                <MenuButton
                  marginRight="3"
                  as={IconButton}
                  size="sm"
                  icon={<IoMdColorPalette />}
                  bgColor={narutoTheme ? "naruto.orange" : "demon.green"}
                  color="white"
                  _hover={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                  _active={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                ></MenuButton>
                <MenuList
                  border={darkTheme ? "1px" : ""}
                  borderColor={darkTheme ? "gray.600" : ""}
                  backgroundColor={darkTheme ? "#1a1a1a" : "white"}
                  color={darkTheme ? "white" : "naruto.black"}
                >
                  <MenuGroup title="Naruto" fontSize="lg" color="naruto.red">
                    <MenuItem
                      onClick={toggleNlTheme}
                      icon={
                        nltheme === true ? <CheckIcon color="green.400" /> : ""
                      }
                      _hover={{
                        color: "white",
                        bgColor: "naruto.red",
                      }}
                      _active={{
                        color: "white",
                        bgColor: "naruto.red",
                      }}
                      _selected={{
                        color: "white",
                        bgColor: "naruto.red",
                      }}
                    >
                      Light mode
                    </MenuItem>
                    <MenuItem
                      icon={
                        ndtheme === true ? <CheckIcon color="green.400" /> : ""
                      }
                      onClick={toggleNdTheme}
                      _hover={{
                        color: "white",
                        bgColor: "naruto.red",
                      }}
                      _active={{
                        color: "white",
                        bgColor: "naruto.red",
                      }}
                      _selected={{
                        color: "white",
                        bgColor: "naruto.red",
                      }}
                    >
                      Dark mode
                    </MenuItem>
                  </MenuGroup>
                  <MenuGroup
                    title="Demon Slayer"
                    color="demon.green"
                    fontSize="lg"
                  >
                    <MenuItem
                      icon={
                        dltheme === true ? <CheckIcon color="green.400" /> : ""
                      }
                      onClick={toggleDlTheme}
                      _hover={{
                        color: "white",
                        bgColor: "demon.pink",
                      }}
                      _active={{
                        color: "white",
                        bgColor: "demon.pink",
                      }}
                      _selected={{
                        color: "white",
                        bgColor: "demon.pink",
                      }}
                    >
                      Light Mode
                    </MenuItem>
                    <MenuItem
                      icon={
                        ddtheme === true ? <CheckIcon color="green.400" /> : ""
                      }
                      onClick={toggleDdTheme}
                      _hover={{
                        color: "white",
                        bgColor: "demon.pink",
                      }}
                      _active={{
                        color: "white",
                        bgColor: "demon.pink",
                      }}
                      _selected={{
                        color: "white",
                        bgColor: "demon.pink",
                      }}
                    >
                      Dark mode
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
              <Link to="/events">
                <Button
                  fontWeight="medium"
                  mr="3"
                  color="white"
                  bgColor={narutoTheme ? "naruto.orange" : "demon.green"}
                  _hover={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                  _active={{
                    color: "white",
                    bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  }}
                  leftIcon={<MdSpeakerNotes />}
                >
                  Events
                </Button>
              </Link>

              <ButtonGroup isAttached variant="solid" mr="4">
                {localStorage.getItem("token") ? (
                  <Button
                    onClick={onHandleLogout}
                    size="md"
                    bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                    color={"white"}
                    fontWeight="medium"
                    _selected={{
                      bgColor: `${
                        narutoTheme ? "naruto.black" : "demon.orange"
                      }`,
                      color: "white",
                    }}
                    _hover={{
                      bgColor: `${
                        narutoTheme ? "naruto.black" : "demon.orange"
                      }`,
                      color: "white",
                    }}
                    _active={{
                      bgColor: `${
                        narutoTheme ? "naruto.black" : "demon.orange"
                      }`,
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    {" "}
                    <Link to="/login">
                      <Button
                        size="md"
                        bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                        color={"white"}
                        fontWeight="medium"
                        _selected={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                          color: "white",
                        }}
                        _hover={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                          color: "white",
                        }}
                        _active={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                          color: "white",
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        size="md"
                        bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                        color={"white"}
                        fontWeight="medium"
                        _selected={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                          color: "white",
                        }}
                        _hover={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                          color: "white",
                        }}
                        _active={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                          color: "white",
                        }}
                        ml="1"
                      >
                        Signup
                      </Button>
                    </Link>{" "}
                  </>
                )}
              </ButtonGroup>
            </>
          )}
        </Box>
        {isMobile && (
          <IconButton
            onClick={openDrawer}
            variant="ghost"
            color={darkTheme ? "white" : ""}
            icon={<BiMenuAltRight size="1.5rem" />}
          />
        )}
      </Flex>

      <Drawer
        isOpen={isDrawerOpen}
        isFullHeight
        placement="right"
        onClose={closeDrawer}
        size="full"
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent
          style={{
            backgroundColor: `${darkTheme ? "#1a1a1a" : "white"}`,
          }}
        >
          <DrawerCloseButton
            mt="4"
            color={narutoTheme ? "naruto.red" : "demon.green"}
            size="lg"
          />
          <DrawerHeader>
            <Link onClick={() => closeDrawer()} to="/">
              <Heading
                marginLeft="5"
                marginTop="4"
                as="h1"
                size="xl"
                letterSpacing="wide"
                color={darkTheme ? "white" : "naruto.black"}
              >
                <span>
                  <Heading
                    color={narutoTheme ? "naruto.red" : "demon.green"}
                    display="inline"
                    as="h1"
                    size="xl"
                  >
                    ev
                  </Heading>
                </span>
                me
              </Heading>
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <Link to="/events" onClick={() => closeDrawer()}>
              <Button
                fontWeight="medium"
                ml="5"
                mt="5"
                color="white"
                display="block"
                bgColor={narutoTheme ? "naruto.orange" : "demon.pink"}
                _hover={{
                  bgColor: `${narutoTheme ? "naruto.red" : "demon.blue"}`,
                  color: "white",
                }}
                _active={{
                  bgColor: `${narutoTheme ? "naruto.red" : "demon.blue"}`,
                  color: "white",
                }}
                leftIcon={<MdSpeakerNotes />}
              >
                Events
              </Button>
            </Link>
            <Menu autoSelect={false}>
              <MenuButton
                marginLeft="5"
                mt="5"
                display="block"
                as={Button}
                fontWeight="medium"
                size="lg"
                rightIcon={<ChevronDownIcon />}
                variant="solid"
                color={"white"}
                bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                _hover={{
                  bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                  color: "white",
                }}
                _active={{
                  bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                  color: "white",
                }}
              >
                Change theme
              </MenuButton>
              <MenuList
                border={darkTheme ? "1px" : ""}
                borderColor={darkTheme ? "gray.600" : ""}
                backgroundColor={darkTheme ? "#1a1a1a" : "white"}
                color={darkTheme ? "white" : "naruto.black"}
              >
                <MenuGroup title="Naruto" fontSize="lg" color="naruto.red">
                  <MenuItem
                    onClick={toggleNlTheme}
                    icon={
                      nltheme === true ? <CheckIcon color="green.400" /> : ""
                    }
                    _hover={{
                      color: "white",
                      bgColor: "naruto.red",
                    }}
                    _active={{
                      color: "white",
                      bgColor: "naruto.red",
                    }}
                    _selected={{
                      color: "white",
                      bgColor: "naruto.red",
                    }}
                  >
                    Light mode
                  </MenuItem>
                  <MenuItem
                    icon={
                      ndtheme === true ? <CheckIcon color="green.400" /> : ""
                    }
                    onClick={toggleNdTheme}
                    _hover={{
                      color: "white",
                      bgColor: "naruto.red",
                    }}
                    _active={{
                      color: "white",
                      bgColor: "naruto.red",
                    }}
                    _selected={{
                      color: "white",
                      bgColor: "naruto.red",
                    }}
                  >
                    Dark mode
                  </MenuItem>
                </MenuGroup>
                <MenuGroup
                  title="Demon Slayer"
                  color="demon.green"
                  fontSize="lg"
                >
                  <MenuItem
                    icon={
                      dltheme === true ? <CheckIcon color="green.400" /> : ""
                    }
                    onClick={toggleDlTheme}
                    _hover={{
                      color: "white",
                      bgColor: "demon.pink",
                    }}
                    _active={{
                      color: "white",
                      bgColor: "demon.pink",
                    }}
                    _selected={{
                      color: "white",
                      bgColor: "demon.pink",
                    }}
                  >
                    Light Mode
                  </MenuItem>
                  <MenuItem
                    icon={
                      ddtheme === true ? <CheckIcon color="green.400" /> : ""
                    }
                    onClick={toggleDdTheme}
                    _hover={{
                      color: "white",
                      bgColor: "demon.pink",
                    }}
                    _active={{
                      color: "white",
                      bgColor: "demon.pink",
                    }}
                    _selected={{
                      color: "white",
                      bgColor: "demon.pink",
                    }}
                  >
                    Dark mode
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>

            <ButtonGroup>
              {localStorage.getItem("token") ? (
                <Button
                  onClick={onHandleLogout}
                  size="lg"
                  mt="5"
                  marginLeft="5"
                  fontWeight="medium"
                  color="white"
                  bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                  _selected={{
                    bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                    color: "white",
                  }}
                  _hover={{
                    bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                    color: "white",
                  }}
                  _active={{
                    bgColor: `${narutoTheme ? "naruto.black" : "demon.orange"}`,
                    color: "white",
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => closeDrawer()}>
                    <Button
                      size="lg"
                      mt="5"
                      marginLeft="5"
                      fontWeight="medium"
                      color="white"
                      bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                      _selected={{
                        bgColor: `${
                          narutoTheme ? "naruto.black" : "demon.orange"
                        }`,
                        color: "white",
                      }}
                      _hover={{
                        bgColor: `${
                          narutoTheme ? "naruto.black" : "demon.orange"
                        }`,
                        color: "white",
                      }}
                      _active={{
                        bgColor: `${
                          narutoTheme ? "naruto.black" : "demon.orange"
                        }`,
                        color: "white",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => closeDrawer()}>
                    <Button
                      size="lg"
                      mt="5"
                      fontWeight="medium"
                      color="white"
                      bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                      _selected={{
                        bgColor: `${
                          narutoTheme ? "naruto.black" : "demon.orange"
                        }`,
                        color: "white",
                      }}
                      _hover={{
                        bgColor: `${
                          narutoTheme ? "naruto.black" : "demon.orange"
                        }`,
                        color: "white",
                      }}
                      _active={{
                        bgColor: `${
                          narutoTheme ? "naruto.black" : "demon.orange"
                        }`,
                        color: "white",
                      }}
                    >
                      Signup
                    </Button>
                  </Link>
                </>
              )}
            </ButtonGroup>

            <Divider mt="5" orientation="horizontal" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
