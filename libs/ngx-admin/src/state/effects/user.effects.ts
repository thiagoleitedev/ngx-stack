import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Effect, Actions } from '@ngrx/effects'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { Account, AccountApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'

import * as UserActions from '../actions/user.actions'

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private api: AccountApi, private ui: NgxUiService) {}

  @Effect()
  protected createUser: Observable<any> = this.actions$
    .ofType(UserActions.CREATE_USER)
    .pipe(
      mergeMap((action: UserActions.CreateUser) =>
        this.api
          .create(action.payload)
          .pipe(
            map((response: Account) => new UserActions.CreateUserSuccess(response)),
            catchError((error: any) => of(new UserActions.CreateUserFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected createUserSuccess = this.actions$.ofType(UserActions.CREATE_USER_SUCCESS).pipe(
    map((action: UserActions.CreateUserSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Create User Success',
        body: `User <u><i>${action.payload.email}</i></u> has been created successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected createUserFail = this.actions$.ofType(UserActions.CREATE_USER_FAIL).pipe(
    map((action: UserActions.CreateUserFail) =>
      this.ui.alerts.notifyError({
        title: 'Create User Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected readUsers: Observable<any> = this.actions$
    .ofType(UserActions.READ_USERS)
    .pipe(
      mergeMap((action: UserActions.ReadUsers) =>
        this.api
          .find(action.payload)
          .pipe(
            map((response: Array<Account>) => new UserActions.ReadUsersSuccess(response)),
            catchError((error: any) => of(new UserActions.ReadUsersFail(error)))
          )
      )
    )

  @Effect()
  protected updateUser: Observable<any> = this.actions$
    .ofType(UserActions.UPDATE_USER)
    .pipe(
      mergeMap((action: UserActions.UpdateUser) =>
        this.api
          .patchAttributes(action.payload.id, action.payload)
          .pipe(
            map((response: Account) => new UserActions.UpdateUserSuccess(action.payload)),
            catchError((error: any) => of(new UserActions.UpdateUserFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected updateUserSuccess = this.actions$.ofType(UserActions.UPDATE_USER_SUCCESS).pipe(
    map((action: UserActions.UpdateUserSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Update User Success',
        body: `User <u><i>${action.payload.email}</i></u> has been updated successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected updateUserFail = this.actions$.ofType(UserActions.UPDATE_USER_FAIL).pipe(
    map((action: UserActions.UpdateUserFail) =>
      this.ui.alerts.notifyError({
        title: 'Update User Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected deleteUser: Observable<any> = this.actions$
    .ofType(UserActions.DELETE_USER)
    .pipe(
      mergeMap((action: UserActions.DeleteUser) =>
        this.api
          .deleteById(action.payload.id)
          .pipe(
            map((response: Account) => new UserActions.DeleteUserSuccess(action.payload)),
            catchError((error: any) => of(new UserActions.DeleteUserFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected deleteUserSuccess = this.actions$.ofType(UserActions.DELETE_USER_SUCCESS).pipe(
    map((action: UserActions.DeleteUserSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Delete User Success',
        body: `User <u><i>${action.payload.email}</i></u> has been deleted successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected deleteUserFail = this.actions$.ofType(UserActions.DELETE_USER_FAIL).pipe(
    map((action: UserActions.DeleteUserFail) =>
      this.ui.alerts.notifyError({
        title: 'Delete User Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected addUserToRole: Observable<any> = this.actions$.ofType(UserActions.ADD_USER_TO_ROLE).pipe(
    mergeMap((action: UserActions.AddUserToRole) =>
      this.api
        .linkRoles(action.payload.user.id, action.payload.role.id, {
          principalType: 'USER',
          principalId: action.payload.user.id,
          roleId: action.payload.role.id,
        })
        .pipe(
          map(
            (response: any) =>
              new UserActions.AddUserToRoleSuccess({
                user: action.payload.user,
                role: action.payload.role,
                mapping: response,
              })
          ),
          catchError((error: any) => of(new UserActions.AddUserToRoleFail(error)))
        )
    )
  )

  @Effect({ dispatch: false })
  protected addUserToRoleSuccess = this.actions$.ofType(UserActions.ADD_USER_TO_ROLE_SUCCESS).pipe(
    map((action: UserActions.AddUserToRoleSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Role Added',
        body: `User <u><i>${action.payload.user.email}</i></u> has been successfully added to the <u><i>${
          action.payload.role.name
        }</i></u> role.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected addUserToRoleFail = this.actions$.ofType(UserActions.ADD_USER_TO_ROLE_FAIL).pipe(
    map((action: UserActions.AddUserToRoleFail) =>
      this.ui.alerts.notifyError({
        title: 'Add Role Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected deleteUserFromRole: Observable<any> = this.actions$
    .ofType(UserActions.DELETE_USER_FROM_ROLE)
    .pipe(
      mergeMap((action: UserActions.DeleteUserFromRole) =>
        this.api
          .unlinkRoles(action.payload.user.id, action.payload.role.id)
          .pipe(
            map((response: Account) => new UserActions.DeleteUserFromRoleSuccess(action.payload)),
            catchError((error: any) => of(new UserActions.DeleteUserFromRoleFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected deleteUserFromRoleSuccess = this.actions$.ofType(UserActions.DELETE_USER_FROM_ROLE_SUCCESS).pipe(
    map((action: UserActions.DeleteUserFromRoleSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Role Removed',
        body: `User <u><i>${action.payload.user.email}</i></u> has been successfully removed from the <u><i>${
          action.payload.role.name
        }</i></u> role.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected deleteUserFromRoleFail = this.actions$.ofType(UserActions.DELETE_USER_FROM_ROLE_FAIL).pipe(
    map((action: UserActions.DeleteUserFromRoleFail) =>
      this.ui.alerts.notifyError({
        title: 'Remove Role Fail',
        body: `${action.payload.message}`,
      })
    )
  )
}
