import { Action } from '@ngrx/store'
import { Account, LoopBackFilter } from '@ngx-plus/ngx-sdk'

export const CREATE_USER = '[Admin] CreateUser'
export const CREATE_USER_SUCCESS = '[Admin] CreateUser Success'
export const CREATE_USER_FAIL = '[Admin] CreateUser Fail'

export const READ_USERS = '[Admin] ReadUsers'
export const READ_USERS_SUCCESS = '[Admin] ReadUsers Success'
export const READ_USERS_FAIL = '[Admin] ReadUsers Fail'

export const UPDATE_USER = '[Admin] UpdateUser'
export const UPDATE_USER_SUCCESS = '[Admin] UpdateUser Success'
export const UPDATE_USER_FAIL = '[Admin] UpdateUser Fail'

export const DELETE_USER = '[Admin] DeleteUser'
export const DELETE_USER_SUCCESS = '[Admin] DeleteUser Success'
export const DELETE_USER_FAIL = '[Admin] DeleteUser Fail'

export const SELECT_USER = '[Admin] SelectUser'
export const SELECT_USER_SUCCESS = '[Admin] SelectUser Success'
export const SELECT_USER_FAIL = '[Admin] SelectUser Fail'

export const ADD_USER_TO_ROLE = '[Admin] AddUserToRole'
export const ADD_USER_TO_ROLE_SUCCESS = '[Admin] AddUserToRole Success'
export const ADD_USER_TO_ROLE_FAIL = '[Admin] AddUserToRole Fail'

export const DELETE_USER_FROM_ROLE = '[Admin] DeleteUserFromRole'
export const DELETE_USER_FROM_ROLE_SUCCESS = '[Admin] DeleteUserFromRole Success'
export const DELETE_USER_FROM_ROLE_FAIL = '[Admin] DeleteUserFromRole Fail'

export class CreateUser implements Action {
  public readonly type = CREATE_USER
  constructor(public payload: Account) { }
}

export class CreateUserSuccess implements Action {
  public readonly type = CREATE_USER_SUCCESS
  constructor(public payload: Account) { }
}

export class CreateUserFail implements Action {
  public readonly type = CREATE_USER_FAIL
  constructor(public payload: any) { }
}

export class ReadUsers implements Action {
  public readonly type = READ_USERS
  constructor(public payload: LoopBackFilter = {}) { }
}

export class ReadUsersSuccess implements Action {
  public readonly type = READ_USERS_SUCCESS
  constructor(public payload: Account[]) { }
}

export class ReadUsersFail implements Action {
  public readonly type = READ_USERS_FAIL
  constructor(public payload: any) { }
}

export class UpdateUser implements Action {
  public readonly type = UPDATE_USER
  constructor(public payload: Account) { }
}

export class UpdateUserSuccess implements Action {
  public readonly type = UPDATE_USER_SUCCESS
  constructor(public payload: Account) { }
}

export class UpdateUserFail implements Action {
  public readonly type = UPDATE_USER_FAIL
  constructor(public payload: any) { }
}

export class DeleteUser implements Action {
  public readonly type = DELETE_USER
  constructor(public payload: any) { }
}

export class DeleteUserSuccess implements Action {
  public readonly type = DELETE_USER_SUCCESS
  constructor(public payload: any) { }
}

export class DeleteUserFail implements Action {
  public readonly type = DELETE_USER_FAIL
  constructor(public payload: any) { }
}

export class SelectUser implements Action {
  public readonly type = SELECT_USER
  constructor(public payload: Account) { }
}

export class SelectUserSuccess implements Action {
  public readonly type = SELECT_USER_SUCCESS
  constructor(public payload: any) { }
}

export class SelectUserFail implements Action {
  public readonly type = SELECT_USER_FAIL
  constructor(public payload: any) { }
}

export class AddUserToRole implements Action {
  public readonly type = ADD_USER_TO_ROLE
  constructor(public payload: any) { }
}

export class AddUserToRoleSuccess implements Action {
  public readonly type = ADD_USER_TO_ROLE_SUCCESS
  constructor(public payload: any) { }
}

export class AddUserToRoleFail implements Action {
  public readonly type = ADD_USER_TO_ROLE_FAIL
  constructor(public payload: any) { }
}

export class DeleteUserFromRole implements Action {
  public readonly type = DELETE_USER_FROM_ROLE
  constructor(public payload: any) { }
}

export class DeleteUserFromRoleSuccess implements Action {
  public readonly type = DELETE_USER_FROM_ROLE_SUCCESS
  constructor(public payload: any) { }
}

export class DeleteUserFromRoleFail implements Action {
  public readonly type = DELETE_USER_FROM_ROLE_FAIL
  constructor(public payload: any) { }
}

export type Actions =
  | CreateUser
  | CreateUserSuccess
  | CreateUserFail
  | ReadUsers
  | ReadUsersSuccess
  | ReadUsersFail
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail
  | SelectUser
  | SelectUserSuccess
  | SelectUserFail
  | AddUserToRole
  | AddUserToRoleSuccess
  | AddUserToRoleFail
  | DeleteUserFromRole
  | DeleteUserFromRoleSuccess
  | DeleteUserFromRoleFail
