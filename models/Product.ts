import { AdminDecoded, APIRes } from "./ResponseHelper";

export interface Product {
  productId: number;
  name: string;
  type: string | null;
  diameter: number | null;
  height: number | null;
  image: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isExist: boolean;
}

export interface ProductsRes extends APIRes {
  data: {
    allProducts: Product[];
    needCompletionData: Product[];
    completedData: Product[];
  };
  decoded: AdminDecoded;
}
