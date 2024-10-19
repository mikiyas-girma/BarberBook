import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errorHandler.js";
import { Barber } from "../../models/barberModel.js";
import BarberService from "../../services/barberService.js";
import Logger from "../../lib/logger.js";
import { IBooking } from "../../types/barberInterface.js";

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

  static async viewBookings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const barberId = req.user._id;

      if (!barberId) {
        res
          .status(401)
          .json({ message: "Unauthorized access. Please log in as a barber." });
        return;
      }

      // Get query parameters for filtering
      const { date, status, page = 1, limit = 10 } = req.query;

      // Fetch barber's bookings with filters and pagination
      const barber = await Barber.findById(barberId)
        .populate({
          path: "bookings.customerDetails.customerId",
          select: "name email phoneNumber",
        })
        .exec();

      if (!barber) {
        res.status(404).json({ message: "Barber not found." });
        return;
      }

      // Apply filtering on the bookings array
      let filteredBookings = barber.bookings;

      // Filter by date if provided
      if (date) {
        const targetDate = new Date(date as string);
        filteredBookings = filteredBookings.filter(
          (booking: IBooking) =>
            new Date(booking.date).toDateString() === targetDate.toDateString()
        );
      }

      // Filter by status if provided
      if (status) {
        filteredBookings = filteredBookings.filter(
          (booking: IBooking) => booking.status === status
        );
      }

      // Sort bookings by date and time
      filteredBookings = filteredBookings.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        const timeA = a.time.localeCompare(b.time);
        return dateA - dateB || timeA;
      });


      // Pagination logic
      const currentPage = parseInt(page as string, 10);
      const perPage = parseInt(limit as string, 10);
      const totalBookings = filteredBookings.length;
      const totalPages = Math.ceil(totalBookings / perPage);
      const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      );

      // Respond with filtered bookings
      res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings: paginatedBookings,
        totalBookings,
        currentPage,
        totalPages,
      });
      return;
    } catch (error: any) {
      console.error("Error in viewBookings:", error);
      res.status(500).json({ message: "Server error", error: error.message });
      return;
    }
  }
}

export default BarberController;
