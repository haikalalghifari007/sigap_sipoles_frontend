import axiosInstance from "@/config/axiosInstance";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { LoginRes, RefreshTokenRes } from "@/models/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AS_KEY } from "@/constants/AsyncStorage";
import axios from "axios";
import { APIErrorRes } from "@/models/ResponseHelper";

export interface FormLogin {
  email: string;
  password: string;
}

export const initLogin: FormLogin = {
  email: "",
  password: "",
};

export const login = async (form: FormLogin) => {
  if (form.email === "" || form.password === "") {
    Toast.show({
      type: "error",
      text1: "Login Gagal",
      text2: "Email dan Password harus diisi",
    });
    return;
  }
  try {
    const { data } = await axiosInstance.post<LoginRes>("/auth/login", form);
    await Promise.all([
      AsyncStorage.setItem(AS_KEY.ACCESS_TOKEN, data.data.accessToken),
      AsyncStorage.setItem(AS_KEY.REFRESH_TOKEN, data.data.refreshToken),
      AsyncStorage.setItem(AS_KEY.ROLE, data.data.role),
    ]);
    Toast.show({
      type: "success",
      text1: "Berhasil login",
    });
    if (data.data.role === "ADMIN") {
      router.replace("/admin");
    } else if (data.data.role === "VENDOR") {
      router.replace("/vendor");
    } else if (data.data.role === "EMPLOYEE") {
      router.replace("/employee");
    } else if (data.data.role === "DRIVER" || data.data.role === "INSTALLER") {
      router.replace("/user");
    }
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const err = error as APIErrorRes;
      if (err.response) {
        Toast.show({
          type: "error",
          text1: "Login Gagal",
          text2:
            err?.response?.data?.message ||
            "Periksa kembali email dan password",
        });
        return;
      } else {
        Toast.show({
          type: "error",
          text1: "Login Gagal",
          text2: "Periksa kembali koneksi internet",
        });
        return;
      }
    }
  }
};

export const refresh = async () => {
  const refreshToken = await AsyncStorage.getItem(AS_KEY.REFRESH_TOKEN);
  if (!refreshToken) {
    router.replace("/signin");
  }
  try {
    const { data } = await axiosInstance.post<RefreshTokenRes>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );
    await Promise.all([
      AsyncStorage.setItem(AS_KEY.ACCESS_TOKEN, data.data.accessToken),
      AsyncStorage.setItem(AS_KEY.REFRESH_TOKEN, data.data.refreshToken),
      AsyncStorage.setItem(AS_KEY.ROLE, data.data.role),
    ]);
    if (data.data.role === "ADMIN") {
      router.replace("/admin");
    } else if (data.data.role === "VENDOR") {
      router.replace("/vendor");
    } else if (data.data.role === "EMPLOYEE") {
      router.replace("/employee");
    } else if (data.data.role === "DRIVER" || data.data.role === "INSTALLER") {
      router.replace("/user");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as APIErrorRes;
      if (err?.response) {
        router.replace("/signin");
      } else {
        const role = await AsyncStorage.getItem(AS_KEY.ROLE);
        if (role === "ADMIN") {
          router.replace("/admin");
        } else if (role === "VENDOR") {
          router.replace("/vendor");
        } else if (role === "EMPLOYEE") {
          router.replace("/employee");
        } else if (role === "DRIVER" || role === "INSTALLER") {
          router.replace("/user");
        }
        Toast.show({
          type: "error",
          text1: "Koneksi terputus",
          text2: "Cek kembali koneksi internet anda",
        });
      }
    }
  }
};
