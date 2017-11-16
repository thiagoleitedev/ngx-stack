var should = require('chai').should()
var supertest = require('supertest')
var api = supertest('http://localhost:3000/api')

describe('Storage unit tests:', () => {
  it('Should create a Storage instance', (done: Function) => {
    api
      .post('/storages')
      .send({})
      .expect(200, done)
  })
})
