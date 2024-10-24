import SERVER from "../context/server";
import AxiosConfig from "../helpers/axios";
import axios from "axios";

export const PostLoginServices = async (json) => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeAuthorization();

    const { data } = await axios.post(
      `${SERVER}/user/login`,
      json,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const PostRegisterServices = async (json) => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeAuthorization();

    const { data } = await axios.post(
      `${SERVER}/user/register`,
      json,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const LogoutServices = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeConfigHeader();

    const { data } = await axios.get(
      `${SERVER}/user/logout`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
