import { IBarber } from "./barberInterface.js";
import { ICustomer } from "./customerInterface.js";


export interface RUser {
  firstName: string,
  lastName: string,
  email: string,
  role: string
  phoneNumber: string
}

// Extend Express Request interface to include 'user' as a Barber or Customer
declare global {
  namespace Express {
    interface Request {
      user: IBarber | ICustomer;
      userType: string;
    }
  }
}
