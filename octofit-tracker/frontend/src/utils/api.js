export const buildApiUrl = (resource) => {
  const baseUrl = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/${resource}`;
};
