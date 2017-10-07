import { Model } from '@mean-expert/model'
/**
 * @module StorageContainer
 * @description
 * Write a useful StorageContainer Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeDelete: { name: 'before delete', type: 'operation' },
  },
  remotes: {
    myRemote: {
      returns: { arg: 'result', type: 'array' },
      http: { path: '/my-remote', verb: 'get' },
    },
  },
})
class StorageContainer {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeDelete(ctx: any, next: Function): void {
    const container = { container: ctx.where.id }
    this.model.app.models.StorageFile.deleteAll(container, (err, res) => {
      if (err) return next(err)
      next()
    })
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next)
  }
}

module.exports = StorageContainer
