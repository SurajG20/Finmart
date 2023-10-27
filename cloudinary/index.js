const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Creating Storage for cloudinary and multer with allowed formats like jpeg, png, jpg, pdf, doc, docx, txt, rtf

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Finmart',
    allowedFormats: ['jpeg', 'png', 'jpg', 'pdf', 'doc', 'docx', 'txt', 'rtf'],
  },
});
module.exports = {
  cloudinary,
  storage,
};
