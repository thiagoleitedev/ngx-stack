import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Role, RoleApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../ui'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/startWith'

import * as Roles from '../actions/role.actions'

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private roleApi: RoleApi,
    private ui: NgxUiService
  ) {}

  @Effect()
  protected createRole: Observable<Action> = this.actions$
    .ofType(Roles.CREATE_ROLE)
    .mergeMap((action: Roles.CreateRole) =>
      this.roleApi
        .create(action.payload)
        .map((response: Role) => new Roles.CreateRoleSuccess(response))
        .catch((error: any) => of(new Roles.CreateRoleFail(error)))
    )

  @Effect({ dispatch: false })
  protected createRoleSuccess = this.actions$
    .ofType(Roles.CREATE_ROLE_SUCCESS)
    .map((action: Roles.CreateRoleSuccess) =>
      this.ui.alerts.toastSuccess(
        'Create Role Success',
        `The <u><i>${action.payload
          .name}</i></u> role has been created successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected createRoleFail = this.actions$
    .ofType(Roles.CREATE_ROLE_FAIL)
    .map((action: Roles.CreateRoleFail) =>
      this.ui.alerts.toastError('Create Role Fail', `${action.payload.message}`)
    )

  @Effect()
  protected readRoles: Observable<Action> = this.actions$
    .ofType(Roles.READ_ROLES)
    .mergeMap((action: Roles.ReadRoles) =>
      this.roleApi
        .find(action.payload)
        .map((response: Array<Role>) => new Roles.ReadRolesSuccess(response))
        .catch((error: any) => of(new Roles.ReadRolesFail(error)))
    )

  @Effect()
  protected updateRole: Observable<Action> = this.actions$
    .ofType(Roles.UPDATE_ROLE)
    .mergeMap((action: Roles.UpdateRole) =>
      this.roleApi
        .patchAttributes(action.payload.id, action.payload)
        .map((response: Role) => new Roles.UpdateRoleSuccess(action.payload))
        .catch((error: any) => of(new Roles.UpdateRoleFail(error)))
    )

  @Effect({ dispatch: false })
  protected updateRoleSuccess = this.actions$
    .ofType(Roles.UPDATE_ROLE_SUCCESS)
    .map((action: Roles.UpdateRoleSuccess) =>
      this.ui.alerts.toastSuccess(
        'Update Role Success',
        `The <u><i>${action.payload
          .name}</i></u> role has been updated successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected updateRoleFail = this.actions$
    .ofType(Roles.UPDATE_ROLE_FAIL)
    .map((action: Roles.UpdateRoleFail) =>
      this.ui.alerts.toastError('Update Role Fail', `${action.payload.message}`)
    )

  @Effect()
  protected deleteRole: Observable<Action> = this.actions$
    .ofType(Roles.DELETE_ROLE)
    .mergeMap((action: Roles.DeleteRole) =>
      this.roleApi
        .deleteById(action.payload.id)
        .map((response: Role) => new Roles.DeleteRoleSuccess(action.payload))
        .catch((error: any) => of(new Roles.DeleteRoleFail(error)))
    )

  @Effect({ dispatch: false })
  protected deleteRoleSuccess = this.actions$
    .ofType(Roles.DELETE_ROLE_SUCCESS)
    .map((action: Roles.DeleteRoleSuccess) =>
      this.ui.alerts.toastSuccess(
        'Delete Role Success',
        `The <u><i>${action.payload
          .name}</i></u> role has been deleted successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected deleteRoleFail = this.actions$
    .ofType(Roles.DELETE_ROLE_FAIL)
    .map((action: Roles.DeleteRoleFail) =>
      this.ui.alerts.toastError('Delete Role Fail', `${action.payload.message}`)
    )
}
