import { Request, Response, NextFunction } from "express";
import { Barber } from "../../models/barberModel.js";
import { Customer } from "../../models/customerModel.js";
import { errorHandler } from "../../utils/errorHandler.js";
import { IAppointment } from "../../types/customerInterface.js";
import { IBooking } from "../../types/barberInterface.js";
import mongoose from "mongoose";
import { Types } from "mongoose";


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
        const customerBooking: IAppointment = {
          barberId,
          slotId: slotTime._id,
          date: new Date(date),
          time,
          status: "pending",
        };
        customer.bookings.push(customerBooking);
        await customer.save();

        // Prepare booking for response and barber's booking
        booking = {
          barberId,
          slotId: slotTime._id,
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
          slotId: slotTime._id,
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
        _id: new mongoose.Types.ObjectId(),
        customerDetails: {
            customerId,
            name: booking.customerName,
            phoneNumber: customerId ? req.user.phoneNumber : customerDetails.phoneNumber,
            email: customerId ? req.user.email : customerDetails?.email,
            isCustomer: customerId ? true : false,
        },
        date: new Date(date),
        time,
        slotId: slotTime._id,
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

  static async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const { slotId } = req.params;

      // Find the barber who has this booking
    const barber = await Barber.findOne({
      "bookings.slotId": slotId
    });
      if (!barber) {
        res.status(404).json({ message: "Appointment not found." });
        return;
      }

      // Find the specific booking
      const booking = barber.bookings.find((b) => b.slotId.equals(slotId));

      if (!booking) {
        res.status(404).json({ message: "Booking not found." });
        return;
      }

      // Check if the logged-in user is authorized (either the customer or the barber)
      const isCustomer = booking.customerDetails.customerId.equals(userId);
      const isBarber = barber._id.equals(userId);

      if (!isCustomer && !isBarber) {
        res.status(403).json({ message: "Unauthorized to cancel this booking." });
        return;
      }

      // Update the booking status to "cancelled"
      booking.status = "cancelled";

      // Make the time slot available again
      const slotDate = booking.date;
      const slotTime = booking.time;

      const availableSlot = barber.availableSlots.find(
        (slot) => slot.date.toISOString() === new Date(slotDate).toISOString()
      );

      if (availableSlot) {
        const timeSlot = availableSlot.times.find((time) => time.time === slotTime);
        if (timeSlot) {
          timeSlot.isBooked = false;
        }
      }

      // Save the updated barber document
      await barber.save();

    // Find the customer who has this booking
    const customer = await Customer.findOne({
      "bookings.slotId": slotId
    });

    if (customer) {
      // Find the specific booking in the customer's profile
      const customerBooking = customer.bookings.find((b) => b.slotId.equals(slotId));

      if (customerBooking) {
        // Update the booking status to "cancelled"
        customerBooking.status = "cancelled";
        await customer.save();
      }
    }

    res.status(200).json({ message: "Appointment cancelled successfully." });
    } catch (error: any) {
      console.error("Error in cancelAppointment:", error);
    res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }

}

export default AppointmentController;
