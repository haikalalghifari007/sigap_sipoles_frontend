import axiosInstance from "@/config/axiosInstance";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import axios from "axios";
import { APIErrorRes } from "@/models/ResponseHelper";
import { refresh } from "../auth";
import { ManageAccountRes } from "@/models/Account";

export const getAllAcounts = async () => {
  try {
    const { data } = await axiosInstance.get<ManageAccountRes>("/admin/manage");
    return data;
  } catch (error) {
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
          text1: "Sesi telah berakhir",
          text2: "Silahkan login kembali",
        });
        router.replace("/signin");
      }
    }
  }
};

export interface FormDeleteAcc {
  id: number;
  type: string;
}

export const initFormDeleteAcc: FormDeleteAcc = {
  id: 0,
  type: "",
};

export const deleteAccount = async (form: FormDeleteAcc) => {
  try {
    await axiosInstance.delete<ManageAccountRes>("/admin/manage/", {
      data: {
        type: form.type,
        id: form.id,
      },
    });
    Toast.show({
      type: "success",
      text1: "Berhasil",
      text2: "Akun berhasil di hapus",
    });
  } catch (error) {
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
          text1: "Terjadi kesalahan",
          text2: err?.response?.data?.message || "Silahkan coba lagi",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Terjadi kesalahan",
        text2: "Silahkan coba lagi",
      });
    }
  }
};

export interface FormReqAcc {
  id: number;
  type: string;
  isConfirmed: boolean;
}

export const initFormReqAcc: FormReqAcc = {
  id: 0,
  type: "",
  isConfirmed: false,
};

export const confirmRequest = async (form: FormReqAcc) => {
  try {
    await axiosInstance.put<ManageAccountRes>("/admin/manage/", {
      type: form.type,
      id: form.id,
      isConfirmed: form.isConfirmed,
    });
    Toast.show({
      type: "success",
      text1: "Berhasil",
      text2: form.isConfirmed
        ? "Akun berhasil di konfirmasi"
        : "Akun berhasil ditolak",
    });
  } catch (error) {
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
          text1: "Sesi telah berakhir",
          text2: "Silahkan login kembali",
        });
        router.replace("/signin");
      }
    }
  }
};
