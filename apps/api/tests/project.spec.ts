var should = require('chai').should()
var supertest = require('supertest')
var api = supertest('http://localhost:3000/api')

describe('Project unit tests:', () => {
  it('Should create a Project instance', (done: Function) => {
    api
      .post('/projects')
      .send({
        name: 'test',
        salesHandoff: 'Sun Aug 27 2017 17:18:56 GMT-0400 (Eastern Daylight Time)',
        clientKickoff: 'Sun Aug 27 2017 17:18:56 GMT-0400 (Eastern Daylight Time)',
        devKickoff: 'Sun Aug 27 2017 17:18:56 GMT-0400 (Eastern Daylight Time)',
      })
      .expect(200, done)
  })
})
