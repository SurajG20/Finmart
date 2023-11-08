const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Finmart',
    allowedFormats: ['jpeg', 'png', 'jpg', 'pdf'],
    use_filename: true,
    unique_filename: false,
  },
});
module.exports = {
  cloudinary,
  storage,
};
