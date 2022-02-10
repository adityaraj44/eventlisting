import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import {
  useMediaQuery,
  useOpenModalState,
  useOpenDeleteAlertState,
} from "../custom-hooks";
import ThemeContext from "../../context/theme.context";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import FormFieldContext from "../../context/notefields.context";
import NoteContext from "../../context/note.context";
import { useParams, useHistory } from "react-router-dom";

const NoteItemDetail = () => {
  const noteContext = useContext(NoteContext);
  const {
    isSingleNoteLoading,
    singleNote,
    getSingleNote,
    updateNote,
    deleteNote,
  } = noteContext;
  const params = useParams();

  document.title = "noteme - Note Detail";
  const themeContext = useContext(ThemeContext);
  const {
    nltheme,
    ndtheme,

    ddtheme,
  } = themeContext;

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;

  const { open, close, isModalOpen } = useOpenModalState();
  const { openDeleteAlert, closeDeleteAlert, isDeleteAlertOpen } =
    useOpenDeleteAlertState();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const context = useContext(FormFieldContext);
  const {
    isValidTitle,
    setIsValidTitle,
    isValidNoteDesc,
    validateTitle,
    validateDesc,
    setIsValidNoteDesc,
  } = context;

  const [editedNote, setEditedNote] = useState({
    title: "",
    noteDescription: "",
  });
  useEffect(() => {
    getSingleNote(params.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTitleChange = (e) => {
    setEditedNote({
      ...editedNote,
      title: e.target.value,
    });
  };
  const onDescChange = (e) => {
    setEditedNote({
      ...editedNote,
      noteDescription: e.target.value,
    });
  };

  const onKeyTitleCapture = (e) => {
    validateTitle(editedNote.title);
  };
  const onKeyDescCapture = (e) => {
    validateDesc(editedNote.noteDescription);
  };
  const toast = useToast();

  const [editLoading, setEditLoading] = useState(false);

  const handleSubmit = async (e) => {
    setEditLoading(true);
    e.preventDefault();
    if (editedNote.title.length < 1 || editedNote.noteDescription.length < 1) {
      toast({
        title: "Error",
        description: "Title or note description cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setEditLoading(false);
    } else {
      await updateNote(editedNote, params.id);
      setEditLoading(false);
      close();
    }
  };

  const history = useHistory();
  const handleDelete = async () => {
    await deleteNote(params.id);

    history.push("/notes");
  };

  const onEditClick = () => {
    open();

    setEditedNote({
      title: singleNote.title,
      noteDescription: singleNote.noteDescription,
    });
  };

  if (isSingleNoteLoading && singleNote === null) {
    return (
      <Container textAlign="center" p="1">
        <Spinner
          style={{
            margin: "200px 0px 250px",
          }}
          thickness="5px"
          speed="0.5s"
          color={narutoTheme ? "naruto.orange" : "demon.green"}
          size="xl"
        />
      </Container>
    );
  }

  return (
    <>
      {singleNote !== null && (
        <>
          <Grid
            style={{
              marginTop: "65px",
              padding: `${isMobile ? "0px 10px" : "0px 130px"}`,
            }}
            templateColumns={"1fr"}
            mb="55"
          >
            <Box
              height="fit-content"
              p="8"
              shadow="base"
              border={darkTheme ? "1px" : ""}
              borderColor={darkTheme ? "gray.600" : ""}
              width="100%"
              rounded="lg"
            >
              <Box mt="4">
                <Heading
                  size="md"
                  mb="2"
                  as="h1"
                  color={narutoTheme ? "naruto.red" : "demon.green"}
                >
                  Note Title
                </Heading>
                <Divider />
                <Text mt={3} color={darkTheme ? "white" : "naruto.black"}>
                  {singleNote.title}
                </Text>
              </Box>
              <Box mt={10}>
                <Heading
                  size="md"
                  mb="2"
                  as="h1"
                  color={narutoTheme ? "naruto.red" : "demon.green"}
                >
                  Note Body
                </Heading>

                <Text
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                  mt={3}
                  color={darkTheme ? "white" : "naruto.black"}
                >
                  {singleNote.noteDescription}
                </Text>
              </Box>
              <Divider my={4} />
              <Box display="block" textAlign="center">
                <Badge
                  bgColor={narutoTheme ? "naruto.blue" : "demon.pink"}
                  color="white"
                  mt="4"
                  mb="3"
                  p={1}
                  dateTime="2021-01-15 15:30:00 +0000 UTC"
                >
                  <TimeAgo datetime={singleNote.updatedAt} />
                </Badge>
              </Box>

              <Box my="3" textAlign="center">
                <ButtonGroup isAttached>
                  <IconButton
                    onClick={onEditClick}
                    variant="solid"
                    color="white"
                    bgColor={narutoTheme ? "naruto.yellow" : "demon.green"}
                    size="md"
                    icon={<FiEdit />}
                    _hover={{
                      bgColor: `${narutoTheme ? "naruto.orange" : "green.700"}`,
                      color: "white",
                    }}
                    _active={{
                      bgColor: `${narutoTheme ? "naruto.orange" : "green.700"}`,
                      color: "white",
                    }}
                    _selected={{
                      bgColor: `${narutoTheme ? "naruto.orange" : "green.700"}`,
                      color: "white",
                    }}
                  />

                  <IconButton
                    variant="solid"
                    size="md"
                    color="white"
                    bgColor={narutoTheme ? "naruto.orange" : "demon.pink"}
                    icon={<RiDeleteBin3Fill />}
                    onClick={openDeleteAlert}
                    _hover={{
                      bgColor: `${narutoTheme ? "naruto.red" : "pink.800"}`,
                      color: "white",
                    }}
                    _active={{
                      bgColor: `${narutoTheme ? "naruto.red" : "pink.800"}`,
                      color: "white",
                    }}
                    _selected={{
                      bgColor: `${narutoTheme ? "naruto.red" : "pink.800"}`,
                      color: "white",
                    }}
                  />
                </ButtonGroup>
              </Box>
            </Box>
          </Grid>
          <Modal
            closeOnOverlayClick={false}
            isCentered
            isOpen={isModalOpen}
            onClose={close}
            motionPreset="slideInRight"
          >
            <ModalOverlay />
            <ModalContent
              style={{
                color: `${darkTheme ? "white" : ""}`,
                backgroundColor: `${darkTheme ? "#1a1a1a" : ""}`,
              }}
              marginX={`${isMobile ? "2" : ""}`}
              border={darkTheme ? "1px" : ""}
              borderColor={darkTheme ? "gray.600" : ""}
            >
              <ModalHeader color={narutoTheme ? "naruto.red" : "demon.green"}>
                Edit Note
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody my="2">
                <form>
                  <FormControl mb="10" isRequired>
                    <FormLabel
                      fontWeight="semibold"
                      color={darkTheme ? "white" : "naruto.black"}
                      mb="4"
                      htmlFor="title"
                    >
                      Title
                    </FormLabel>
                    <InputGroup>
                      <Input
                        fontWeight="light"
                        size="md"
                        color={darkTheme ? "gray.300" : "naruto.black"}
                        value={editedNote.title}
                        isRequired
                        focusBorderColor={
                          narutoTheme ? "naruto.yellow" : "demon.pink"
                        }
                        required
                        onChange={onTitleChange}
                        variant={darkTheme ? "outline" : "filled"}
                        placeholder="Recipe to make ramen noodles"
                        id="title"
                        name="title"
                        type="text"
                        onKeyUpCapture={onKeyTitleCapture}
                        onBlur={() => setIsValidTitle(null)}
                      />

                      {isValidTitle && (
                        <InputRightElement
                          my="auto"
                          children={<CheckCircleIcon color="green.600" />}
                        />
                      )}
                      {isValidTitle === false && (
                        <InputRightElement
                          my="auto"
                          children={
                            <SmallCloseIcon size="sm" color="naruto.red" />
                          }
                        />
                      )}
                    </InputGroup>
                    {isValidTitle === false && (
                      <FormHelperText mt={4} color={"naruto.red"}>
                        Title required
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl mb="10" isRequired>
                    <FormLabel
                      fontWeight="semibold"
                      color={darkTheme ? "white" : "naruto.black"}
                      mb="4"
                      htmlFor="noteDesc"
                    >
                      Note
                    </FormLabel>
                    <InputGroup>
                      <Textarea
                        style={{
                          whiteSpace: "pre-wrap",
                        }}
                        value={editedNote.noteDescription}
                        color={darkTheme ? "gray.300" : "naruto.black"}
                        size="md"
                        fontWeight="light"
                        onChange={onDescChange}
                        focusBorderColor={
                          narutoTheme ? "naruto.yellow" : "demon.pink"
                        }
                        required
                        name="noteDescription"
                        id="noteDescription"
                        variant={darkTheme ? "outline" : "filled"}
                        placeholder="Buy ingredients, then..."
                        onKeyUpCapture={onKeyDescCapture}
                        onBlur={() => setIsValidNoteDesc(null)}
                        rows={5}
                      />

                      {isValidNoteDesc && (
                        <InputRightElement
                          my="auto"
                          children={<CheckCircleIcon color="green.600" />}
                        />
                      )}
                      {isValidNoteDesc === false && (
                        <InputRightElement
                          my="auto"
                          children={<SmallCloseIcon color="naruto.red" />}
                        />
                      )}
                    </InputGroup>
                    {isValidNoteDesc === false && (
                      <FormHelperText mt={4} color="naruto.red">
                        Note required
                      </FormHelperText>
                    )}
                    <ButtonGroup
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        fontWeight="medium"
                        isLoading={editLoading}
                        mt="5"
                        type="submit"
                        bgColor={narutoTheme ? "naruto.orange" : "demon.pink"}
                        color="white"
                        variant="solid"
                        _hover={{
                          bgColor: `${
                            narutoTheme ? "naruto.red" : "demon.blue"
                          }`,
                        }}
                        _active={{
                          bgColor: `${
                            narutoTheme ? "naruto.red" : "demon.blue"
                          }`,
                        }}
                        rightIcon={<MdDone fontSize="lg" />}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                      <Button
                        fontWeight="medium"
                        onClick={() =>
                          setEditedNote({
                            title: "",
                            noteDescription: "",
                          })
                        }
                        mt="5"
                        rightIcon={<SmallCloseIcon fontSize="lg" />}
                        type="reset"
                        bgColor={narutoTheme ? "naruto.blue" : "demon.yellow"}
                        color="white"
                        variant="solid"
                        _hover={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                        }}
                        _active={{
                          bgColor: `${
                            narutoTheme ? "naruto.black" : "demon.orange"
                          }`,
                        }}
                      >
                        Clear
                      </Button>
                    </ButtonGroup>
                  </FormControl>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* alert delete */}
          <AlertDialog
            motionPreset="slideInRight"
            onClose={closeDeleteAlert}
            isOpen={isDeleteAlertOpen}
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
                Delete Note?
              </AlertDialogHeader>

              <AlertDialogCloseButton />
              <AlertDialogBody>This action cannot be undone.</AlertDialogBody>
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
                  onClick={closeDeleteAlert}
                >
                  No
                </Button>
                <Button
                  bgColor={narutoTheme ? "naruto.orange" : "demon.green"}
                  mb={2}
                  color="white"
                  fontWeight="medium"
                  onClick={handleDelete}
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
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};

export default NoteItemDetail;
