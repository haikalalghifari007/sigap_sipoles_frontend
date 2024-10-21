import axiosInstance from "@/config/axiosInstance";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AS_KEY } from "@/constants/AsyncStorage";
import axios from "axios";
import { APIErrorRes } from "@/models/ResponseHelper";
import { AdminProfileRes } from "@/models/Profile";
import { refresh } from "../auth";
import { Admin } from "@/models/Admin";

export const profile = async () => {
  const savedProfile = await AsyncStorage.getItem(AS_KEY.ADMIN);
  if (savedProfile) {
    try {
      const profile: Admin = JSON.parse(savedProfile);
      return profile;
    } catch (error) {
      const profile = await fetchProfile();
      return profile;
    }
  } else {
    const profile = await fetchProfile();
    return profile;
  }
};

const fetchProfile = async () => {
  try {
    const { data } = await axiosInstance.get<AdminProfileRes>(
      "/admin/info/profile"
    );
    await AsyncStorage.setItem(AS_KEY.ADMIN, JSON.stringify(data.data));
    return data.data;
  } catch (error) {    
    const err = error as APIErrorRes;
    if (axios.isAxiosError(error)) {
      if (err?.response?.data?.status === 401) {
        await refresh();
      } else {
        Toast.show({
          type: "error",
          text1: "Sesi telah berakhir",
          text2: "Silahkan login kembali",
        });
        router.replace("/signin");
      }
    }
  }
};
