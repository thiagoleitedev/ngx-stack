import { Action } from '@ngrx/store'
import { ACL, LoopBackFilter } from '@ngx-plus/ngx-sdk'

export const CREATE_CONTROL = '[Admin] CreateControl'
export const CREATE_CONTROL_SUCCESS = '[Admin] CreateControl Success'
export const CREATE_CONTROL_FAIL = '[Admin] CreateControl Fail'

export const READ_CONTROLS = '[Admin] ReadControls'
export const READ_CONTROLS_SUCCESS = '[Admin] ReadControls Success'
export const READ_CONTROLS_FAIL = '[Admin] ReadControls Fail'

export const UPDATE_CONTROL = '[Admin] UpdateControl'
export const UPDATE_CONTROL_SUCCESS = '[Admin] UpdateControl Success'
export const UPDATE_CONTROL_FAIL = '[Admin] UpdateControl Fail'

export const DELETE_CONTROL = '[Admin] DeleteControl'
export const DELETE_CONTROL_SUCCESS = '[Admin] DeleteControl Success'
export const DELETE_CONTROL_FAIL = '[Admin] DeleteControl Fail'

export const SELECT_CONTROL = '[Admin] SelectControl'
export const SELECT_CONTROL_SUCCESS = '[Admin] SelectControl Success'
export const SELECT_CONTROL_FAIL = '[Admin] SelectControl Fail'

export class CreateControl implements Action {
  public readonly type = CREATE_CONTROL
  constructor(public payload: ACL) { }
}

export class CreateControlSuccess implements Action {
  public readonly type = CREATE_CONTROL_SUCCESS
  constructor(public payload: ACL) { }
}

export class CreateControlFail implements Action {
  public readonly type = CREATE_CONTROL_FAIL
  constructor(public payload: any) { }
}

export class ReadControls implements Action {
  public readonly type = READ_CONTROLS
  constructor(public payload: LoopBackFilter = {}) { }
}

export class ReadControlsSuccess implements Action {
  public readonly type = READ_CONTROLS_SUCCESS
  constructor(public payload: ACL[]) { }
}

export class ReadControlsFail implements Action {
  public readonly type = READ_CONTROLS_FAIL
  constructor(public payload: any) { }
}

export class UpdateControl implements Action {
  public readonly type = UPDATE_CONTROL
  constructor(public payload: ACL) { }
}

export class UpdateControlSuccess implements Action {
  public readonly type = UPDATE_CONTROL_SUCCESS
  constructor(public payload: ACL) { }
}

export class UpdateControlFail implements Action {
  public readonly type = UPDATE_CONTROL_FAIL
  constructor(public payload: any) { }
}

export class DeleteControl implements Action {
  public readonly type = DELETE_CONTROL
  constructor(public payload: any) { }
}

export class DeleteControlSuccess implements Action {
  public readonly type = DELETE_CONTROL_SUCCESS
  constructor(public payload: any) { }
}

export class DeleteControlFail implements Action {
  public readonly type = DELETE_CONTROL_FAIL
  constructor(public payload: any) { }
}

export class SelectControl implements Action {
  public readonly type = SELECT_CONTROL
  constructor(public payload: ACL) { }
}

export class SelectControlSuccess implements Action {
  public readonly type = SELECT_CONTROL_SUCCESS
  constructor(public payload: any) { }
}

export class SelectControlFail implements Action {
  public readonly type = SELECT_CONTROL_FAIL
  constructor(public payload: any) { }
}

export type Actions =
  | CreateControl
  | CreateControlSuccess
  | CreateControlFail
  | ReadControls
  | ReadControlsSuccess
  | ReadControlsFail
  | UpdateControl
  | UpdateControlSuccess
  | UpdateControlFail
  | DeleteControl
  | DeleteControlSuccess
  | DeleteControlFail
  | SelectControl
  | SelectControlSuccess
  | SelectControlFail
