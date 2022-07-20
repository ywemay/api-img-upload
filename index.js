const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const ImageUpload = require('./src/upload');
const SimpleUpload = require('./src/simple-upload');
module.exports = {
  ImageUpload,
  ...SimpleUpload,
  config: (app) => {
    app.use(fileUpload({
      createParentPath: true
    }));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
  }
}