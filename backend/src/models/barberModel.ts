import { Schema, model } from "mongoose";
import { IBarber } from "../types/barberInterface.js";

// Define the schema for Barber
const BarberSchema: Schema<IBarber> = new Schema(
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
    businessName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    portfolio: [
      {
        type: String,
      },
    ],
    availableSlots: [
      {
        date: {
          type: Date,
          required: true,
        },
        times: [
          {
            time: {
              type: String,
              required: true,
            },
            isBooked: {
              type: Boolean,
              default: false,
            },
            _id: {
              type: Schema.Types.ObjectId,
              auto: true,
            },
          },
        ],
      },
    ],
    bookings: [
      {
        customerDetails: {
            customerId: {
                type: Schema.Types.ObjectId,
                required: false,
            },
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: false,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
            isCustomer: {
                type: Boolean,
                required: true,
            },
        },
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        slotId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "completed", "cancelled"],
          default: "pending",
        },
      },
    ],
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "trial"],
      default: "trial",
    },
    subscriptionPlan: {
      type: String,
      enum: ["monthly", "yearly", null],
      default: null,
    },
    trialEndDate: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        return new Date(currentDate.setDate(currentDate.getDate() + 30));
      },
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Barber = model<IBarber>("Barber", BarberSchema);
