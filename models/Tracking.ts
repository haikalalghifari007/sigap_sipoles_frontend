export interface Tracking {
  trackingId: number;
  status: "RECEIVED" | "DEPARTED" | "ARRIVED" | "INSTALLING" | "INSTALLED";
  latitude: number;
  longitude: number;
  detailLocation: string;
  orderItemId: number;
  createdAt: string;
  updatedAt: string;
}
