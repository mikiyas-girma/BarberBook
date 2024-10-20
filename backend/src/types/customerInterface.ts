import { Types } from "mongoose";

export interface IAppointment {
  barberId: Types.ObjectId;
  slotId: Types.ObjectId;
  date: Date;
  time: string;
  status: "pending" | "completed" | "cancelled";
}

export interface ICustomer {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  bookings: IAppointment[];
  role: "customer";
}
