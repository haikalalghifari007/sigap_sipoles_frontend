import axiosInstance from "@/config/axiosInstance";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import axios from "axios";
import { APIErrorRes } from "@/models/ResponseHelper";
import { refresh } from "../auth";
import { ManageAccountRes } from "@/models/Account";
import { ProductsRes } from "@/models/Product";

export const getAllProducts = async () => {
  try {
    const { data } = await axiosInstance.get<ProductsRes>("/admin/products");
    return data.data.allProducts;
  } catch (error) {
    const err = error as APIErrorRes;
    if (axios.isAxiosError(error)) {
      if (err?.response?.data?.status === 401) {
        try {
          await refresh();
          const { data } = await axiosInstance.get<ProductsRes>(
            "/admin/products"
          );
          return data.data.allProducts;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Gagal mengambil data",
            text2: "Terjadi kesalahan",
          });
        }
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
          text2: "Terjadi kesalahan",
        });
      }
    }
  }
};

export interface FormProduct {
  id: string;
  name: string;
  type: string;
  diameter: string;
  height: string;
}

export const initFormProduct: FormProduct = {
  id: "0",
  name: "",
  type: "",
  diameter: "",
  height: "",
};

export const createProduct = async (form: FormProduct) => {
  if (
    form.name === "" ||
    form.type === "" ||
    form.diameter === "" ||
    form.height === ""
  ) {
    Toast.show({
      type: "error",
      text1: "Lengkapi data",
      text2: "Data produk harus diisi",
    });
    return;
  }
  try {
    const { data } = await axiosInstance.post("/admin/products", form);
    return data;
  } catch (error) {
    const err = error as APIErrorRes;
    if (axios.isAxiosError(error)) {
      if (err?.response?.data?.status === 401) {
        try {
          await refresh();
          const { data } = await axiosInstance.post("/admin/products", form);
          return data;
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Gagal menambahkan produk",
            text2: "Terjadi kesalahan",
          });
        }
      } else if (!error.response) {
        Toast.show({
          type: "error",
          text1: "Gagal menambahkan produk",
          text2: "Cek kembali koneksi internet anda",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Gagal menambahkan produk",
          text2: "Terjadi kesalahan",
        });
      }
    }
  }
};
