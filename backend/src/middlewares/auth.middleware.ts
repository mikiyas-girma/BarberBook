import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import Logger from "../lib/logger.js";
import { IBarber } from "../types/barberInterface.js";
import { Barber } from "../models/barberModel.js";
import { RUser } from "../types/express.d.types.js";  
import { Customer } from "../models/customerModel.js";
import { ICustomer } from "../types/customerInterface.js";


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.path.includes('/api/auth')) {
    // Retrieve token from the request object.
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
            req.user = barberObject;
            req.userType = 'barber';
          } else {
            let customer = await Customer.findOne({ _id: decoded.id }).select('-password');
            if (!customer) {
              return next(errorHandler(401, 'Unknown user or invalid auth token'));
            }
            const customerObject: ICustomer = customer.toObject();
            req.user = customerObject;
            req.userType = 'customer';
          }
          return next();
        } catch (error) {
          return next(errorHandler(401, 'Cannot authentify user'));
        }
      }
    );
  }
  return next();
};


export const optionalAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = await req.cookies?.access_token;
  
    if (!token) {
      // Proceed without user authentication if no token is provided
      return next();
    }
  
    jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
      if (err) {
        // If token is invalid, proceed without user authentication
        return next();
      }
  
      try {
        const user = await Customer.findOne({ _id: decoded.id }).select('-password');
        if (!user) {
          return next();
        }
  
        const userObject: ICustomer = user.toObject();
        req.user = userObject;
        next();
      } catch (error) {
        console.error('Auth middleware error:', error);
        next();
      }
    });
  };
