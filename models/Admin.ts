export interface Admin {
  adminId: number;
  name: string;
  email: string;
  password: string;
  nik: string;
  phone: string;
  picture: string | null;
  isSuperAdmin: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "EMPLOYEE";
}

export const initAdmin: Admin = {
  adminId: 0,
  name: "Loading...",
  email: "Loading...",
  password: "Loading...",
  nik: "Loading...",
  phone: "Loading...",
  picture: null,
  isSuperAdmin: false,
  isDeleted: false,
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
  role: "ADMIN",
};
