// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    console.log("File uploaded to Cloudinary:", result);
    return {
      success: true,
      message: "File uploaded to Cloudinary successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return {
      success: false,
      message: "Error uploading file to Cloudinary",
      error: error.message,
    };
  }
}

module.exports = {
  uploadFileToCloudinary,
  isFileTypeSupported,
};
