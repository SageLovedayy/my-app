export default function mapApiResponse(response, stringsMap) {
  const displayStrings = stringsMap;

  const mappedResponse = {};

  for (const [category, actions] of Object.entries(response)) {
    mappedResponse[category] = {};

    for (const [key, action] of Object.entries(actions)) {
      if (displayStrings[action]) {
        mappedResponse[category][key] = displayStrings[action];
      }
    }
  }

  return mappedResponse;
}

export function mapApiResponseReverse(response, stringsMap) {
  const presentKeys = new Set();

  // Collect all keys present in the response
  for (const actions of Object.values(response)) {
    for (const key of Object.values(actions)) {
      presentKeys.add(key);
    }
  }

  // Identify missing keys based on keys of displayStrings
  const missingStrings = {};
  for (const [key, value] of Object.entries(stringsMap)) {
    if (!presentKeys.has(key)) {
      missingStrings[key] = value;
    }
  }

  return missingStrings;
}
