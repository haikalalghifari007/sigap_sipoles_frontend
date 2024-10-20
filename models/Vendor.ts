import { AdminDecoded, APIRes } from "./ResponseHelper";
import { DetailUser } from "./User";

export interface Vendor {
  vendorId: number;
  name: string;
  email: string;
  password: string;
  location: string;
  phone: string;
  personInCharge: string;
  logo: string;
  isDeleted: boolean;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    users: number;
    orderItems: number;
  };
}

export interface DetailVendor extends Vendor {
  users: {
    alls: DetailUser[];
    drivers: DetailUser[];
    installers: DetailUser[];
  };
}

export interface VendorsRes extends APIRes {
  data: Vendor[];
  decoded: AdminDecoded;
}

export interface DetailVendorRes extends APIRes {
  data: DetailVendor;
  decoded: AdminDecoded;
}
