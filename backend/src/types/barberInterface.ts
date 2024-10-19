import { Types } from "mongoose";

export interface ITimeSlot {
  time: string;
  isBooked: boolean;
  _id?: Types.ObjectId;
}

export interface IAvailableSlot {
  date: Date;
  times: ITimeSlot[];
}

export interface IBooking {
    customerDetails: {
        customerId: Types.ObjectId;
        name: string;
        email: string;
        phoneNumber: string;
        isCustomer: boolean;
    }
    date: Date;
    time: string;
    status: "pending" | "completed" | "cancelled";
}

export interface IBarber {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  businessName: string;
  phoneNumber: string;
  portfolio: string[];
  availableSlots: IAvailableSlot[];
  bookings: IBooking[];
  subscriptionStatus: "active" | "inactive" | "trial";
  subscriptionPlan: "monthly" | "yearly" | null;
  trialEndDate: Date;
  subscriptionEndDate: Date | null;
}
