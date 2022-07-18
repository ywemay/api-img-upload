const { ImageUpload } = require('../index');
const checkAuth =  (_req, _res, next) => {
  next();
}

const DIR_UPLOADS = __dirname + '/uploads'
const canUpload = (_req, _res, next) => {
  next();
}

const canView = (_req, _res, next) => {
  next();
}

const Upload = new ImageUpload({
  path: DIR_UPLOADS,
  uris: {
    upload: '/upload/example',
    view: '/img/example',
  },
  access: {
    upload: [ checkAuth, canUpload ],
    view: [ canView ],
  },
  onConfig: function(app, params) {

  },
  onUpload: function(params) {
    return new Promise((resolve) => {
      console.log('onLoad function fired...');
      resolve();
    })
  },
});

module.exports = Upload;