import { AxiosError, AxiosResponse } from "axios";
export interface APIRes {
  status: number;
  message: string;
  userAgent: string;
}

export interface APIErrorRes extends AxiosError {
  response?: AxiosResponse<APIRes>;
}

export interface AdminDecoded {
  adminId: number;
  role: "ADMIN" | "EMPLOYEE";
  iat: number;
  exp: number;
}

export interface UserDecoded {
  userId: number;
  role: "DRIVER" | "INSTALLER";
  iat: number;
  exp: number;
}

export interface VendorDecoded {
  vendorId: number;
  role: "VENDOR";
  iat: number;
  exp: number;
}

export interface Pagination {
  currentPage: number;
  currentData: number;
  totalPage: number;
  totalData: number;
  cursor: {
    isNextPage: boolean;
    isPrevPage: boolean;
  };
}
