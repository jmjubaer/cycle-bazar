import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
// Configuration
cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const uploadImageIntoCloudinary = async (
    path: string,
    imageName: string
) => {
    const uploadResult = await cloudinary.uploader
        .upload(path, {
            public_id: imageName,
        })
        .catch((error) => {
            throw new Error(error.message);
        });

    fs.unlink(path, (err) => {
        if (err) {
            throw new Error(err.message);
        } else {
            console.log("File is deleted successfully");
        }
    });
    return uploadResult;
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

export const upload = multer({ storage: storage });
