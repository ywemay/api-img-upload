const { checkView, checkUpload } = require('../requests');

describe('Upload', () => {
  it('should upload the file', (done) => {
    checkUpload({done, fileName: 'test.png'})
  })

  it ('should access the file', (done) => {
    checkView({done, fileName: 'test.png'})
  })
})