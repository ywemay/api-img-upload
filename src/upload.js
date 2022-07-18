const fs = require('fs');
const path = require('path');
const express = require('express');

const staticOptions = {
  setHeaders: function (res, _path, _stat) {
    res.set('Cross-Origin-Resource-Policy', null)
  }
};

 
class ImageUpload {

  params = {}

  constructor(params) {
    this.params = params;
  }

  sendFile = (req, res) => {
    try {
      const { path } = this.params;
      const { fileName } = req.params;
      res.sendFile(path + '/' + fileName);
    }
    catch(e) {
      console.error(e);
    }
  }

  config = (app) => {

    const { uris, access, onConfig } = this.params;

    app.post(uris.upload, [...access.upload, this.uploadImage]);
    app.get(uris.view + '/:fileName', [ ...access.view, this.sendFile ]);

    if( typeof onConfig === 'function') {
      onConfig(app, this.params);
    }
  }

  uploadImage = async (req, res) => {
    try {
      if(!req.files) {
        res.status(500).send({
          status: false,
          message: 'No file uploaded'
        });
      } else {
        const { path, onUpload } = this.params;
        console.log('uploadImage, path', path);
        let file = req.files.file;
        let finalFileName = file.name;
        if (!file) return res.status(500).send({status: false, message: 'No file key found in files'});

        let exists = true;
        let count = 1;
        while (exists) {
          exists = await fs.existsSync(path + finalFileName);
          if (exists) finalFileName = file.name.replace(/\.(\w+)$/, '_' + count + '.$1')
          count++;
        }
        
        const fileName = path + '/' + finalFileName;
        await file.mv(fileName);

        if (onUpload === 'function') {
          await onUpload({ ...this.params, fileName});
        }
        const data = {
          status: true,
          message: 'File is uploaded',
          data: {
            initialName: file.name,
            name: finalFileName,
            mimetype: file.mimetype,
            size: file.size
          }
        }

        if (typeof onUpload === 'function') {
          await onUpload({...this.params, data});
        }

        res.send(data);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

module.exports = ImageUpload;