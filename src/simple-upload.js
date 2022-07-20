const gm = require('gm');
const fs = require('fs');

const NO_FILE_UPLOAD = {
  status: false,
  message: 'No file uploaded'
}
const NO_THUMB = {
  status: false,
  message: 'Failed to make the thumbnail'
}

exports.uploadImage = (params) => {
  const { path } = params;
  return async (req, res, next) => { 
    try {
      if (!req.files) return res.status(500).send(NO_FILE_UPLOAD);
      const { file } = req.files;
      if (!file) return reject(res.status(500).send(NO_FILE_UPLOAD));
      let exists = true;
      let count = 1;
      let finalFileName = file.name;
      while (exists) {
        exists = await fs.existsSync(path + finalFileName);
        if (exists) finalFileName = file.name.replace(/\.(\w+)$/, '_' + count + '.$1')
        count++;
      }
      const fileName = path + '/' + finalFileName;
      await file.mv(fileName);

      res.data = {
        status: true,
        message: 'File is uploaded',
        data: {
          initialName: file.name,
          name: finalFileName,
          mimetype: file.mimetype,
          size: file.size
        }
      }
      res.fileUpload = { fileName }
      next();
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
}

exports.sendResult = (_req, res) => res.send(res.data);

exports.makeThumb = (params) => {
  const { subDir, size } = params;
  return (_req, res, next) => {
    const { fileName } = res.fileUpload;
    if (!fileName) return next();
    const parts = fileName.split('/');
    const bName = parts.pop();
    parts.push(subDir || 'thumb');
    gm(fileName)
    .resize(size.w || 240, size.h || 240)
    .write(parts.join('/') + '/' + bName , function (err) {
      if (err) return res.status(500).send(NO_THUMB);
      next();
    })
  }
}

exports.viewImage = (params) => {
  const { path } = params;
  return (req, res) => {
    const { fileName } = req.params;
    try {
      res.sendFile(path + '/' + fileName);
    } catch (e) {
      console.log(e);
      res.status(500).send({ status: false, message: 'Failed to load the file.'});
    }
  } 
}