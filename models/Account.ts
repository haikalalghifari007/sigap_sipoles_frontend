import { AdminDecoded, APIRes } from "./ResponseHelper";

export interface Account<T> {
  id: number;
  name: string;
  email: string;
  phone: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
  type: T | string;
}

export interface ManageAccountRes extends APIRes {
  data: {
    requests: Account<
      "REQUEST_EMPLOYEE" | "REQUEST_DRIVER" | "REQUEST_INSTALLER"
    >[];
    employees: Account<"EMPLOYEE">[];
    admins: Account<"ADMIN">[];
    drivers: Account<"DRIVER">[];
    installers: Account<"INSTALLER">[];
    vendors: Account<"VENDOR">[];
    alls: Account<"ADMIN" | "EMPLOYEE" | "DRIVER" | "INSTALLER" | "VENDOR">[];
  };
  decoded: AdminDecoded;
}