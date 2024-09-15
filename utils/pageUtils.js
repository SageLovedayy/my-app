import axios from "axios";
import { api } from "./mk-req";
import { useSession } from "next-auth/react";

if (typeof window !== "undefined") {
  // Code inside this block will only run in the client-side context
}

// Function 1: Get the name and purpose of any element on the page
export function getElementPurpose(element) {
  if (!element || !element.tagName) {
    // Check if element exists and has a tagName property
    console.error("Element does not exist or tagName property is missing.");
    return null;
  }

  // Access the tagName property if it exists
  const tagName = element.tagName.toLowerCase();

  // Logic to determine purpose based on tagName

  let purpose;
  switch (tagName) {
    case "input":
      purpose = "Input field";
      break;
    case "button":
      purpose = "Button";
      break;
    // Add more cases as needed
    default:
      purpose = "Unknown";
      break;
  }
  return purpose;
}

// Function 2: Get the name and purpose of a page
export function getPagePurpose(pageName) {
  // Here you can define a mapping of page names to their purposes
  const pagePurposes = {
    profile: "View and manage user profile information",
    dashboard: "View a summary of important information",
    // Add more page names and their purposes as needed
  };
  const purpose = pagePurposes[pageName.toLowerCase()] || "Purpose not defined"; // Get the purpose from the mapping
  return { page: pageName, purpose };
}

let isFirstPageVisited = false; // Flag to track if the first page (profile) is visited

// Function 3: Get only the name of a page
export function getPageName(pagePath) {
  const pageName = pagePath.split("/").pop(); // Get the last part of the URL path
  if (pageName === "profile" && !isFirstPageVisited) {
    isFirstPageVisited = true;
    return pageName;
  }
  return pageName;
  //  return pageName !== "profile" ? pageName : null; // Return null for subsequent profile visits
}

// Function to format data for sending to the time-based modeling endpoints
export async function formatTimeModelingData(
  username,
  page,
  link,
  time_started,
  accessToken,
  time_ended
) {
  if (time_ended) {
    // If time_ended is provided, format data for logging out
    //return {
    //  username,
    //  time_ended,
    //};
    try {
      // Make an HTTP request to the logout endpoint
      await sendToLogoutEndpoint({ username, time_ended });
    } catch (error) {
      // Handle errors
      console.error("Error sending data to logout endpoint:", error);
    }
  } else {
    if (page === "profile" && isFirstPageVisited) {
      try {
        // Make an HTTP request to the profile endpoint
        await sendToProfileEndpoint({ username, page, link, time_started });
      } catch (error) {
        // Handle errors
        console.error("Error sending data to profile endpoint:", error);
      }
    } else {
      // Send data to a general endpoint for other pages
      try {
        // Make an HTTP request to the general endpoint
        await sendToGeneralEndpoint({ username, page, link });
      } catch (error) {
        // Handle errors
        console.error("Error sending data to general endpoint:", error);
      }
    }
  }
}
// Function to send data to the logout endpoint
async function sendToLogoutEndpoint(data) {
  try {
    await axios.post(
      "api/history/",
      data
      //, {
      //params: { access: accessToken },
      //}
    );
    console.log("Data sent to logout endpoint:", data);
  } catch (error) {
    // Handle errors
    console.error("Error sending data to logout endpoint:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}
//------------------------

// Function to send data to the profile endpoint
async function sendToProfileEndpoint(data) {
  try {
    await axios.post("api/history", data);
    console.log("Data sent to profile endpoint:", data);
  } catch (error) {
    console.error("Error sending data to profile endpoint:", error);
    throw error;
  }
}
//---------------------------

// Function to send data to the general endpoint
async function sendToGeneralEndpoint(data) {
  try {
    await axios.post(
      `${api.baseUrl}/time_based_modelling/add_history_record`,
      data
    );
    console.log("Data sent to general endpoint:", data);
  } catch (error) {
    console.error("Error sending data to general endpoint:", error);
    throw error;
  }
}
//---------------------------
