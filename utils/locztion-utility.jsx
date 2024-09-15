import axios from "axios";

// Fetch all continents
export const fetchContinents = async () => {
  try {
    const response = await axios.get(
      "http://api.geonames.org/countryInfoJSON?username=_brysontech&type=continent"
    );
    const continents = response.data.geonames
      .map((country) => country.continentName)
      .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
    return continents;
  } catch (error) {
    console.error("Error fetching continents:", error);
    //throw error;
  }
};

// Fetch countries based on the selected continent
export const handleSetCountry = async (continent) => {
  try {
    const response = await axios.get(
      `http://api.geonames.org/countryInfoJSON?username=_brysontech&continent=${continent}`
    );
    const countriesInContinent = response.data.geonames
      .filter((country) => country.continentName === continent)
      .map((country) => ({
        country: country.countryName,
        id: country.geonameId,
      }));
    return countriesInContinent; // Return array of countries
  } catch (error) {
    console.error("Error fetching countries:", error);
    //throw error;
  }
};

// Fetch states based on the selected country
export const handleFetchStates = async (countryName) => {
  try {
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?q=${countryName}&maxRows=1&username=_brysontech`
    );
    if (response.data.geonames.length > 0) {
      const id = response.data.geonames[0].geonameId;
      if (id) {
        const { data } = await axios.get(
          `http://api.geonames.org/childrenJSON?geonameId=${id}&username=_brysontech`
        );
        const states = data.geonames.map((item) => item.name);
        return states; // Return array of states
      }
    } else {
      throw new Error("Country not found");
    }
  } catch (error) {
    console.error("Error fetching states:", error);
    //throw error;
  }
};

export const fetchLocals = async (countryName, stateName) => {
  try {
    // Step 1: Fetch GeoName ID of the country
    const countryResponse = await axios.get(
      `http://api.geonames.org/searchJSON?q=${countryName}&maxRows=1&username=_brysontech`
    );

    if (countryResponse.data?.geonames?.length > 0) {
      const countryId = countryResponse.data.geonames[0].geonameId;

      if (countryId) {
        // Step 2: Fetch states of the country using the country GeoName ID
        const stateResponse = await axios.get(
          `http://api.geonames.org/childrenJSON?geonameId=${countryId}&username=_brysontech`
        );

        const states = stateResponse.data?.geonames || [];
        const matchedState = states.find((state) => state.name === stateName);

        if (matchedState?.geonameId) {
          const stateId = matchedState.geonameId;

          // Step 3: Fetch localities (LGAs) for the selected state
          const localsResponse = await axios.get(
            `http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=_brysontech`
          );

          const localities =
            localsResponse.data?.geonames?.map((local) => local.name) || [];

          return localities; // Return array of localities
        } else {
          throw new Error(`State "${stateName}" not found in ${countryName}`);
        }
      } else {
        throw new Error(`Country ID for "${countryName}" not found`);
      }
    } else {
      throw new Error(`Country "${countryName}" not found`);
    }
  } catch (error) {
    console.error("Error fetching localities:", error);
    //throw error;
  }
};
