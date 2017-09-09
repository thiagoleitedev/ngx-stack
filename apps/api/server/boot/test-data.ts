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

    const adminId = 'admin-user'
    const adminRole = 'Admin'

    User.exists(adminId)
      .then((res: any) => {
        if (res) {
          return console.log('[test-data]', 'admin-user already exists: skipping creation')
        }
        return Promise.all([
          this.createData(User, [TestUsers]),
          this.createData(Role, [TestRoles]),
          this.createData(Control, [TestControls]),
        ])
          .then(() => Role.find({ where: { name: adminRole } }))
          .then((role: any) => role[0].principals.create({ principalType: 'USER', principalId: adminId }))
          .tap((res: any) => console.log('[test-data]', `${adminRole} role assigned to ${adminId}`))
      })
  }

  createData(Model: any, data: any[]) {
    return Model.create(data)
      .tap((res: any) => console.log('[test-data]', `${res.length} items created for model`, Model.modelName))
      .catch((err: any) => console.log('[test-data]', `Data could not be created for model`, Model.modelName, ':', err))
  }
}

module.exports = TestData
