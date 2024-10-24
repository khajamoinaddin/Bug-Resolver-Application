import SERVER from "../context/server";
import AxiosConfig from "../helpers/axios";
import axios from "axios";

export const getAllUsersServices = async (limitPerPage = 10, page = 1) => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/user/admin/all-users?limit=${limitPerPage}&page=${page}`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getUserNamesServices = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/user/users-names`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getMyProfileServices = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/user/my-profile`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateMyProfileServices = async (json) => {
  try {
    const axiosConfig = new AxiosConfig();

    const { data } = await axios.put(
      `${SERVER}/user/my-profile`,
      json,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
