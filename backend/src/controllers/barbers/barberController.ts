import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errorHandler.js";
import { Barber } from "../../models/barberModel.js";
import BarberService from "../../services/barberService.js";
import Logger from "../../lib/logger.js";

class BarberController {
  static async getAllBarbers(req: Request, res: Response, next: NextFunction) {
    try {
      const barbers = await Barber.find().select(
        "-password -subscriptionStatus \
                                    -subscriptionPlan -trialEndDate -subscriptionEndDate"
      );
      res.status(200).json({
        status: "success",
        data: {
          barbers,
        },
      });
    } catch (error) {
      return next(errorHandler(500, "Server error"));
    }
  }

  static async getBarberById(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await Barber.findById(req.params.id).select(
        "-password -subscriptionStatus \
                                    -subscriptionPlan -trialEndDate -subscriptionEndDate"
      );
      if (!barber) {
        return next(errorHandler(404, "Barber not found"));
      }
      res.status(200).json({
        status: "success",
        data: {
          barber,
        },
      });
    } catch (error) {
      return next(errorHandler(500, "Server error"));
    }
  }

  // Add availability slot for a barber
  static async addAvailability(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const Id = req.user._id;
    const barberId = Id.toString();
    const { availableSlots } = req.body;
    // Validate the incoming data
    if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
      return next(
        errorHandler(
          400,
          "Available slots must be an array and cannot be empty"
        )
      );
    }

    // Validate each slot structure
    for (const slot of availableSlots) {
      if (!slot.date || !Array.isArray(slot.times) || slot.times.length === 0) {
        return next(
          errorHandler(400, "Each slot must have a date and an array of times")
        );
      }
      for (const time of slot.times) {
        if (!time.time) {
          return next(
            errorHandler(400, "Each time slot must have a time value")
          );
        }
      }
    }

    try {
      // Call service to update the barber's available slots
      const updatedSlots = await BarberService.addAvailabilitySlots(
        barberId,
        availableSlots
      );

      res.status(201).json({
        message: "Availability slots added successfully",
        availableSlots: updatedSlots,
      });
    } catch (error) {
      return next(error); // Pass error to next middleware for centralized error handling
    }
  }

  static async viewBookings(req: Request, res: Response, next: NextFunction): Promise<void> {
    const barberId = req.user?._id; // Assuming the logged-in barber's ID is stored in req.user

    try {
      // Validate that the user is authenticated and is a barber
      if (!barberId) {
        return next(
          errorHandler(401, "Unauthorized access. Please log in as a barber.")
        );
      }

      // Find the barber and populate their bookings
      const barber = await Barber.findById(barberId)
        .select("bookings")
        .populate({
          path: "bookings.customerDetails.customerId", // Populate the customer details for each booking
          select: "name email phoneNumber", // Select relevant fields from the customer
        });

      if (!barber) {
        return next(errorHandler(404, "Barber not found."));
      }

      // Sort the bookings by date and time (upcoming first)
      const sortedBookings = barber.bookings.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        const timeA = a.time.localeCompare(b.time); // String comparison for time (e.g., "09:00 AM")
        return dateA - dateB || timeA;
      });

      // Respond with the barber's bookings
      res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings: sortedBookings,
      });
    } catch (error) {
        Logger.error(error);
      return next(errorHandler(500, "Internal Server Error"));
    }
  }
}

export default BarberController;
