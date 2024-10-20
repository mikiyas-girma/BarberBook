import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/errorHandler.js";
import { Barber } from "../../models/barberModel.js";
import { v2 as cloudinary } from 'cloudinary';
import Logger from "../../lib/logger.js";

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

  static async deletePortfolioImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    const barberId = req.user._id;
    const { imageUrl } = req.body;
  
    try {
      // Find the barber by ID
      const barber = await Barber.findById(barberId);
      if (!barber) {
        return next(errorHandler(404, "Barber not found."));
      }
  
      // Check if the image exists in the portfolio
      const imageIndex = barber.portfolio.findIndex((url) => url === imageUrl);
      if (imageIndex === -1) {
        return next(errorHandler(404, "Image not found in portfolio."));
      }
  
      // Extract Cloudinary public ID from the image URL
      const publicId = imageUrl.split("/").pop()?.split(".")[0];
      if (!publicId) {
        return next(errorHandler(400, "Invalid image URL."));
      }
  
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(`barberbook/${publicId}`).then((result) => {
        if (result.result === "not found") {
          Logger.error("Image not found in Cloudinary.");
        }    
      });
  
      // Remove the image from the barber's portfolio
      barber.portfolio.splice(imageIndex, 1);
      await barber.save();
  
      res.status(200).json({
        message: "Image deleted successfully",
        updatedPortfolio: barber.portfolio,
      });
    } catch (error) {
      next(errorHandler(500, `Internal Server Error: ${error}`));
    }
  }

}

export default PortfolioController;
