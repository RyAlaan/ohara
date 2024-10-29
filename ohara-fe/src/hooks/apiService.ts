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

export const getData = async (url: string, params?: object) => {
  try {
    const response = await apiService.get(url, {
      headers: header,
      params: {
        q : "Berotak senku",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: string, data: any) => {
  console.log(data);
  
  try {
    const response = await apiService.post(url, data, { headers: header });
    return response.data;
  } catch (error) {
    throw error;
  }
};
