import { createContext, useContext, useState } from "react";

const ContentItemContext = createContext({
  currentContent: null,
  setCurrentContent: () => {},
});

export const useContentItem = () => {
  const context = useContext(ContentItemContext);
  if (!context) {
    throw new Error("useContentItem must be within a ContentItemProvider");
  }
  return context;
};

export const ContentItemProvider = ({ children }) => {
  const [currentContent, setCurrentContent] = useState(null);

  return (
   <ContentItemContext.Provider value={{ currentContent, setCurrentContent }}>
      {children}
   </ContentItemContext.Provider>
  );
};