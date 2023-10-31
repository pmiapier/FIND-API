const cloudinary = require('cloudinary').v2;
require(`dotenv`).config()
const {CLOUDINARY_NAME,CLOUDINARY_API,CLOUDINARY_API_SECRET} = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
