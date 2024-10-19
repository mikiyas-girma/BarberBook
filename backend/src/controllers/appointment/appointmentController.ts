import { Request, Response, NextFunction } from "express";
import { Barber } from "../../models/barberModel.js";
import { Customer } from "../../models/customerModel.js";
import { errorHandler } from "../../utils/errorHandler.js";

class AppointmentController {
  static async bookAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { barberId, date, time, customerDetails } = req.body;
    const customerId = req.user?._id; // Optional customer ID from req.user (if logged in)

    try {
      // 1. Validate request data
      if (!barberId || !date || !time) {
        return next(
          errorHandler(400, "Barber ID, date, and time are required.")
        );
      }

      // 2. Find the barber by ID
      const barber = await Barber.findById(barberId);
      if (!barber) {
        return next(errorHandler(404, "Barber not found."));
      }

      // 3. Find the requested slot in the barber's availability
      const availability = barber.availableSlots.find(
        (slot) => slot.date.toISOString() === new Date(date).toISOString()
      );

      if (!availability) {
        return next(errorHandler(400, "No availability on the selected date."));
      }

      const slotTime = availability.times.find((t) => t.time === time);
      if (!slotTime || slotTime.isBooked) {
        return next(
          errorHandler(
            400,
            "Selected time slot is unavailable or already booked."
          )
        );
      }

      // 4. Handle customer-specific booking logic
      let booking;
      if (customerId) {
        // If the user is authenticated
        const customer = await Customer.findById(customerId);
        if (!customer) {
          return next(errorHandler(404, "Customer not found."));
        }

        // Add booking to the authenticated customer's profile
        customer.bookings.push({
          barberId,
          date: new Date(date),
          time,
          status: "pending",
        });
        await customer.save();
        booking = {
          barberId,
          date,
          time,
          status: "pending",
          customer: customer.name,
        };
      } else {
        // If the user is not authenticated, customer details must be provided
        if (
          !customerDetails ||
          !customerDetails.name ||
          !customerDetails.phoneNumber
        ) {
          return next(
            errorHandler(
              400,
              "Customer details (name, phone number) are required for guest bookings."
            )
          );
        }

        // Handle guest booking logic (not saved under any customer profile)
        booking = {
          barberId,
          date,
          time,
          status: "pending",
          customer: customerDetails.name,
        };
      }

      // 5. If everything is successful, mark the slot as booked
      slotTime.isBooked = true;
      await barber.save();

      // 6. Respond with booking confirmation
    res.status(201).json({
        message: "Appointment booked successfully",
        booking,
      });
    return;
    } catch (error) {
      return next(errorHandler(500, `Internal Server Error ${error}`));
    }
  }
}

export default AppointmentController;
