import { APIRes } from "./ResponseHelper";
import { Vendor } from "./Vendor";

export interface User {
  userId: number;
  name: string;
  email: string;
  nik: string;
  phone: string;
  password: string;
  picture: string | null;
  license: string | null;
  isConfirmed: boolean;
  isDeleted: boolean;
  role: "DRIVER" | "INSTALLER";
  vendorId: number;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface DetailUser extends User {
  vendor: Vendor;
  _count: {
    driverItems: number;
    installerItems: number;
  };
}

export interface UsersRes extends APIRes {
  data: DetailUser[];
}
