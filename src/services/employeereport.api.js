import SERVER from "../context/server";
import AxiosConfig from "../helpers/axios";
import axios from "axios";

export const getEmployeeReportServices = async () => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/user-activity/my-reports`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getSignleEmployeeReportServices = async (employeeid) => {
  try {
    const axiosConfig = new AxiosConfig();
    axiosConfig.removeContentType();

    const { data } = await axios.get(
      `${SERVER}/user-activity/admin/single-user-reports/${employeeid}`,
      axiosConfig.getConfig()
    );
    return data;
  } catch (error) {
    return error?.response?.data || error;
  }
};
