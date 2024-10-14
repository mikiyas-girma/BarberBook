import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errorHandler.js";
import { Barber } from "../../models/barberModel.js";
import BarberService from "../../services/barberService.js";

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

    try {
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
}

export default BarberController;
