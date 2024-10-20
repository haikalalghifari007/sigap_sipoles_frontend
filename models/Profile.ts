import { Admin } from "./Admin";
import { AdminDecoded, APIRes, UserDecoded } from "./ResponseHelper";
import { DetailUser } from "./User";
import { Vendor } from "./Vendor";

// ADMIN / EMPLOYEE
export interface AdminProfileRes extends APIRes {
  data: Admin;
  decoded: AdminDecoded;
}

export interface UserProfileRes extends APIRes {
  data: DetailUser;
  decoded: UserDecoded;
}

export interface VendorProfileRes extends APIRes {
  data: Vendor;
  decoded: UserDecoded;
}
