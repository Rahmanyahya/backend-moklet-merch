import multer from "multer";
import { Request, Response, NextFunction } from "express";
import { root_dir } from "../config";
import path from "path";

// Handle photo product storage
const photoProductStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (err: Error | null, destination: string) => void) => {
        const storagePath = `${root_dir}/private/product-images/`
        callback(null, storagePath)
    },
    filename: (req: Request, file: Express.Multer.File, callback: (err: Error | null, destination: string) => void) => {
        const fileName = `${Date.now()}-${file.originalname}`
        callback(null, fileName)
    },
})

// Handle payment photo
const photoPaymentStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (err: Error | null, destination: string) => void) => {
        const storagePath = `${root_dir}/private/payment-images/`
        callback(null, storagePath)
    },
    filename: (req: Request, file: Express.Multer.File, callback: (err: Error | null, destination: string) => void) => {
        const fileName = `${Date.now()}-${Math.random()}-${file.originalname}`
        callback(null, fileName)
    },
})

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const originalName = file.originalname.toLowerCase();
    const extension = path.extname(originalName).slice(1);
    
    if (!originalName || originalName === '.') {
        return callback(null, false);
    }
    
    const nameWithoutExt = path.basename(originalName, extension);
    if (nameWithoutExt.includes('.')) {
        return callback(null, false);
    }
    
    if (!extension) {
        return callback(null, false);
    }
    
    if (allowedExtensions.includes(extension)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

// Create multer upload instances
const uploadPaymentImages = multer({
    storage: photoPaymentStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2mb
})

const uploadProductPhoto = multer({
    storage: photoProductStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2mb
})

// Error handling middleware
const handleUploadError = (uploadFunction: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        uploadFunction(req, res, (err: any) => {
            if (err instanceof multer.MulterError) {
                // Multer error (e.g., file too large)
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // Unknown error
                return res.status(500).json({ error: "An unknown error occurred during file upload" });
            } else if (!req.file) {
                // File didn't pass the fileFilter
                return res.status(400).json({ error: "Invalid file. Please check the file type and try again." });
            }
            // If no error, proceed to the next middleware
            next();
        });
    };
};

// Export middleware-wrapped upload functions
export const uploadPaymentImage = handleUploadError(uploadPaymentImages.single('payment'));
export const uploadProductImage = handleUploadError(uploadProductPhoto.single('product'));      