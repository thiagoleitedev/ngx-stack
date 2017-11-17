import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

import { Account, RoleApi } from '@ngx-plus/ngx-sdk'
export { Role } from '@ngx-plus/ngx-sdk'

import { RoleActions, UserActions } from '../state'

@Injectable()
export class RolesService {
  public users$: Observable<any>
  public items$: Observable<any>
  public selected$: Observable<any>
  public selected: any
  public formConfig = {
    fields: {
      name: 'input',
      description: 'input',
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
  private admin$: Observable<any>

  constructor(private api: RoleApi, private store: Store<any>) {
    this.admin$ = this.store.select('admin')
    this.users$ = this.admin$.map(a => a.users)
    this.items$ = this.admin$.map(a => a.roles)
    this.selected$ = this.items$.map(u => u.selected)
  }

  setSelected(item) {
    this.store.dispatch(new RoleActions.SelectRole(item))
    this.selected = item
  }

  get(id): Observable<any> {
    return this.api.find({ where: { id: id }, include: 'principals' })
  }

  create(item) {
    this.store.dispatch(new RoleActions.CreateRole(item))
  }

  update(item) {
    this.store.dispatch(new RoleActions.UpdateRole(item))
  }

  delete(item) {
    this.store.dispatch(new RoleActions.DeleteRole(item))
  }

  addUserToRole(item) {
    this.store.dispatch(new UserActions.AddUserToRole(item))
  }

  removeUserFromRole(item) {
    this.store.dispatch(new UserActions.DeleteUserFromRole(item))
  }
}
