import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import { Customer } from "../models/customerModel.js";
import { Barber } from "../models/barberModel.js";
import Logger from "../lib/logger.js";
import jwt from "jsonwebtoken";
import { IBarber } from "../types/barberInterface.js";
import { ICustomer } from "../types/customerInterface.js";

class AuthController {
  // Signup for Customer or Barber
  static async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, phoneNumber, isBarber } = req.body;

    // Check for missing required fields
    const missingFields = ["name", "email", "password", "phoneNumber"].filter(
      (field) => !req.body[field]?.trim()
    );
    if (missingFields.length > 0) {
      return next(
        errorHandler(
          400,
          `Missing required fields: ${missingFields.join(", ")}`
        )
      );
    }

    try {
      // Check if the email already exists in Customer or Barber collection
      if (isBarber) {
        const existingBarber = await Barber.findOne({ email });
        if (existingBarber) {
          return next(errorHandler(409, "Email already in use."));
        }
      }
      const existingCustomer = await Customer.findOne({ email });

      if (existingCustomer) {
        return next(errorHandler(409, "Email already in use."));
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      let user;
      if (isBarber) {
        const { businessName, phoneNumber } = req.body;
        const missingBarberFields = ["businessName", "phoneNumber"].filter(
          (field) => !req.body[field]?.trim()
        );
        if (missingBarberFields.length > 0) {
          return next(
            errorHandler(
              400,
              `Missing required fields: ${missingBarberFields.join(", ")}`
            )
          );
        }
        // Barber registration with trial period
        user = await Barber.create({
          name,
          email,
          password: hashedPassword,
          businessName,
          phoneNumber,
          subscriptionStatus: "trial",
          trialEndDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30-day free trial
        });
      } else {
        // Customer registration
        user = await Customer.create({
          name,
          email,
          phoneNumber,
          password: hashedPassword,
        });
      }

      //   generate token
      const token = jwt.sign({ userId: user._id },  process.env.JWT_SECRET!);

      Logger.info(`User ${user.email} signed up`);
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000 * 24, // 24 hours
        secure: process.env.NODE_ENV === "production",
      });

      res.status(201).json({
        message: `Signup successful for ${isBarber ? "Barber" : "Customer"}`,
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isBarber,
        },
      });
    } catch (error) {
      Logger.error(`Error signing up: ${error}`);
      next(errorHandler(500, "Server error during signup."));
    }
  }

  // Login logic
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorHandler(400, "Email and password are required."));
    }

    try {
      // First, check if the user is a customer or barber
      let user = await Customer.findOne({ email });
      if (!user) {
        user = await Barber.findOne({ email });
      }

      if (!user) {
        return next(errorHandler(404, "User not found."));
      }

      // Compare the passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return next(errorHandler(401, "Invalid email or password."));
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
        secure: process.env.NODE_ENV === "production",
      });

      const { password: pass, ...theuser } = user.toObject();

      res.status(200).json({ message: "Login successful", user: theuser });
    } catch (error) {
      next(errorHandler(500, "Server error during login."));
    }
  }

    // Check if the user is logged in
    static async checkAuth(req: Request, res: Response, next: NextFunction) {
        const token = await req.cookies?.access_token;
        if (!token) {
            return next(errorHandler(401, 'Unauthorized please login'));
          }
          return jwt.verify(
            token,
            process.env.JWT_SECRET!,
            async (err: any, decoded: any) => {
              if (err) {
                Logger.error(`error in jwt verify ${err}`)
                console.error('Authentification error: unknow error');
                return next(errorHandler(401, 'Cannot authentify user'));
              }
              try {
                let barber = await Barber.findOne({ _id: decoded.id }).select('-password');
                if (barber) {
                  const barberObject: IBarber = barber.toObject();
                  return res.status(200).json({ user: barberObject });
                } else {
                  let customer = await Customer.findOne({ _id: decoded.id }).select('-password');
                  if (!customer) {
                    return next(errorHandler(401, 'Unknown user or invalid auth token'));
                  }
                  const customerObject: ICustomer = customer.toObject();
                  return res.status(200).json({ user: customerObject})
                }
                return next();
              } catch (error) {
                return next(errorHandler(401, 'Cannot authentify user'));
              }
            }
          );      
    }

}

  

export default AuthController;
