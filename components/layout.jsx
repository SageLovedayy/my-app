import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import Login from "@/pages/login";
import { api } from "@/utils/mk-req";
import React, { useEffect } from "react";
import axios from "axios";
import {
  getElementPurpose,
  getPagePurpose,
  getPageName,
  formatTimeModelingData,
} from "../utils/pageUtils";

export default function Layout({ children, default: useDefault = true }) {
  const { data: session, status } = useSession({ required: true });
  //-------------------------------------------------------
  //REMEMBER TO ADAPT THE FUNCTION BELOW FOR AN API CALL
  const logInteraction = (id, label, action, role, next, exit) => {
    //const timestamp = new Date().toLocaleString();
    //------------------------------------------------
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const time_started = `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} GMT ${ampm}`;
    //----------------------------------------------------
    const identity = (id) => {
      const words = id.split(/[_-]/);

      const formattedWords = words.map((word) => {
        const capitalizedFirstLetter = word.charAt(0).toUpperCase();
        return capitalizedFirstLetter + word.slice(1);
      });

      const formattedIdentity = formattedWords.join(" ");

      return formattedIdentity;
    };
    //---------------------------------------
    console.log("object: ", identity(id));
    console.log("role:", role);
    console.log("next:", next);
    console.log("identity: ", id);
    console.log("label:", label);
    console.log("exit: ", exit);
    console.log("time_executed: ", time_started);
    console.log("type:", action);
    console.log("==================================");
    console.log("");
  };
  //------------------------------------------------------

  //useEffect(() => {
  //  const elements = document.querySelectorAll("[data-interaction]");
  //  elements.forEach((element) => {
  //    const id = element.id;
  //    const label = element.getAttribute("data-interaction-label");
  //    const action = element.getAttribute("data-interaction-action");
  //    const role = element.getAttribute("aria-label");
  //    const next = element.getAttribute("data-interaction-next") || "";
  //    const exit = next !== null;

  //    if (id && label && action && role) {
  //      element.addEventListener("click", () =>
  //        logInteraction(id, label, action, role, next, exit)
  //      );
  //    }
  //  });

  //  return () => {
  //    elements.forEach((element) => {
  //      const id = element.id;
  //      const label = element.getAttribute("data-interaction-label");
  //      const action = element.getAttribute("data-interaction-action");

  //      if (id && label && action) {
  //        element.removeEventListener("click", () =>
  //          logInteraction(id, label, action)
  //        );
  //      }
  //    });
  //  };
  //}, []);
  //----------------------------------------
  //useEffect(() => {
  //  if (session) {
  //    const username = session.username;
  //    const currentPagePath = window.location.pathname;
  //    console.log("current page path = ", currentPagePath);
  //    const currentPageName = getPageName(currentPagePath);
  //    console.log("current page name = ", currentPageName);
  //    const currentPagePurpose = getPagePurpose(currentPageName);
  //    console.log(currentPagePurpose);
  //    //console.log(window.location.origin);
  //    // Send data to the time-based modeling endpoint using the retrieved information
  //    //------------------------------------------------------------------------------------
  //    const currentDate = new Date();
  //    const year = currentDate.getFullYear();
  //    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //    const day = String(currentDate.getDate()).padStart(2, "0");
  //    const hours = String(currentDate.getHours()).padStart(2, "0");
  //    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  //    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  //    const ampm = hours >= 12 ? "PM" : "AM";
  //    const formattedHours = hours % 12 || 12;
  //    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //    const time_started = `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} GMT ${ampm}`;
  //    //------------------------------------------------------------------------------------

  //    const link = window.location.href;

  //    const accessToken = session.access_token;
  //    console.log("USERNAME FROM LAYOUT: ", username);
  //    //console.log("authenticated: ", accessToken);
  //  }

  //  // Reset isFirstPageVisited flag when the user logs out or session is reset
  //  //return () => {
  //  //  if (!session) {
  //  //    isFirstPageVisited(false);
  //  //  }
  //  //};...add a way to actually change isFirstPageVisited to false in the utils functions

  //  // Send data to the time-based modeling endpoint using the retrieved information
  //  // ...
  //}, [session]);
  //----------------------------
  useEffect(() => {
    const logPageVisit = async () => {
      if (session) {
        const username = session.username;
        const currentPagePath = window.location.pathname;
        const currentPageName = getPageName(currentPagePath);
        const currentPagePurpose = getPagePurpose(currentPageName);

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString(); // ISO string format

        // Format data for API call (Format 1)
        const pageVisitData = {
          username: username,
          page: currentPageName,
          role: currentPagePurpose?.purpose,
          time_started: formattedDate,
        };

        try {
          // Make API call for page visit record

          await axios.post(
            `${api.baseUrl}/time_based_modelling/add_activities_record`,
            pageVisitData,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${session?.access_token}`,
              },
            }
          );

          console.log(
            "Page visit recorded for activities record:",
            pageVisitData
          );

          await formatTimeModelingData(
            username,
            currentPageName,
            currentPagePath,
            formattedDate,
            session.access_token
            // formattedDate
          );
        } catch (error) {
          console.error("Error recording page visit:", error);
        } finally {
          console.log("page visit data: ", pageVisitData);
        }
      }
    };

    // Call function to log page visit when component mounts
    logPageVisit();

    // Attach event listeners for interactions
    const elements = document.querySelectorAll("[data-interaction]");
    elements.forEach((element) => {
      const id = element.id;
      const label = element.getAttribute("data-interaction-label");
      const action = element.getAttribute("data-interaction-action");
      const role = element.getAttribute("aria-label");
      const next = element.getAttribute("data-interaction-next") || "";
      const exit = next !== null;
      const identity = (id) => {
        const words = id.split(/[_-]/);

        const formattedWords = words.map((word) => {
          const capitalizedFirstLetter = word.charAt(0).toUpperCase();
          return capitalizedFirstLetter + word.slice(1);
        });

        const formattedIdentity = formattedWords.join(" ");

        return formattedIdentity;
      };

      if (id && label && action && role) {
        element.addEventListener("click", async () => {
          const currentTime = new Date().toISOString(); // ISO string format

          // Format data for API call (Format 2)
          const interactionData = {
            username: session.username,
            page: window.location.pathname,
            role: role,
            act: {
              object: identity(id),
              identity: id,
              label: label,
              next: next,
              exit: exit,
              time_executed: currentTime,
              type: action,
            },
          };

          try {
            // Make API call for interaction record
            await axios.post(
              `${api.baseUrl}/time_based_modelling/add_activities_record`,
              interactionData,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${session?.access_token}`,
                },
              }
            );

            console.log("Interaction recorded:", interactionData);
          } catch (error) {
            console.error("Error recording interaction:", error);
          }
        });
      }
    });

    // Clean up event listeners on unmount
    return () => {
      elements.forEach((element) => {
        const id = element.id;
        const label = element.getAttribute("data-interaction-label");
        const action = element.getAttribute("data-interaction-action");

        if (id && label && action) {
          element.removeEventListener("click", () =>
            logInteraction(id, label, action)
          );
        }
      });
    };
  }, [session]);

  //====================================

  //console.log(status);SEE STATUS---VERYIMPORTANT

  if (status == "loading") {
    return <p>Loading</p>;
  }

  //-------------------
  // Check if user is logged in
  if (!session) {
    //Remember to call the formatTimeModellingData with an extra argument called time_ended before returning login
    return <Login />;
  }
  //console.log("Session:", session);

  //if (session) return <Loader />;

  // Determine login method (Google or external API)
  const isGoogleLogin = session.provider === "google";

  // Retrieve user data based on login method
  let userData;
  if (isGoogleLogin) {
    userData = session.user; // Data from NextAuth
    //console.log("userData: ", userData);
  } else {
    userData = JSON.parse(localStorage.getItem("externalUserData")); // Data from external API
    //console.log("userData: ", userData);
  }

  if (useDefault)
    return (
      <div
        className="bg-white-900 min-h-screen top-level-div flex flex-col"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <Header />
        <div className="bg-white-900 flex mt-[7rem]">
          <Nav additionalClass={"tray"} />
          <div className="flex h-full w-full">
            <div className="main-content pb-[20rem] h-[100vh] flex-grow p-12 relative ml-[32rem] overflow-x-auto">
              <div className="h-fit">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="bg-white-900 min-h-screen top-level-div flex flex-col"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <Header />
      <div className="mt-[7rem]">{children}</div>
    </div>
  );
}

//import { useSession, signIn, signOut } from "next-auth/react";
//import Nav from "@/components/Nav";
//import Header from "@/components/Header";
//import Login from "@/pages/login";

//export default function Layout({ children }) {
//  const { data: session } = useSession();
//  if (!session) {
//    return <Login />;
//  }

//  return (
//    // <Login />
//    <div className="bg-white-900 min-h-screen">
//      <Header />
//      <div className="bg-white-900 min-h-screen flex">
//        <Nav />
//        <div className="flex-grow p-12 relative ml-[32rem] mt-28 overflow-x-hidden">
//          {children}
//        </div>
//      </div>
//    </div>
//  );
//}
