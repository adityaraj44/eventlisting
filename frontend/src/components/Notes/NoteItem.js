import {
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { truncateString } from "../../helper";
import { BsPinAngleFill } from "react-icons/bs";
import ThemeContext from "../../context/theme.context";
import NoteContext from "../../context/note.context";
import TimeAgo from "timeago-react";

const NoteItem = ({ note, highlighted }) => {
  const themeContext = useContext(ThemeContext);
  const [isLoadingPin, setIsLoadingPin] = useState(false);
  const {
    nltheme,
    ndtheme,

    ddtheme,
  } = themeContext;

  const narutoTheme = nltheme || ndtheme;
  const darkTheme = ndtheme || ddtheme;

  const noteContext = useContext(NoteContext);
  const { pinnote } = noteContext;

  const handlePinnote = async () => {
    setIsLoadingPin(true);
    await pinnote(note._id);
  };

  return (
    <>
      <Box
        p="6"
        shadow="base"
        border={darkTheme ? "1px" : ""}
        borderColor={darkTheme ? "gray.600" : ""}
        height="fit-content"
        width="100%"
        justifySelf="center"
        alignSelf="self-end"
        rounded="lg"
      >
        <Box as="article">
          <Heading
            size="sm"
            my="2"
            color={darkTheme ? "white" : "naruto.black"}
          >
            {highlighted !== undefined ? (
              <Highlighter
                highlightStyle={{
                  backgroundColor: `${narutoTheme ? "#ea982c" : "#409261"}`,

                  color: "white",
                }}
                searchWords={[highlighted]}
                textToHighlight={note.title}
              />
            ) : (
              note.title
            )}
          </Heading>
          <Text
            style={{
              whiteSpace: "pre-wrap",
            }}
            color={darkTheme ? "white" : "naruto.black"}
          >
            {highlighted !== undefined ? (
              <Highlighter
                highlightStyle={{
                  backgroundColor: `${narutoTheme ? "#ea982c" : "#409261"}`,

                  color: "white",
                }}
                searchWords={[highlighted]}
                textToHighlight={truncateString(note.noteDescription, 100)}
              />
            ) : (
              truncateString(note.noteDescription, 95)
            )}
          </Text>
          <Box display="block" textAlign="start">
            <Badge
              bgColor={narutoTheme ? "naruto.blue" : "demon.pink"}
              color="white"
              mt="4"
              p={1}
              mb="3"
              dateTime="2021-01-15 15:30:00 +0000 UTC"
            >
              <TimeAgo datetime={note.updatedAt} />
            </Badge>
          </Box>
          <Divider />
          <Box mt="3" textAlign="end">
            <Tooltip
              label={note.isPinned ? "Unpin event" : "Pin event"}
              fontSize="md"
            >
              <IconButton
                onClick={handlePinnote}
                isLoading={isLoadingPin}
                bgColor={
                  darkTheme
                    ? note.isPinned
                      ? narutoTheme
                        ? "naruto.orange"
                        : "demon.yellow"
                      : "#121212"
                    : note.isPinned
                    ? narutoTheme
                      ? "naruto.orange"
                      : "demon.yellow"
                    : "white"
                }
                size="sm"
                mr="2"
                color={
                  narutoTheme
                    ? note.isPinned
                      ? "white"
                      : "naruto.orange"
                    : note.isPinned
                    ? "white"
                    : "demon.yellow"
                }
                border="1px"
                icon={<BsPinAngleFill />}
                _hover={{
                  bgColor: `${narutoTheme ? "naruto.red" : "demon.orange"}`,
                  color: "white",
                }}
                _active={{
                  bgColor: "naruto.red",
                  color: "white",
                }}
                _selected={{
                  bgColor: "naruto.red",
                  color: "white",
                }}
              />
            </Tooltip>
            <Link to={`/events/${note._id}`}>
              <Button
                variant="solid"
                size="sm"
                color="white"
                bgColor={narutoTheme ? "naruto.yellow" : "demon.green"}
                _hover={{
                  bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  color: "white",
                }}
                _active={{
                  bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  color: "white",
                }}
                _selected={{
                  bgColor: `${narutoTheme ? "naruto.red" : "green.700"}`,
                  color: "white",
                }}
              >
                Open
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NoteItem;
