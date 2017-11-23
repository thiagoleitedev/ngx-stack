import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { Role, RoleApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'

import * as Roles from '../actions/role.actions'

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, private roleApi: RoleApi, private ui: NgxUiService) {}

  @Effect()
  protected createRole: Observable<Action> = this.actions$
    .ofType(Roles.CREATE_ROLE)
    .pipe(
      mergeMap((action: Roles.CreateRole) =>
        this.roleApi
          .create(action.payload)
          .pipe(
            map((response: Role) => new Roles.CreateRoleSuccess(response)),
            catchError((error: any) => of(new Roles.CreateRoleFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected createRoleSuccess = this.actions$.ofType(Roles.CREATE_ROLE_SUCCESS).pipe(
    map((action: Roles.CreateRoleSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Create Role Success',
        body: `The <u><i>${action.payload.name}</i></u> role has been created successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected createRoleFail = this.actions$.ofType(Roles.CREATE_ROLE_FAIL).pipe(
    map((action: Roles.CreateRoleFail) =>
      this.ui.alerts.notifyError({
        title: 'Create Role Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected readRoles: Observable<Action> = this.actions$
    .ofType(Roles.READ_ROLES)
    .pipe(
      mergeMap((action: Roles.ReadRoles) =>
        this.roleApi
          .find(action.payload)
          .pipe(
            map((response: Array<Role>) => new Roles.ReadRolesSuccess(response)),
            catchError((error: any) => of(new Roles.ReadRolesFail(error)))
          )
      )
    )

  @Effect()
  protected updateRole: Observable<Action> = this.actions$
    .ofType(Roles.UPDATE_ROLE)
    .pipe(
      mergeMap((action: Roles.UpdateRole) =>
        this.roleApi
          .patchAttributes(action.payload.id, action.payload)
          .pipe(
            map((response: Role) => new Roles.UpdateRoleSuccess(action.payload)),
            catchError((error: any) => of(new Roles.UpdateRoleFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected updateRoleSuccess = this.actions$.ofType(Roles.UPDATE_ROLE_SUCCESS).pipe(
    map((action: Roles.UpdateRoleSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Update Role Success',
        body: `The <u><i>${action.payload.name}</i></u> role has been updated successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected updateRoleFail = this.actions$.ofType(Roles.UPDATE_ROLE_FAIL).pipe(
    map((action: Roles.UpdateRoleFail) =>
      this.ui.alerts.notifyError({
        title: 'Update Role Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected deleteRole: Observable<Action> = this.actions$
    .ofType(Roles.DELETE_ROLE)
    .pipe(
      mergeMap((action: Roles.DeleteRole) =>
        this.roleApi
          .deleteById(action.payload.id)
          .pipe(
            map((response: Role) => new Roles.DeleteRoleSuccess(action.payload)),
            catchError((error: any) => of(new Roles.DeleteRoleFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected deleteRoleSuccess = this.actions$.ofType(Roles.DELETE_ROLE_SUCCESS).pipe(
    map((action: Roles.DeleteRoleSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Delete Role Success',
        body: `The <u><i>${action.payload.name}</i></u> role has been deleted successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected deleteRoleFail = this.actions$.ofType(Roles.DELETE_ROLE_FAIL).pipe(
    map((action: Roles.DeleteRoleFail) =>
      this.ui.alerts.notifyError({
        title: 'Delete Role Fail',
        body: `${action.payload.message}`,
      })
    )
  )
}
