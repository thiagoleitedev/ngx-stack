import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { concat } from 'rxjs/observable/concat'
import { Effect, Actions } from '@ngrx/effects'
import { Store, Action } from '@ngrx/store'
import { Account, Role, AccountApi, RoleApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/startWith'

import * as UserActions from '../actions/user.actions'

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userApi: AccountApi,
    private roleApi: RoleApi,
    private ui: NgxUiService,
  ) { }

  @Effect()
  protected createUser: Observable<any> = this.actions$
    .ofType(UserActions.CREATE_USER)
    .mergeMap((action: UserActions.CreateUser) => this.userApi.create(action.payload)
      .map((response: Account) => new UserActions.CreateUserSuccess(response))
      .catch((error: any) => of(new UserActions.CreateUserFail(error))))

  @Effect({ dispatch: false })
  protected createUserSuccess = this.actions$
    .ofType(UserActions.CREATE_USER_SUCCESS)
    .map((action: UserActions.CreateUserSuccess) => this.ui.toastSuccess('Create User Success', `User <u><i>${action.payload.email}</i></u> has been created successfully.`))

  @Effect({ dispatch: false })
  protected createUserFail = this.actions$
    .ofType(UserActions.CREATE_USER_FAIL)
    .map((action: UserActions.CreateUserFail) => this.ui.toastError('Create User Fail', `${action.payload.message}`))

  @Effect()
  protected readUsers: Observable<any> = this.actions$
    .ofType(UserActions.READ_USERS)
    .mergeMap((action: UserActions.ReadUsers) => this.userApi.find(action.payload)
      .map((response: Array<Account>) => new UserActions.ReadUsersSuccess(response))
      .catch((error: any) => of(new UserActions.ReadUsersFail(error))))

  @Effect()
  protected updateUser: Observable<any> = this.actions$
    .ofType(UserActions.UPDATE_USER)
    .mergeMap((action: UserActions.UpdateUser) => this.userApi.patchAttributes(action.payload.id, action.payload)
      .map((response: Account) => new UserActions.UpdateUserSuccess(action.payload))
      .catch((error: any) => of(new UserActions.UpdateUserFail(error))))

  @Effect({ dispatch: false })
  protected updateUserSuccess = this.actions$
    .ofType(UserActions.UPDATE_USER_SUCCESS)
    .map((action: UserActions.UpdateUserSuccess) => this.ui.toastSuccess('Update User Success', `User <u><i>${action.payload.email}</i></u> has been updated successfully.`))

  @Effect({ dispatch: false })
  protected updateUserFail = this.actions$
    .ofType(UserActions.UPDATE_USER_FAIL)
    .map((action: UserActions.UpdateUserFail) => this.ui.toastError('Update User Fail', `${action.payload.message}`))

  @Effect()
  protected deleteUser: Observable<any> = this.actions$
    .ofType(UserActions.DELETE_USER)
    .mergeMap((action: UserActions.DeleteUser) => this.userApi.deleteById(action.payload.id)
      .map((response: Account) => new UserActions.DeleteUserSuccess(action.payload))
      .catch((error: any) => of(new UserActions.DeleteUserFail(error))))

  @Effect({ dispatch: false })
  protected deleteUserSuccess = this.actions$
    .ofType(UserActions.DELETE_USER_SUCCESS)
    .map((action: UserActions.DeleteUserSuccess) => this.ui.toastSuccess('Delete User Success', `User <u><i>${action.payload.email}</i></u> has been deleted successfully.`))

  @Effect({ dispatch: false })
  protected deleteUserFail = this.actions$
    .ofType(UserActions.DELETE_USER_FAIL)
    .map((action: UserActions.DeleteUserFail) => this.ui.toastError('Delete User Fail', `${action.payload.message}`))

  @Effect()
  protected addUserToRole: Observable<any> = this.actions$
    .ofType(UserActions.ADD_USER_TO_ROLE)
    .mergeMap((action: UserActions.AddUserToRole) => this.userApi.linkRoles(
      action.payload.user.id,
      action.payload.role.id,
      {
        principalType: 'USER',
        principalId: action.payload.user.id,
        roleId: action.payload.role.id
      })
      .map((response: any) => new UserActions.AddUserToRoleSuccess({
        user: action.payload.user,
        role: action.payload.role,
        mapping: response
      }))
      .catch((error: any) => of(new UserActions.AddUserToRoleFail(error))))

  @Effect({ dispatch: false })
  protected addUserToRoleSuccess = this.actions$
    .ofType(UserActions.ADD_USER_TO_ROLE_SUCCESS)
    .map((action: UserActions.AddUserToRoleSuccess) => this.ui.toastSuccess('Role Added', `User <u><i>${action.payload.user.email}</i></u> has been successfully added to the <u><i>${action.payload.role.name}</i></u> role.`))

  @Effect({ dispatch: false })
  protected addUserToRoleFail = this.actions$
    .ofType(UserActions.ADD_USER_TO_ROLE_FAIL)
    .map((action: UserActions.AddUserToRoleFail) => this.ui.toastError('Add Role Fail', `${action.payload.message}`))

  @Effect()
  protected deleteUserFromRole: Observable<any> = this.actions$
    .ofType(UserActions.DELETE_USER_FROM_ROLE)
    .mergeMap((action: UserActions.DeleteUserFromRole) => this.userApi.unlinkRoles(action.payload.user.id, action.payload.role.id)
      .map((response: Account) => new UserActions.DeleteUserFromRoleSuccess(action.payload))
      .catch((error: any) => of(new UserActions.DeleteUserFromRoleFail(error))))

  @Effect({ dispatch: false })
  protected deleteUserFromRoleSuccess = this.actions$
    .ofType(UserActions.DELETE_USER_FROM_ROLE_SUCCESS)
    .map((action: UserActions.DeleteUserFromRoleSuccess) => this.ui.toastSuccess('Role Removed', `User <u><i>${action.payload.user.email}</i></u> has been successfully removed from the <u><i>${action.payload.role.name}</i></u> role.`))

  @Effect({ dispatch: false })
  protected deleteUserFromRoleFail = this.actions$
    .ofType(UserActions.DELETE_USER_FROM_ROLE_FAIL)
    .map((action: UserActions.DeleteUserFromRoleFail) => this.ui.toastError('Remove Role Fail', `${action.payload.message}`))
}
