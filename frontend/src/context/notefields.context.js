import { createContext, useState } from "react";

const FormFieldContext = createContext();

export const FormFieldProvider = ({ children }) => {
  const [isValidTitle, setIsValidTitle] = useState(null);
  const [isValidNoteDesc, setIsValidNoteDesc] = useState(null);

  const validateTitle = (title) => {
    if (title.length === 0) {
      setIsValidTitle(false);
    } else {
      setIsValidTitle(true);
    }
  };

  const validateDesc = (noteDescription) => {
    if (noteDescription.length === 0) {
      setIsValidNoteDesc(false);
    } else {
      setIsValidNoteDesc(true);
    }
  };

  return (
    <FormFieldContext.Provider
      value={{
        isValidTitle,
        isValidNoteDesc,
        setIsValidTitle,
        validateTitle,
        validateDesc,
        setIsValidNoteDesc,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  );
};

export default FormFieldContext;
