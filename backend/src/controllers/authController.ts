import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import { Customer } from '../models/customerModel.js';
import { Barber } from '../models/barberModel.js';

class AuthController {
  // Signup for Customer or Barber
  static async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, isBarber } = req.body;

    // Check for missing required fields
    const missingFields = ['name', 'email', 'password'].filter(
      (field) => !req.body[field]?.trim()
    );
    if (missingFields.length > 0) {
      return next(
        errorHandler(400, `Missing required fields: ${missingFields.join(', ')}`)
      );
    }

    try {
      // Check if the email already exists in Customer or Barber collection
      const existingCustomer = await Customer.findOne({ email });
      const existingBarber = await Barber.findOne({ email });

      if (existingCustomer || existingBarber) {
        return next(errorHandler(409, 'Email already in use.'));
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      let user;
      if (isBarber) {
        const { businessName, phoneNumber } = req.body;
        const missingBarberFields = ['businessName', 'phoneNumber'].filter(
            (field) => !req.body[field]?.trim()
            );
        if (missingBarberFields.length > 0) {
            return next(
                errorHandler(400, `Missing required fields: ${missingBarberFields.join(', ')}`)
            );
        }
        // Barber registration with trial period
        user = await Barber.create({
          name,
          email,
          password: hashedPassword,
          businessName,
          phoneNumber,
          subscriptionStatus: 'trial',
          trialEndDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30-day free trial
        });
      } else {
        // Customer registration
        user = await Customer.create({
          name,
          email,
          password: hashedPassword,
        });
      }

      res.status(201).json({
        message: `Signup successful for ${isBarber ? 'Barber' : 'Customer'}`,
        userId: user._id,
      });
    } catch (error) {
      next(errorHandler(500, 'Server error during signup.'));
    }
  }

  // Login logic
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, 'Email and password are required.'));
    }

    try {
      // First, check if the user is a customer or barber
      let user = await Customer.findOne({ email });
      if (!user) {
        user = await Barber.findOne({ email });
      }

      if (!user) {
        return next(errorHandler(404, 'User not found.'));
      }

      // Compare the passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return next(errorHandler(401, 'Invalid email or password.'));
      }

    //   todo: generate token

      res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
      next(errorHandler(500, 'Server error during login.'));
    }
  }
}

export default AuthController;
