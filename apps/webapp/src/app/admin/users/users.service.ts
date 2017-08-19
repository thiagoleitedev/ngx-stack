import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  AccountApi,
  Account,
  RoleApi,
  Role,
  AccessToken,
} from '@ngx-plus/ngx-sdk'
export { Account as User } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { UserActions } from '../../state'

@Injectable()
export class UsersService {
  private admin$: Observable<any>
  private subscriptions: Subscription[]

  public users$: Observable<any>
  public roles$: Observable<any>
  public selected$: Observable<any>
  public tableColumns = [
    { field: 'firstName', label: 'Name', action: 'edit' },
    { field: 'email', label: 'Email' },
    { field: 'actions', label: 'Actions' },
  ]

  constructor(
    private api: AccountApi,
    private roleApi: RoleApi,
    private ui: NgxUiService,
    private store: Store<any>
  ) {
    this.admin$ = this.store.select('admin')
    this.users$ = this.admin$.map(a => a.users)
    this.roles$ = this.admin$.map(a => a.roles)
    this.selected$ = this.users$.map(u => u.selected)
    this.subscriptions = []
  }

  setSelected(item) {
    this.store.dispatch(new UserActions.SelectUser(item))
  }

  get(id): Observable<any> {
    return this.api.find({
      where: { id: id },
      include: ['roles', 'accessTokens'],
    })
  }

  upsert(item) {
    if (item.id) {
      return this.update(item)
    }
    return this.create(item)
  }

  create(item) {
    this.store.dispatch(new UserActions.CreateUser(item))
  }

  update(item) {
    this.store.dispatch(new UserActions.UpdateUser(item))
  }

  delete(item) {
    this.store.dispatch(new UserActions.DeleteUser(item))
  }

  addUserToRole(item) {
    this.store.dispatch(new UserActions.AddUserToRole(item))
  }

  removeUserFromRole(item) {
    this.store.dispatch(new UserActions.DeleteUserFromRole(item))
  }

  getUserAccessTokens(item, successCb, errorCb): Subscription {
    return this.api.getAccessTokens(item.id).subscribe(successCb, errorCb)
  }

  generateToken(item, successCb, errorCb): Subscription {
    return this.api.createAccessTokens(item.id).subscribe(successCb, errorCb)
  }

  removeTtl(item, successCb, errorCb): Subscription {
    return this.api
      .updateByIdAccessTokens(item.user.id, item.token.id, { ttl: -1 })
      .subscribe(successCb, errorCb)
  }

  deleteToken(item, successCb, errorCb): Subscription {
    return this.api
      .destroyByIdAccessTokens(item.user.id, item.token.id)
      .subscribe(successCb, errorCb)
  }

  deleteAllTokens(item, successCb, errorCb): Subscription {
    return this.api.deleteAccessTokens(item.id).subscribe(successCb, errorCb)
  }

  changePassword(item, successCb, errorCb): Subscription {
    return this.api.resetPassword(item).subscribe(successCb, errorCb)
  }

  resetPassword(item, successCb, errorCb): Subscription {
    return this.api.resetPassword(item).subscribe(successCb, errorCb)
  }
}
