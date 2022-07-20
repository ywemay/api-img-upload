const chai = require('chai');
require('chai').should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('./server');

exports.server = server;

exports.checkView = ({done, uri = '/img/example/', fileName, status = 200}) => {
  chai.request(server)
  .get(uri + fileName)
  .end((err, res) => {
    if (!err) {
      res.status.should.be.eq(status);
      done();
    }
    else {
      console.error(err);
    }
  })
}

exports.checkUpload = ({done, uri = '/upload/example', fileName, status = 200}) => {
  chai.request(server)
  .post(uri)
  .set({
    'Content-Type': 'multipart/form-data'
  })
  // .field('fileName', fileName)
  .attach('file', './test/img/' + fileName)
  .end((err, res) => {
    if (!err) {
      res.status.should.be.eq(status);
      done();
    } else {
      console.error(err);
    }
  })
}
