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
