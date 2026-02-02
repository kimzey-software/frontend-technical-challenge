export const getAuthorizationHeader = () => ({
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
});
