import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AS_KEY } from "@/constants/AsyncStorage";

const axiosInstance = axios.create({
  baseURL: "https://sigapsipoles.vercel.app/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(AS_KEY.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
