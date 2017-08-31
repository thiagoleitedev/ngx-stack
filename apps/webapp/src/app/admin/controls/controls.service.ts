import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { ACLApi, ACL, RoleApi, Role, SDKModels } from '@ngx-plus/ngx-sdk'
export { ACL as Control } from '@ngx-plus/ngx-sdk'
import { NgxUiService, NgxFormConfig } from '../../ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { ControlActions, UserActions } from '../../state'

@Injectable()
export class ControlsService {
  public roles: Role[]
  public roles$: Observable<any>
  public items$: Observable<any>
  public selected$: Observable<any>
  public selected: any
  public formConfig: NgxFormConfig
  private admin$: Observable<any>

  constructor(
    private api: ACLApi,
    private models: SDKModels,
    private roleApi: RoleApi,
    private store: Store<any>,
    private ui: NgxUiService
  ) {
    this.admin$ = this.store.select('admin')
    this.roles$ = this.admin$.map(admin => admin.roles)
    this.items$ = this.admin$.map(admin => admin.controls)
    this.selected$ = this.items$.map(controls => controls.selected)
    const modelList = this.models.getAll()
    const modelOptions = [{ label: '*', value: '*' }]
    Object.keys(modelList).forEach(model => {
      modelOptions.push({ label: model, value: model })
    })
    this.formConfig = {
      fields: {
        model: {
          className: '',
          type: 'select',
          label: 'Model',
          options: modelOptions,
        },
        property: {
          className: '',
          type: 'select',
          label: 'Property',
          options: [
            { label: '*', value: '*' },
            { label: 'create', value: 'create' },
            { label: 'createChangeStream', value: 'createChangeStream' },
            { label: 'count', value: 'count' },
            { label: 'deleteById', value: 'deleteById' },
            { label: 'destroyById', value: 'destroyById' },
            { label: 'exists', value: 'exists' },
            { label: 'find', value: 'find' },
            { label: 'findById', value: 'findById' },
            { label: 'findOne', value: 'findOne' },
            { label: 'patchAttributes', value: 'patchAttributes' },
            { label: 'patchOrCreate', value: 'patchOrCreate' },
            { label: 'replaceById', value: 'replaceById' },
            { label: 'replaceOrCreate', value: 'replaceOrCreate' },
            { label: 'updateAll', value: 'updateAll' },
          ],
        },
        accessType: {
          className: '',
          type: 'select',
          label: 'Access Type',
          options: [
            { label: '*', value: '*' },
            { label: 'EXECUTE', value: 'EXECUTE' },
            { label: 'READ', value: 'READ' },
            { label: 'WRITE', value: 'WRITE' },
          ],
        },
        permission: {
          className: '',
          type: 'select',
          label: 'Permission',
          options: [
            { label: 'ALLOW', value: 'ALLOW' },
            { label: 'DENY', value: 'DENY' },
          ],
        },
        principalId: 'select',
      },
      buttons: [
        {
          label: 'Cancel',
          type: 'button',
          classNames: 'btn btn-danger col-lg-6',
          click: { type: 'Cancel' },
        },
        {
          label: 'Save',
          type: 'button',
          classNames: 'btn btn-success text-white col-lg-6',
          click: { type: 'Save' },
        },
      ],
    }
  }

  setSelected(item) {
    this.store.dispatch(new ControlActions.SelectControl(item))
    this.selected = item
  }

  setRoles(item) {
    const roleOptions = [
      { label: '$authenticated', value: '$authenticated' },
      { label: '$everyone', value: '$everyone' },
      { label: '$owner', value: '$owner' },
      { label: '$unauthenticated', value: '$unauthenticated' },
    ]
    item.forEach(role => {
      roleOptions.push({ label: role.name, value: role.name })
    })
    this.roles = item
    this.formConfig.fields.principalId = {
      className: '',
      type: 'select',
      label: 'Role',
      options: roleOptions,
    }
  }

  get(id): Observable<any> {
    return this.api.find({ where: { id: id } })
  }

  upsert(item) {
    if (item.id) {
      return this.update(item)
    }
    return this.create(item)
  }

  create(item) {
    this.store.dispatch(new ControlActions.CreateControl(item))
  }

  update(item) {
    this.store.dispatch(new ControlActions.UpdateControl(item))
  }

  delete(item) {
    this.store.dispatch(new ControlActions.DeleteControl(item))
  }
}
