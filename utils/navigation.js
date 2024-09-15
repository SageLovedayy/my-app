import { useRouter } from "next/router";

/**
 * Navigate to a specific page with optional query parameters.
 * @param {string} path - The path to navigate to.
 * @param {object} query - Query parameters to include in the URL.
 */
export const useNavigate = () => {
  const router = useRouter();

  const navigate = (path, query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    const url = queryString ? `${path}?${queryString}` : path;
    router.push(url);
  };

  return navigate;
};
