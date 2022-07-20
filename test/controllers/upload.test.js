const { checkView, checkUpload } = require('../requests');

describe('Upload', () => {
  it('should upload the file', (done) => {
    checkUpload({done, fileName: 'test.png'})
  })

  it ('should access the file', (done) => {
    checkView({done, fileName: 'test.png'})
  })

  it('should upload the file to foo directory', (done) => {
    checkUpload({done, uri: '/upload/foo', fileName: 'test.png'})
  })
  
  it ('should access the file', (done) => {
    checkView({done, uri: '/img/foo/', fileName: 'test.png'})
  })
  
  it ('should access the file', (done) => {
    checkView({done, uri: '/img/foo/th/', fileName: 'test.png'})
  })
})