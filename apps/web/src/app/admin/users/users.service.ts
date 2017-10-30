import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AccountApi, Account } from '@ngx-plus/ngx-sdk'
export { Account as User } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { UserActions } from '../../state'

@Injectable()
export class UsersService {
  public items$: Observable<any>
  public roles$: Observable<any>
  public selected$: Observable<any>
  public selected: any
  public formConfig = {
    fields: {
      firstName: {
        className: 'col-lg-6',
        type: 'input',
        label: 'First Name',
      },
      middleName: {
        className: 'col-lg-6',
        type: 'input',
        label: 'Middle Name',
      },
      lastName: {
        className: 'col-lg-6',
        type: 'input',
        label: 'Last Name',
      },
      suffix: {
        className: 'col-lg-6',
        type: 'select',
        label: 'Suffix',
        options: [
          { label: 'Jr.', value: 'Jr.' },
          { label: 'Sr.', value: 'Sr.' },
          { label: 'II', value: 'II' },
          { label: 'III', value: 'III' },
          { label: 'IV', value: 'IV' },
          { label: 'V', value: 'V' },
        ],
      },
      email: {
        className: 'col-lg-6',
        type: 'email',
        label: 'Email',
      },
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

  constructor(
    private api: AccountApi,
    private store: Store<any>
  ) {
    this.admin$ = this.store.select('admin')
    this.items$ = this.admin$.map(a => a.users)
    this.roles$ = this.admin$.map(a => a.roles)
    this.selected$ = this.items$.map(u => u.selected)
  }

  setSelected(item) {
    this.store.dispatch(new UserActions.SelectUser(item))
    this.selected = item
  }

  get(id): Observable<any> {
    return this.api.find({
      where: { id: id },
      include: ['roles', 'accessTokens'],
    })
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
