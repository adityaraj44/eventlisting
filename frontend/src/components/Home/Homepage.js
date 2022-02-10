import React, { useContext, useState } from "react";
import {
  Container,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Textarea,
  Button,
  ButtonGroup,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  SmallAddIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import FormFieldContext from "../../context/notefields.context";
import { useMediaQuery } from "../custom-hooks";
import ThemeContext from "../../context/theme.context";
import NoteContext from "../../context/note.context";

const Homepage = () => {
  const toast = useToast();
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;
  document.title = "noteme - Add Note";
  const themeContext = useContext(ThemeContext);
  const {
    nltheme,
    ndtheme,

    ddtheme,
  } = themeContext;

  const [note, setNote] = useState({
    title: "",
    noteDescription: "",
  });

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;

  const isMobile = useMediaQuery("(max-width: 768px)");
  // console.log(isMobile);
  const context = useContext(FormFieldContext);
  const {
    isValidTitle,
    setIsValidTitle,
    isValidNoteDesc,
    validateTitle,
    validateDesc,
    setIsValidNoteDesc,
  } = context;

  const onTitleChange = (e) => {
    setNote({
      ...note,
      title: e.target.value,
    });
  };
  const onDescChange = (e) => {
    setNote({
      ...note,
      noteDescription: e.target.value,
    });
  };

  const onKeyTitleCapture = (e) => {
    validateTitle(note.title);
  };
  const onKeyDescCapture = (e) => {
    validateDesc(note.noteDescription);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onHandleAddNote = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (note.title.length < 1 || note.noteDescription.length < 1) {
      toast({
        title: "Error",
        description: "Title or note description cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } else {
      await addNote(note);
      setIsLoading(false);
      setNote({
        title: "",
        noteDescription: "",
      });
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
              ADD
            </Heading>
          </span>{" "}
          A NOTE
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
              htmlFor="title"
            >
              Title
            </FormLabel>
            <InputGroup>
              <Input
                fontWeight="light"
                size="md"
                color={darkTheme ? "gray.300" : "naruto.black"}
                value={note.title}
                isRequired
                focusBorderColor={narutoTheme ? "naruto.yellow" : "demon.pink"}
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
                  children={<SmallCloseIcon size="sm" color="naruto.red" />}
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
              htmlFor="noteDescription"
            >
              Note
            </FormLabel>
            <InputGroup>
              <Textarea
                value={note.noteDescription}
                color={darkTheme ? "gray.300" : "naruto.black"}
                size="md"
                fontWeight="light"
                onChange={onDescChange}
                focusBorderColor={narutoTheme ? "naruto.yellow" : "demon.pink"}
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
                isLoading={isLoading}
                onClick={onHandleAddNote}
                fontWeight="medium"
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
                rightIcon={<SmallAddIcon fontSize="lg" />}
              >
                Add note
              </Button>
              <Button
                fontWeight="medium"
                onClick={() =>
                  setNote({
                    title: "",
                    noteDescription: "",
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

export default Homepage;
