import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errorHandler.js";
import { Barber } from "../../models/barberModel.js";

class PortfolioController {
  static async uploadPortfolios(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const barberId = req.user?._id; // Assuming barber is authenticated

    try {
      // Check if there are any uploaded URLs in the request
      const cloudinaryUrls: string[] = req.body.cloudinaryUrls;
      if (!cloudinaryUrls || cloudinaryUrls.length === 0) {
        return next(errorHandler(400, "No images uploaded."));
      }

      // Find the barber by ID
      const barber = await Barber.findById(barberId);
      if (!barber) {
        return next(errorHandler(404, "Barber not found."));
      }

      // Add the uploaded URLs to the barber's portfolio
      barber.portfolio = barber.portfolio.concat(cloudinaryUrls);

      // Save the updated barber with the portfolio images
      await barber.save();

      res.status(200).json({
        message: "Portfolio updated successfully.",
        portfolio: barber.portfolio,
      });
    } catch (error) {
      next(errorHandler(500, `Internal Server Error: ${error}`));
    }
  }

  static async getPortfolios(req: Request, res: Response, next: NextFunction): Promise<void> {
    const  barberId  = req?.params?.barberId;
    if (!barberId) {
      return next(errorHandler(400, "Barber ID is required."));
    }

    try {
      // Find the barber by ID
      const barber = await Barber.findById(barberId);
      if (!barber) {
        return next(errorHandler(404, "Barber not found."));
      }

      // Return the barber's portfolio
      res.status(200).json({
        message: "Portfolio retrieved successfully.",
        portfolio: barber.portfolio,
      });
    } catch (error) {
      next(errorHandler(500, `Internal Server Error: ${error}`));
    }
  }
}

export default PortfolioController;
