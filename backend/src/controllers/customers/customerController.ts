import { Request, Response } from "express";
import { Barber } from "../../models/barberModel.js";
import { Customer } from "../../models/customerModel.js";

class CustomerController {
  // Search bookings by phone or email
  static async searchBookings(req: Request, res: Response): Promise<void> {
    try {
      const { phoneNumber, email } = req.query;

      // Ensure that either phone number or email is provided
      if (!phoneNumber && !email) {
        res.status(400).json({
          message:
            "Please provide either phone number or email to search bookings.",
        });
        return;
      }

      // Construct query filter based on provided phone number or email
      const searchFilter: any = {};
      if (phoneNumber) {
        searchFilter["bookings.customerDetails.phoneNumber"] = phoneNumber;
      }
      if (email) {
        searchFilter["bookings.customerDetails.email"] = email;
      }

      // Find barbers that have bookings matching the search filter
      const barbers = await Barber.find({
        $or: [
          { "bookings.customerDetails.phoneNumber": phoneNumber },
          { "bookings.customerDetails.email": email },
        ],
      }).populate({
        path: "bookings.customerDetails.customerId",
        select: "name email phoneNumber",
      });

      // Collect all matched bookings
      let matchedBookings: any[] = [];
      barbers.forEach((barber) => {
        const filteredBookings = barber.bookings.filter((booking) => {
          if (
            phoneNumber &&
            booking.customerDetails.phoneNumber === phoneNumber
          ) {
            return true;
          }
          if (email && booking.customerDetails.email === email) {
            return true;
          }
          return false;
        });
        matchedBookings.push(...filteredBookings);
      });

      if (matchedBookings.length === 0) {
        res
          .status(404)
          .json({ message: "No bookings found with the provided details." });
        return;
      }

      res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings: matchedBookings,
      });
      return;
    } catch (error: any) {
      console.error("Error in searchBookings:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
      return;
    }
  }

  static async getMyBookings(req: Request, res: Response): Promise<void> {
    try {
      const customerId = req.user._id;

      if (!customerId) {
        res.status(401).json({ message: "Unauthorized access. Please log in." });
        return;
      }

      // Find the customer and their bookings
      const customer = await Customer.findById(customerId).select("bookings");

      if (!customer || customer.bookings.length === 0) {
        res.status(404).json({ message: "No bookings found for this user." });
        return;
      }

      // Return the customer's bookings
      res.status(200).json({
        message: "Bookings retrieved successfully",
        bookings: customer.bookings,
      });
    } catch (error: any) {
      console.error("Error in getMyBookings:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }

}

export default CustomerController;
