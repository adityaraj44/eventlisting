import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";

const NoteContext = createContext();
const host = "https://evme.herokuapp.com";

export const NoteProvider = ({ children }) => {
  const toast = useToast();
  const [notes, setNotes] = useState([]);
  const [singleNote, setSingleNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSingleNoteLoading, setIsSingleNoteLoading] = useState(false);

  const getAllNotes = async () => {
    setIsLoading(true);
    const res = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const responseJson = await res.json();

    setNotes(responseJson);
    setSingleNote(null);
    setIsLoading(false);
  };

  const addNote = async (note) => {
    try {
      const res = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      const responseJson = await res.json();

      if (responseJson.success === true) {
        setNotes([...notes, responseJson.note]);
        toast({
          title: "Success",
          description: "Event created",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleNote = async (id) => {
    try {
      setIsSingleNoteLoading(true);
      const res = await fetch(`${host}/api/notes/notedetail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const responseJson = await res.json();

      setSingleNote(responseJson.note);

      setIsSingleNoteLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async (note, id) => {
    try {
      const res = await fetch(`${host}/api/notes/editnote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      const responseJson = await res.json();

      if (responseJson.success === true) {
        await getAllNotes();
        await getSingleNote(id);
        toast({
          title: "Success",
          description: "Changes saved",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const responseJson = await res.json();

      if (responseJson.success === true) {
        setSingleNote(null);
        getAllNotes();
        toast({
          title: "Success",
          description: "Event deleted",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pinnote = async (id) => {
    try {
      const res = await fetch(`${host}/api/notes/pinnote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const responseJson = await res.json();
      if (responseJson.success === true) {
        getAllNotes();
        if (responseJson.note.isPinned === true) {
          toast({
            title: "Success",
            description: "Event pinned",
            status: "success",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: "Success",
            description: "Event unpinned",
            status: "success",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        getAllNotes,
        notes,
        isLoading,
        addNote,
        singleNote,
        getSingleNote,
        isSingleNoteLoading,
        updateNote,
        deleteNote,
        pinnote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
