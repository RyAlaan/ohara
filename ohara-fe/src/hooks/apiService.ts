import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("token");

const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer${token}`,
};

export const useGetData = async (url: string, params?: object) => {
  try {
    const response = await apiService.get(url,{
      params : params,
      headers: header,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const usePostData = async (url: string, data: any) => {
  try {
    const response = await apiService.post(url, data, { headers: header });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteData = async (url: string) => {
  try {
    const response = await apiService.delete(url, {
      headers: header,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
