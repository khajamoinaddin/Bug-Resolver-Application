const developmentMode = "production";
//const developmentMode = "development";

const baseUrlsObject = {
  development: "http://localhost:8000",
  production: "https://bug-resolver-tool-backend.vercel.app",
};

export const baseUrl = baseUrlsObject[developmentMode];
const SERVER = baseUrlsObject[developmentMode] + "/api/v1";

export default SERVER;
