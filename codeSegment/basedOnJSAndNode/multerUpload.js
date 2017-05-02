var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
  	var an = 'qwertyuiopasdfghjklzxcvbnm123456789';
  	var originalname = file.fieldname + '-' + Date.now() + an[Math.floor(Math.random() * an.length)] + '.' + file.originalname.replace(/.+\./,'');
    cb(null, originalname)
  }
});

// var upload = multer({ storage: storage });
module.exports = multer({ storage: storage });
