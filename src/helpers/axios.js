import { getLocalStorageToken } from "./localstorage";

const accessToken = getLocalStorageToken();

export default class AxiosConfig {
  constructor() {
    this.config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  addConfig(key, value) {
    this.config[key] = value;
  }
  addConfigHeader(key, value) {
    this.config.headers[key] = value;
  }

  removeConfig(key) {
    if (this.config.hasOwnProperty(key)) {
      delete this.config[key];
    }
  }
  removeConfigHeader(key) {
    if (this.config.headers.hasOwnProperty(key)) {
      delete this.config.headers[key];
    }
  }

  removeContentType() {
    this.removeConfigHeader("Content-Type");
  }
  removeAuthorization() {
    this.removeConfigHeader("Authorization");
  }

  getConfig() {
    return this.config;
  }
}
