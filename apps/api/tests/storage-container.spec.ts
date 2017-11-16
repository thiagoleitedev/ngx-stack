var should = require('chai').should()
var supertest = require('supertest')
var api = supertest('http://localhost:3000/api')

describe('StorageContainer unit tests:', () => {
  it('Should create a StorageContainer instance', (done: Function) => {
    api
      .post('/storage-containers')
      .send({
        name: 'test',
      })
      .expect(200, done)
  })
})
