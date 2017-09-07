import { BootScript } from '@mean-expert/boot-script'
import * as Promise from 'bluebird'
import * as TestUsers from './test-data/Account.json'
import * as TestRoles from './test-data/Role.json'
import * as TestControls from './test-data/ACL.json'

@BootScript()
class TestData {
  constructor(app: any, cb: any) {
    const User = app.models.Account
    const Role = app.models.Role
    const Control = app.models.ACL

    User.exists('admin-user')
      .then((res: any) => {
        if (res) {
          return console.log('[test-data]', 'admin-user already exists')
        }
        this.createData(User, [TestUsers])
        this.createData(Role, [TestRoles])
        this.createData(Control, [TestControls])
      })

    Role.find({ where: { name: 'Admin' } })
      .then((role: any) => role[0].principals.create({ principalType: 'USER', principalId: 'admin-user' }))
  }

  createData(Model: any, data: any[]) {
    data.forEach(item => {
      Model.create(data)
        .then((res: any) => console.log('[test-data]', `${res.length} items created for model`, Model.modelName))
        .catch((err: any) => console.log('[test-data]', `Data could not be created for model`, Model.modelName))
    })
  }
}

module.exports = TestData
