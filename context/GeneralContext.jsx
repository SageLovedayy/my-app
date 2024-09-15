"user client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "@mui/material";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const { data: session } = useSession();

  const getInitialMode = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("setMode") || "user";
    }
    return "user";
  };

  const [setMode, setSetMode] = useState(getInitialMode); //JUST FOR TESTING

  useEffect(() => {
    localStorage.setItem("setMode", setMode);
  }, [setMode]);

  //const [userMode, setUserMode] = useState("user");

  const [section, setSection] = useState("");

  const [currentCompany, setCurrentCompany] = useState();
  const [companyData, setCompanyData] = useState({});

  const [alert, setAlert] = useState(null);



  return (
    <GeneralContext.Provider
      value={{
        //userMode,
        //setUserMode,
        setMode,
        setSetMode,
        currentCompany,
        setCurrentCompany,
        companyData,
        setCompanyData,
        section,
        setSection,
      }}
    >
      <>
        <>
          {alert && (
            <div className="w-full flex justify-center absolute top-[8rem] z-50">
              <div className="p-4 w-[42rem]">
                <Alert
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    boxShadow: "1px 0px 4px 0px rgba(0, 0, 0, 0.1)",
                    bgcolor: "white",
                    //alignItems: "center",
                    //justifyContent: "center",

                    "& .MuiAlert-icon": {
                      fontSize: "3rem",
                    },

                    "& .MuiAlert-action": {
                      "& .MuiIconButton-root": {
                        fontSize: "2.6rem",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "2.2rem", //close btn size
                      },
                    },
                  }}
                  severity="warning"
                  //variant="filled"
                  onClose={() => {
                    setAlert(null);
                  }}
                >
                  {alert}
                </Alert>
              </div>
            </div>
          )}
        </>
        {children}
      </>
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
