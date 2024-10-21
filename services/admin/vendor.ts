import axiosInstance from "@/config/axiosInstance";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { LoginRes, RefreshTokenRes } from "@/models/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AS_KEY } from "@/constants/AsyncStorage";
import axios from "axios";
import { APIErrorRes } from "@/models/ResponseHelper";
import { AdminProfileRes } from "@/models/Profile";
import { refresh } from "../auth";
import { Admin } from "@/models/Admin";
import { ManageAccountRes } from "@/models/Account";
import { DetailVendorRes, VendorsRes } from "@/models/Vendor";

export const getAllVendors = async () => {
  try {
    const { data } = await axiosInstance.get<VendorsRes>("/admin/vendors");
    return data.data;
  } catch (error) {
    console.log(error);

    const err = error as APIErrorRes;
    if (axios.isAxiosError(error)) {
      if (err?.response?.data?.status === 401) {
        await refresh();
      } else if (!error.response) {
        Toast.show({
          type: "error",
          text1: "Gagal mengambil data",
          text2: "Cek kembali koneksi internet anda",
        });
      }
    }
  }
};

export const getDetailVendor = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<DetailVendorRes>(
      `/admin/vendors/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
    const err = error as APIErrorRes;
    if (axios.isAxiosError(error)) {
      if (err?.response?.data?.status === 401) {
        await refresh();
      } else if (!error.response) {
        Toast.show({
          type: "error",
          text1: "Gagal mengambil data",
          text2: "Cek kembali koneksi internet anda",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal mengambil data",
          text2: err?.response?.data?.message || "Terjadi kesalahan",
        });
      }
    }
  }
};

export interface FormVendor {
  id: string;
  name: string;
  location: string;
  phone: string;
  personInCharge: string;
  email: string;
}

export const createVendor = async (form: FormVendor) => {
  try {
    const { data } = await axiosInstance.post("/admin/vendors", form);
    return data;
  } catch (error) {
    const err = error as APIErrorRes;
    if (axios.isAxiosError(error)) {
      if (err?.response?.data?.status === 401) {
        await refresh();
      } else if (!error.response) {
        Toast.show({
          type: "error",
          text1: "Gagal menambahkan vendor",
          text2: "Cek kembali koneksi internet anda",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal menambahkan vendor",
          text2: err?.response?.data?.message || "Terjadi kesalahan",
        });
      }
    }
  }
};
