import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../utils/errorHandler.js';
import { Barber } from '../../models/barberModel.js';

class BarberController {
  static async getAllBarbers(req: Request, res: Response, next: NextFunction) {
    try {
      const barbers = await Barber.find()
                            .select('-password -subscriptionStatus \
                                    -subscriptionPlan -trialEndDate -subscriptionEndDate');
      res.status(200).json({
        status: 'success',
        data: {
          barbers,
        },
      });
    } catch (error) {
      return next(errorHandler(500, 'Server error'));
    }
  }
}

export default BarberController;
