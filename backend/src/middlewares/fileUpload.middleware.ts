import multer, { Multer } from "multer";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

// Multer configuration to store files in memory
const storage = multer.memoryStorage();
export const upload: Multer = multer({
  storage,
  fileFilter: (req, file, cb: any) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Please upload an image file"), false);
    }
    cb(null, true);
  },
});

// Upload images to Cloudinary
export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return next();
    }

    const uploadPromises = files.map(async (file) => {
      const resizedBuffer = await sharp(file.buffer).resize(800, 600).toBuffer();

      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "barberbook" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            if (result && result.secure_url) {
              return resolve(result.secure_url);
            }
            return reject(new Error("Upload failed"));
          }
        ).end(resizedBuffer);
      });
    });

    const cloudinaryUrls = await Promise.all(uploadPromises);
    req.body.cloudinaryUrls = cloudinaryUrls; // Add the URLs to req.body

    next(); 
  } catch (error) {
    next(error);
  }
};
