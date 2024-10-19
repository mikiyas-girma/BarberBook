import { Barber } from "../models/barberModel.js";
import { IBarber, IAvailableSlot } from "../types/barberInterface.js";
import { Types } from "mongoose";
import { errorHandler } from "../utils/errorHandler.js";

class BarberService {

  static async addAvailabilitySlots(
    barberId: string,
    availableSlots: IAvailableSlot[]
  ) {
    const barber = await Barber.findById(barberId);

    if (!barber) {
      throw new Error("Barber not found");
    }

    // Iterate over the incoming slots
    for (const newSlot of availableSlots) {
    // Check if the barber already has slots for the given date
    const existingSlot = barber.availableSlots.find(
      (slot) =>
        new Date(slot.date).toISOString().slice(0, 10) ===
        new Date(newSlot.date).toISOString().slice(0, 10)
    );

      if (existingSlot) {
        // If the date exists, merge the times
        existingSlot.times = [
          ...existingSlot.times,
          ...newSlot.times.filter(
            (newTime) =>
              !existingSlot.times.some(
                (existingTime) => existingTime.time === newTime.time
              )
          ),
        ];
      } else {
        // If the date doesn't exist, add the entire new slot
        barber.availableSlots.push(newSlot);
      }
    }

    // Save the updated barber document
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
