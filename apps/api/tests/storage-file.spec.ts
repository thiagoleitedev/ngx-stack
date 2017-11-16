var should = require('chai').should()
var supertest = require('supertest')
var api = supertest('http://localhost:3000/api')

describe('StorageFile unit tests:', () => {
  it('Should create a StorageFile instance', (done: Function) => {
    api
      .post('/storage-files')
      .send({
        name: 'test',
        type: 'test',
        size: 12345,
      })
      .expect(200, done)
  })
})
