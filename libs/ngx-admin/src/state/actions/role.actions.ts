import { Action } from '@ngrx/store'
import { Role, LoopBackFilter } from '@ngx-plus/ngx-sdk'

export const CREATE_ROLE = '[Admin] CreateRole'
export const CREATE_ROLE_SUCCESS = '[Admin] CreateRole Success'
export const CREATE_ROLE_FAIL = '[Admin] CreateRole Fail'

export const READ_ROLES = '[Admin] ReadRoles'
export const READ_ROLES_SUCCESS = '[Admin] ReadRoles Success'
export const READ_ROLES_FAIL = '[Admin] ReadRoles Fail'

export const UPDATE_ROLE = '[Admin] UpdateRole'
export const UPDATE_ROLE_SUCCESS = '[Admin] UpdateRole Success'
export const UPDATE_ROLE_FAIL = '[Admin] UpdateRole Fail'

export const DELETE_ROLE = '[Admin] DeleteRole'
export const DELETE_ROLE_SUCCESS = '[Admin] DeleteRole Success'
export const DELETE_ROLE_FAIL = '[Admin] DeleteRole Fail'

export const SELECT_ROLE = '[Admin] SelectRole'
export const SELECT_ROLE_SUCCESS = '[Admin] SelectRole Success'
export const SELECT_ROLE_FAIL = '[Admin] SelectRole Fail'

export class CreateRole implements Action {
  public readonly type = CREATE_ROLE
  constructor(public payload: Role) {}
}

export class CreateRoleSuccess implements Action {
  public readonly type = CREATE_ROLE_SUCCESS
  constructor(public payload: Role) {}
}

export class CreateRoleFail implements Action {
  public readonly type = CREATE_ROLE_FAIL
  constructor(public payload: any) {}
}

export class ReadRoles implements Action {
  public readonly type = READ_ROLES
  constructor(public payload: LoopBackFilter = {}) {}
}

export class ReadRolesSuccess implements Action {
  public readonly type = READ_ROLES_SUCCESS
  constructor(public payload: Role[]) {}
}

export class ReadRolesFail implements Action {
  public readonly type = READ_ROLES_FAIL
  constructor(public payload: any) {}
}

export class UpdateRole implements Action {
  public readonly type = UPDATE_ROLE
  constructor(public payload: Role) {}
}

export class UpdateRoleSuccess implements Action {
  public readonly type = UPDATE_ROLE_SUCCESS
  constructor(public payload: Role) {}
}

export class UpdateRoleFail implements Action {
  public readonly type = UPDATE_ROLE_FAIL
  constructor(public payload: any) {}
}

export class DeleteRole implements Action {
  public readonly type = DELETE_ROLE
  constructor(public payload: any) {}
}

export class DeleteRoleSuccess implements Action {
  public readonly type = DELETE_ROLE_SUCCESS
  constructor(public payload: any) {}
}

export class DeleteRoleFail implements Action {
  public readonly type = DELETE_ROLE_FAIL
  constructor(public payload: any) {}
}

export class SelectRole implements Action {
  public readonly type = SELECT_ROLE
  constructor(public payload: Role) {}
}

export class SelectRoleSuccess implements Action {
  public readonly type = SELECT_ROLE_SUCCESS
  constructor(public payload: any) {}
}

export class SelectRoleFail implements Action {
  public readonly type = SELECT_ROLE_FAIL
  constructor(public payload: any) {}
}

export type Actions =
  | CreateRole
  | CreateRoleSuccess
  | CreateRoleFail
  | ReadRoles
  | ReadRolesSuccess
  | ReadRolesFail
  | UpdateRole
  | UpdateRoleSuccess
  | UpdateRoleFail
  | DeleteRole
  | DeleteRoleSuccess
  | DeleteRoleFail
  | SelectRole
  | SelectRoleSuccess
  | SelectRoleFail
