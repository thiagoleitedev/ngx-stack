import { Model } from '@mean-expert/model'
/**
 * @module Storage
 * @description
 * Write a useful Storage Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    afterDestroy: { name: 'destroyContainer', type: 'afterRemote' },
    afterRemoveFile: { name: 'removeFile', type: 'afterRemote' },
    afterUpload: { name: 'upload', type: 'afterRemote' },
    beforeCreate: { name: 'createContainer', type: 'beforeRemote' },
  },
  remotes: {
    myRemote: {
      returns: { arg: 'result', type: 'array' },
      http: { path: '/my-remote', verb: 'get' },
    },
  },
})
class Storage {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Operation Hooks
  afterDestroy(ctx: any, modelInstance: any, next: Function): void {
    this.model.app.models.StorageContainer.deleteById(
      ctx.args.container,
      (err, newContainer) => {
        if (err) return next(err)
        next()
      },
    )
  }

  afterRemoveFile(ctx: any, modelInstance: any, next: Function): void {
    const fileId = `${ctx.args.container}-${ctx.args.file}`
    this.model.app.models.StorageFile.deleteById(fileId, (err, deletedFile) => {
      if (err) return next(err)
      next()
    })
  }

  afterUpload(ctx: any, modelInstance: any, next: Function): void {
    const fileInfo = modelInstance.result.files.file[0]
    fileInfo.id = `${fileInfo.container}-${fileInfo.name}`
    this.model.app.models.StorageFile.upsert(fileInfo)
    next()
  }

  beforeCreate(ctx: any, modelInstance: any, next: Function): void {
    const container = ctx.args.options
    container.id = container.name
    // check if folder exists
    this.model.getContainer(container.name, (err, existingContainer) => {
      if (err) {
        this.model.app.models.StorageContainer.create(
          container,
          (err, newContainer) => {
            if (err) return next(err)
            next()
          },
        )
      }
      if (existingContainer) {
        // check if data exists in db
        this.model.app.models.StorageContainer.findById(
          container.id,
          (err, existingContainer) => {
            if (err)
              return next(
                this.model.app.models.StorageContainer.create(container),
              )
            return next(new Error('Container Already Exists!'))
          },
        )
      }
    })
  }
  // Remote Methods
  myRemote(next: Function): void {
    this.model.find(next)
  }
}

module.exports = Storage
