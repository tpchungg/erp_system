const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/img')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  },
  fields: [
    { name: 'AnhNV', maxCount: 1 },
    { name: 'AnhSP', maxCount: 1 }
  ]
})
const upload = multer({storage : storage});

module.exports = upload;

