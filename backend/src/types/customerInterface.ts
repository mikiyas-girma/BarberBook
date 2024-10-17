import { Document, Schema, Types } from "mongoose";


// Define an interface for Customer
export interface ICustomer extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    bookings: Array<{
      barberId: Schema.Types.ObjectId;
      date: Date;
      time: string;
      status: 'pending' | 'completed' | 'cancelled';
    }>;
    createdAt: Date;
    updatedAt: Date;
  }
