import { Schema, model } from "mongoose";
import { ICustomer } from "../types/customerInterface.js";

const CustomerSchema: Schema<ICustomer> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    bookings: [
      {
        barberId: {
          type: Schema.Types.ObjectId,
          ref: "Barber", // Reference to the Barber model
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "completed", "cancelled"],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

export const Customer = model<ICustomer>("Customer", CustomerSchema);
