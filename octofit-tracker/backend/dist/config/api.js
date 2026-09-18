const apiPort = 8000;
const getApiBaseUrl = (codespaceName = process.env.CODESPACE_NAME, port = apiPort) => {
    const trimmedCodespaceName = codespaceName?.trim();
    return trimmedCodespaceName
        ? `https://${trimmedCodespaceName}-${apiPort}.app.github.dev`
        : `http://localhost:${port}`;
};
export { apiPort, getApiBaseUrl };
