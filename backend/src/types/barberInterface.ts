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

export interface IBarber {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  businessName: string;
  phoneNumber: string;
  portfolio: string[];
  availableSlots: IAvailableSlot[];
  subscriptionStatus: "active" | "inactive" | "trial";
  subscriptionPlan: "monthly" | "yearly" | null;
  trialEndDate: Date;
  subscriptionEndDate: Date | null;
}
