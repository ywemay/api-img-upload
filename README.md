# API Image upload

A class that helps to simplify the creation of an image upload endpoint for an API.

## Usage

Create a controller derivated from ImageUpload:

```js
// example image upload controller
// controller/example.js

const { ImageUpload } = require('ywemay-api-imp-upload');
const { checkAuth } = require('ywemay-api-user');

const DIR_UPLOADS = './uploads'
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
```

In your ```app.js``` file append:

```js
// ...
const { config } = require('ywemay-api-img-upload');
const Upload = require('./upload');

const app = express();
config(app);
Upload.config(app);
```