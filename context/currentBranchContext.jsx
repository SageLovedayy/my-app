import { createContext, useContext, useState } from "react";

const CurrentBranchContext = createContext({
  currentBranch: null,
  setCurrentBranch: () => {},
});

export const useCurrentBranch = () => {
  const context = useContext(CurrentBranchContext);
  if (!context) {
    throw new Error("useCurrentBranch must be within a ContentItemProvider");
  }
  return context;
};

export const CurrentBranchProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(null);

  return (
   <CurrentBranchContext.Provider value={{ currentBranch, setCurrentBranch }}>
      {children}
   </CurrentBranchContext.Provider>
  );
};