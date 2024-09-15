import { createContext, useContext, useState } from "react";

const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentBranch must be within a ContentItemProvider");
  }
  return context;
};

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
   <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
   </CurrentUserContext.Provider>
  );
};