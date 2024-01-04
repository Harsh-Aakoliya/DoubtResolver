// require('dotenv').config();
// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = { cloudinary };
import dotenv from 'dotenv';
import * as Cloudinary from 'cloudinary'


dotenv.config();
class CloudinaryUtil {
  constructor() {
    Cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
}
const cloudinaryUtil = new CloudinaryUtil();
export default cloudinaryUtil;