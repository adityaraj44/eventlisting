import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./components/Home/Homepage";
import Notes from "./components/Notes/Notes";
import Navbar from "./components/Navbar/Navbar";
import { theme } from "./customTheme";
import { FormFieldProvider } from "./context/notefields.context";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import NoteItemDetail from "./components/Notes/NoteItemDetail";
import { ThemeProvider } from "./context/theme.context";
import { UserProvider } from "./context/user.context";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { NoteProvider } from "./context/note.context";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <NoteProvider>
          <ThemeProvider>
            <FormFieldProvider>
              <Router>
                <Navbar />
                <Switch>
                  <PrivateRoute exact path="/">
                    <Homepage />
                  </PrivateRoute>
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/events">
                    <Notes />
                  </PrivateRoute>
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/events/:id">
                    <NoteItemDetail />
                  </PrivateRoute>
                </Switch>
                <Switch>
                  <PublicRoute exact path="/login">
                    <Login />
                  </PublicRoute>
                </Switch>
                <Switch>
                  <PublicRoute exact path="/signup">
                    <Signup />
                  </PublicRoute>
                </Switch>
                <Footer />
              </Router>
            </FormFieldProvider>
          </ThemeProvider>
        </NoteProvider>
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;
