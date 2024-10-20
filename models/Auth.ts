import { APIRes } from "./ResponseHelper";

export type Role = "ADMIN" | "EMPLOYEE" | "DRIVER" | "INSTALLER";

export interface LoginRes extends APIRes {
  data: {
    accessToken: string;
    refreshToken: string;
    role: Role;
  };
}

export interface RefreshTokenRes extends APIRes {
  data: {
    accessToken: string;
    refreshToken: string;
    role: Role;
  };
}
