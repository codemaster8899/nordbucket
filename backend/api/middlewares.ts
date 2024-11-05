import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
  MiddlewaresConfig,
} from "@medusajs/medusa";
import fs from "fs";
import path from "path";
import sharp from "sharp";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uploadMiddleware = upload.array("files", 12);
console.log({ uploadMiddleware });

const optimizeImage = async (filePath: string) => {
  const maxSizeKB = 500;
  let quality = 60;
  let resizedImageBuffer;
  const outputFilePath = path.join(
    "uploads",
    "optimized-" + path.basename(filePath)
  );

  try {
    do {
      resizedImageBuffer = await sharp(filePath)
        .resize({
          width: 1200,
          withoutEnlargement: true,
        })
        .jpeg({ quality: 60, progressive: true, force: false })
        .png({ quality: 60, progressive: true, force: false })
        .toBuffer();

      if (resizedImageBuffer.length > maxSizeKB * 1024) {
        quality -= 10;
      }
    } while (resizedImageBuffer.length > maxSizeKB * 1024 && quality > 10);

    await sharp(resizedImageBuffer).toFile(outputFilePath);

    return outputFilePath;
  } catch (error) {
    console.error("Error optimizing image:", error);
  }
};

const imageOptimizationMiddleware = async (
  req: any,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  if (req.files) {
    try {
      const promises = req.files.map(async (file) => {
        const optimizedFilePath = await optimizeImage(file.path);
        file.path = optimizedFilePath; // Update the file path to the optimized one
      });
      await Promise.all(promises);
      next();
    } catch (error) {
      return res.status(500).json({ message: "Image optimization failed" });
    }
  } else {
    next();
  }
};

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/admin/uploads",
      middlewares: [uploadMiddleware, imageOptimizationMiddleware],
    },
  ],
};
