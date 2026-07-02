const getCodespaceName = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const codespaceMatch = hostname.match(/^([a-z0-9-]+)-5173\.app\.github\.dev$/i);
    if (codespaceMatch) {
      return codespaceMatch[1];
    }

    const backendMatch = hostname.match(/^([a-z0-9-]+)-8000\.app\.github\.dev$/i);
    if (backendMatch) {
      return backendMatch[1];
    }
  }

  return import.meta.env.VITE_CODESPACE_NAME || '';
};

export const buildApiUrl = (resource) => {
  const codespaceName = getCodespaceName();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}/api/${resource}`;
};
