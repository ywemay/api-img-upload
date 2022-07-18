const chai = require('chai');
require('chai').should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('./server');

exports.server = server;

exports.checkView = ({done, fileName, status = 200}) => {
  chai.request(server)
  .get('/img/example/' + fileName)
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

exports.checkUpload = ({done, fileName, status = 200}) => {
  chai.request(server)
  .post('/upload/example')
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
