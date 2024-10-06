import { Schema, model, Document } from 'mongoose';

// Define an interface for Barber
export interface IBarber extends Document {
  name: string;
  email: string;
  password: string;
  businessName: string;
  phoneNumber?: string;
  portfolio?: string[];
  availableSlots: Array<{
    date: Date;
    time: string;
    isBooked: boolean;
  }>;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  subscriptionPlan: 'monthly' | 'yearly' | null;
  trialEndDate: Date | null;
  subscriptionEndDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
