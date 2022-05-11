import { useToast } from "@chakra-ui/react";
import { createContext, useState } from "react";

const UserContext = createContext();
const host = "http://localhost:4000";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const toast = useToast();

  const loginUser = async (userCredentials) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      localStorage.setItem("token", jsonResponse.authToken);
      setCurrentUser(jsonResponse.user);
      toast({
        title: "Success",
        description: "You have successfully logged in",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: jsonResponse.error,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const registerUser = async (userCredentials) => {
    const response = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      localStorage.setItem("token", jsonResponse.authToken);
      setCurrentUser(jsonResponse.newUser);
      toast({
        title: "Success",
        description: "You have successfully created an account",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Error",
        description: jsonResponse.error,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const logoutUser = async () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    toast({
      title: "Success",
      description: "You have been logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const getCurrentUser = async () => {
    const res = await fetch(`${host}/api/auth/currentuser`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const responseJson = await res.json();
    setCurrentUser(responseJson.currentUser);
  };

  const like = async () => {
    try {
      const res = await fetch(`${host}/api/user/like`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const responseJson = await res.json();
      if (responseJson.success) {
        await getCurrentUser();
        toast({
          title: "Success",
          description: "Thank you for liking this web application",
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: responseJson.error,
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
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        logoutUser,
        currentUser,
        like,
        getCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
