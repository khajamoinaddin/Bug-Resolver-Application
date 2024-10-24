import SERVER from "../context/server";
import AxiosConfig from "../helpers/axios";
import axios from "axios";

export const getBugGraphReportService = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/bug/graph-report`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getCreatedBugsByMeService = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/bug/created-by-me`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAssignedBugsToMeService = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/bug/assigned-to-me`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const createNewBugServices = async (json) => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.addConfigHeader("Content-Type", "multipart/form-data");

    const { data } = await axios.post(
      `${SERVER}/bug/create-bug`,
      json,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateBugStatusServices = async (id, json) => {
  try {
    const axiosConfig = new AxiosConfig();

    const { data } = await axios.patch(
      `${SERVER}/bug/single-bug/${id}`,
      json,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getAllBugsServices = async (limitPerPage = 10, page = 1) => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/bug/all-bugs?limit=${limitPerPage}&page=${page}`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
