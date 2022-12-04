const multer = require('multer');
const upload = multer();

module.exports = upload.array('image', 4);
