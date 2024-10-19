import { Request, Response, NextFunction } from "express";
import { Barber } from "../../models/barberModel.js";
import { Customer } from "../../models/customerModel.js";
import { errorHandler } from "../../utils/errorHandler.js";
import { IBooking } from "../../types/customerInterface.js";


class AppointmentController {
  static async bookAppointment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { barberId, date, time, customerDetails } = req.body;
    const customerId = req.user?._id;

    try {
      // Validate request data
      if (!barberId || !date || !time) {
        return next(
          errorHandler(400, "Barber ID, date, and time are required.")
        );
      }

      // Find the barber by ID
      const barber = await Barber.findById(barberId);
      if (!barber) {
        return next(errorHandler(404, "Barber not found."));
      }

      // Find the requested slot in the barber's availability
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

      // Create the booking object
      let booking;
      if (customerId) {
        const customer = await Customer.findById(customerId);
        if (!customer) {
          return next(errorHandler(404, "Customer not found."));
        }

        // Add booking to the authenticated customer's profile
        const customerBooking: IBooking = {
          barberId,
          date: new Date(date),
          time,
          status: "pending",
        };
        customer.bookings.push(customerBooking);
        await customer.save();

        // Prepare booking for response and barber's booking
        booking = {
          barberId,
          date,
          time,
          status: "pending",
          customerName: customer.name, // Get customer name
          phoneNumber: customer.phoneNumber,
          email: customer?.email,
        };
      } else {
        // Guest booking logic
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

        booking = {
          barberId,
          date,
          time,
          status: "pending",
          customerName: customerDetails.name, // Store guest name
          phoneNumber: customerDetails.phoneNumber,
          email: customerDetails?.email,
        };
      }

      // Save booking to the barber's profile
      barber.bookings.push({
        customerDetails: {
            customerId,
            name: booking.customerName,
            phoneNumber: customerId ? req.user.phoneNumber : customerDetails.phoneNumber,
            email: customerId ? req.user.email : customerDetails?.email,
            isCustomer: customerId ? true : false,
        },
        date: new Date(date),
        time,
        status: "pending",
      });
      slotTime.isBooked = true; // Mark the slot as booked
      await barber.save();

      // Respond with booking confirmation
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
