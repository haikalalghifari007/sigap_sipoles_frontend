import { Product } from "./Product";
import {
  AdminDecoded,
  APIRes,
  Pagination,
  UserDecoded,
  VendorDecoded,
} from "./ResponseHelper";
import { Tracking } from "./Tracking";
import { User } from "./User";
import { Vendor } from "./Vendor";

export interface Order {
  orderId: number;
  title: string;
  kr: string;
  dossier: string;
  unit: string;
  firstCompanyName: string;
  firstCompanyAddress: string;
  firstCompanyRepresentateBy: string;
  firstCompanyRepresentateActAs: string;
  secondCompanyName: string;
  secondCompanyAddress: string;
  secondCompanyRepresentateBy: string;
  secondCompanyRepresentateActAs: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  orderItemId: number;
  itemName: string;
  amount: number;
  location: string;
  latitude: number;
  longitude: number;
  ulp: string;
  pkWo: string;
  orderId: number;
  driverId: number | null;
  installerId: number | null;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    trackings: number;
  };
  trackings: Tracking[];
  status: "UNPROCESSED" | "ON_GOING" | "COMPLETED" | "ORDER_ISSUES";
}

export interface DetailOrderItem extends OrderItem {
  vendor: Vendor;
  driver: User | null;
  installer: User | null;
  order: Order;
  product: Product;
  detailTracking: DetailTracking;
}

interface DetailTracking {
  received: DetailTrackingItem;
  departed: DetailTrackingItem;
  arrived: DetailTrackingItem;
  installing: DetailTrackingItem;
  installed: DetailTrackingItem;
}

interface DetailTrackingItem {
  location: string | null;
  date: string | null;
  success: boolean;
}

export interface OrderItemRes extends APIRes {
  pagination: Pagination;
  data: {
    orderIssues: OrderItem[];
    unprocessed: OrderItem[];
    onGoing: OrderItem[];
    completed: OrderItem[];
    allOrders: OrderItem[];
  };
  decoded: AdminDecoded | UserDecoded | VendorDecoded;
}

export interface DetailOrderItemRes extends APIRes {
  data: DetailOrderItem;
  decoded: AdminDecoded | UserDecoded | VendorDecoded;
}
