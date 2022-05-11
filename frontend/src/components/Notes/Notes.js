import React, { useContext, useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Divider,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { SiElasticstack } from "react-icons/si";
import { BsGrid1X2Fill } from "react-icons/bs";
import NoteItem from "./NoteItem";
import { useMediaQuery } from "../custom-hooks";
import ThemeContext from "../../context/theme.context";
import NoteContext from "../../context/note.context";

const Notes = () => {
  document.title = "evme - Events";
  const themeContext = useContext(ThemeContext);
  const {
    nltheme,
    ndtheme,

    ddtheme,
  } = themeContext;

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isSingle, setIsSingle] = useState(true);

  const noteContext = useContext(NoteContext);
  const { notes, getAllNotes, isLoading } = noteContext;

  useEffect(() => {
    getAllNotes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [searchItem, setSearchItem] = useState({
  //   searchValue: "",
  // });

  const [searchResults, setSearchResults] = useState([]);
  const [highlighted, setHighlighted] = useState(null);

  const handleSearch = (value) => {
    if (value.length < 1) {
      return;
    } else {
      setSearchResults(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(value.toLowerCase()) ||
            note.noteDescription.toLowerCase().includes(value.toLowerCase()) ||
            note.inDate.toLowerCase().includes(value.toLowerCase()) ||
            note.outDate.toLowerCase().includes(value.toLowerCase())
        )
      );
      setHighlighted(value);
    }
  };

  const onSearchKeyCapture = (e) => {
    if (e.target.value === "") {
      setSearchResults([]);
      setHighlighted(null);
    } else {
      handleSearch(e.target.value);
    }
  };

  if (isLoading && notes.length === 0) {
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
      {notes.length !== 0 ? (
        <>
          <Container mt="14" p="1">
            {/* <Box mx="8">
              <Heading
                fontWeight="thin"
                letterSpacing="tighter"
                mb="3"
                textAlign="left"
                color={darkTheme ? "white" : "naruto.black"}
                as="h1"
                mx="5"
              >
                <span>
                  <Heading
                    display="inline"
                    color={narutoTheme ? "naruto.orange" : "demon.green"}
                  >
                    ALL
                  </Heading>
                </span>{" "}
                NOTES
              </Heading>
              <Divider />
            </Box> */}
            <Box mb="3" mx="8">
              <InputGroup justifyContent="space-between">
                <InputLeftElement children={<Search2Icon color="gray.400" />} />
                <Input
                  width="md"
                  type="text"
                  variant={darkTheme ? "outline" : "filled"}
                  fontWeight="medium"
                  size="md"
                  name="searchnotes"
                  focusBorderColor={
                    narutoTheme ? "naruto.yellow" : "demon.pink"
                  }
                  color={darkTheme ? "gray.300" : "naruto.black"}
                  placeholder="Search your events"
                  // value={searchItem}
                  // onChange={handleSearch}
                  onKeyUpCapture={onSearchKeyCapture}
                  onBlur={
                    (() => setSearchResults([]), () => setHighlighted(null))
                  }
                />
                <IconButton
                  ml="4"
                  onClick={() => setIsSingle((p) => !p)}
                  bgColor={narutoTheme ? "naruto.orange" : "demon.pink"}
                  color="white"
                  size="md"
                  icon={isSingle ? <BsGrid1X2Fill /> : <SiElasticstack />}
                  _hover={{
                    bgColor: `${narutoTheme ? "naruto.red" : "demon.blue"}`,
                  }}
                  _active={{
                    bgColor: `${narutoTheme ? "naruto.red" : "demon.blue"}`,
                  }}
                />
              </InputGroup>
            </Box>
          </Container>
          <Box>
            {searchResults.length !== 0 && (
              <>
                <Container mt="14" p="1">
                  <Box mx="8">
                    <Heading
                      fontWeight="thin"
                      letterSpacing="tighter"
                      mb="3"
                      textAlign="center"
                      color={darkTheme ? "white" : "naruto.black"}
                      as="h1"
                      mx="5"
                    >
                      <span>
                        <Heading
                          display="inline"
                          color={narutoTheme ? "naruto.orange" : "demon.green"}
                        >
                          SEARCH
                        </Heading>
                      </span>{" "}
                      RESULTS
                    </Heading>
                    <Divider />
                  </Box>
                </Container>
                <Grid
                  style={{
                    marginTop: "45px",
                    padding: `${isMobile ? "0px 8px" : "0px 130px"}`,
                  }}
                  templateColumns={isSingle ? "1fr" : "1fr 1fr"}
                  mb="55"
                  rowGap={isMobile ? "3" : "6"}
                  columnGap={isMobile ? "2" : "6"}
                >
                  {searchResults.map((note) => {
                    return (
                      <NoteItem
                        key={note._id}
                        note={note}
                        highlighted={highlighted}
                      />
                    );
                  })}
                </Grid>
              </>
            )}
          </Box>
          <Box>
            {searchResults.length === 0 && highlighted !== null && (
              <Grid
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  padding: `${isMobile ? "0px 8px" : "0px 180px"}`,
                }}
                templateColumns={"1fr"}
              >
                <Alert
                  status="info"
                  rounded="lg"
                  color="naruto.black"
                  variant="left-accent"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Oops!
                  </AlertTitle>
                  <AlertDescription maxWidth="md">
                    No results found for{" "}
                    <Text color="naruto.black" fontWeight="medium">
                      {highlighted}
                    </Text>
                  </AlertDescription>
                </Alert>
              </Grid>
            )}
          </Box>
          <Box>
            {notes.length !== 0 &&
            notes.filter((note) => {
              return note.isPinned === true;
            }).length !== 0 ? (
              <>
                <Container mt="14" p="1">
                  <Box mx="8">
                    <Heading
                      fontWeight="thin"
                      letterSpacing="tighter"
                      mb="3"
                      textAlign="center"
                      color={darkTheme ? "white" : "naruto.black"}
                      as="h1"
                      mx="5"
                    >
                      <span>
                        <Heading
                          display="inline"
                          color={narutoTheme ? "naruto.orange" : "demon.green"}
                        >
                          P
                        </Heading>
                      </span>
                      INNED
                    </Heading>
                    <Divider />
                  </Box>
                </Container>
                <Grid
                  style={{
                    marginTop: "45px",
                    padding: `${isMobile ? "0px 8px" : "0px 130px"}`,
                  }}
                  templateColumns={isSingle ? "1fr" : "1fr 1fr"}
                  mb="55"
                  rowGap={isMobile ? "3" : "6"}
                  columnGap={isMobile ? "2" : "6"}
                >
                  {notes
                    .filter((note) => {
                      return note.isPinned === true;
                    })
                    .map((note) => {
                      return <NoteItem key={note._id} note={note} />;
                    })}
                </Grid>
              </>
            ) : (
              ""
            )}
            {notes.length !== 0 &&
            notes.filter((note) => {
              return note.isPinned === false;
            }).length !== 0 ? (
              <>
                <Container mt="14" p="1">
                  <Box mx="8">
                    <Heading
                      fontWeight="thin"
                      letterSpacing="tighter"
                      mb="3"
                      textAlign="center"
                      color={darkTheme ? "white" : "naruto.black"}
                      as="h1"
                      mx="5"
                    >
                      <span>
                        <Heading
                          display="inline"
                          color={narutoTheme ? "naruto.orange" : "demon.green"}
                        >
                          ALL
                        </Heading>
                      </span>{" "}
                      EVENTS
                    </Heading>
                    <Divider />
                  </Box>
                </Container>
                <Grid
                  style={{
                    marginTop: "45px",
                    padding: `${isMobile ? "0px 8px" : "0px 130px"}`,
                  }}
                  templateColumns={isSingle ? "1fr" : "1fr 1fr"}
                  mb="55"
                  rowGap={isMobile ? "3" : "6"}
                  columnGap={isMobile ? "2" : "6"}
                >
                  {notes
                    .filter((note) => {
                      return note.isPinned === false;
                    })
                    .map((note) => {
                      return <NoteItem key={note._id} note={note} />;
                    })}
                </Grid>
              </>
            ) : (
              ""
            )}
          </Box>
        </>
      ) : (
        <Grid
          style={{
            marginTop: "145px",
            marginBottom: "150px",
            padding: `${isMobile ? "0px 8px" : "0px 130px"}`,
          }}
          templateColumns={"1fr"}
        >
          <Alert
            status="warning"
            rounded="lg"
            color="naruto.black"
            variant="left-accent"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Oops!
            </AlertTitle>
            <AlertDescription maxWidth="md">
              It seems that you don't have any events. Add events and you can
              always find them here.
            </AlertDescription>
          </Alert>
        </Grid>
      )}
    </>
  );
};

export default Notes;
