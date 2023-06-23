var cloudinary = require("cloudinary").v2;
const fs = require('fs')
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});


const uploadFile = (path) => {
  // path-> object of fileUpload-express
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path.tempFilePath, {
      public_id: `${Date.now()}_${path.name}`,
      resource_type: "auto",
      folder: "cu-files",
    }, (error, result) => {
      if (result && result.secure_url) {
        fs.unlink(path.tempFilePath, (err)=>{
          if(err) throw err
        });
        const {api_key, ...savedData} = result
        return resolve(savedData);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};
const uploadMultipleFiles = (pathList) => {
  return new Promise((resolve, reject) => {
    const uploads = pathList.map((path) => uploadFile(path));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};

module.exports = {
  uploadFile, uploadMultipleFiles
}