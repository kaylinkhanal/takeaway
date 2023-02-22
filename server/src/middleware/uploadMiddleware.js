const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// const upload = multer({ storage: storage }).single('avatar'||'photo')
const upload = multer({ storage: storage }).single('photo')
exports.upload = upload;