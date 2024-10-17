import { Barber } from "../models/barberModel.js";
import { IBarber, IAvailabilitySlot } from "../types/barberInterface.js";
import { Types } from "mongoose";
import { errorHandler } from '../utils/errorHandler.js';


class BarberService {
  // Add availability slot for a barber
  static async addAvailabilitySlots(
    barberId: string,
    availableSlots: { date: string, time: string }[]
  ): Promise<IAvailabilitySlot[]> {
    if (!Types.ObjectId.isValid(barberId)) {
      throw new Error("Invalid Barber ID");
    }

    const barber = await Barber.findById(barberId);

  if (!barber) {
    throw errorHandler(404, 'Barber not found');
  }

  // Ensure availableSlots is a valid array
  if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
    throw errorHandler(400, 'Available slots must be an array and cannot be empty');
  }

  // Loop through each slot and add to the barber's available slots
  availableSlots.forEach((slot: { date: string; time: string }) => {
    barber.availableSlots.push({
      date: new Date(slot.date), // Convert string to Date object
      time: slot.time,
      isBooked: false, // Default to false
    });
  });

  // Save the updated barber document with new slots
  await barber.save();

  return barber.availableSlots;
  }

  // Delete a specific availability slot
  static async deleteAvailability(
    barberId: string,
    availabilitySlotId: string
  ): Promise<IBarber | null> {
    if (
      !Types.ObjectId.isValid(barberId) ||
      !Types.ObjectId.isValid(availabilitySlotId)
    ) {
      throw new Error("Invalid IDs");
    }

    // Find barber and remove the specific slot from availableSlots
    const barber = await Barber.findByIdAndUpdate(
      barberId,
      { $pull: { availableSlots: { _id: availabilitySlotId } } }, // Pull slot by ID
      { new: true } // Return updated barber
    );

    return barber;
  }
}

export default BarberService;
