import { Action } from '@ngrx/store'
import { LoopBackFilter } from '@ngx-plus/ngx-sdk'

export const CREATE_CONTAINER = '[Storage] CreateContainer'
export const CREATE_CONTAINER_SUCCESS = '[Storage] CreateContainer Success'
export const CREATE_CONTAINER_FAIL = '[Storage] CreateContainer Fail'

export const READ_CONTAINERS = '[Storage] ReadContainers'
export const READ_CONTAINERS_SUCCESS = '[Storage] ReadContainers Success'
export const READ_CONTAINERS_FAIL = '[Storage] ReadContainers Fail'

export const UPDATE_CONTAINER = '[Storage] UpdateContainer'
export const UPDATE_CONTAINER_SUCCESS = '[Storage] UpdateContainer Success'
export const UPDATE_CONTAINER_FAIL = '[Storage] UpdateContainer Fail'

export const DELETE_CONTAINER = '[Storage] DeleteContainer'
export const DELETE_CONTAINER_SUCCESS = '[Storage] DeleteContainer Success'
export const DELETE_CONTAINER_FAIL = '[Storage] DeleteContainer Fail'

export const SELECT_CONTAINER = '[Storage] SelectContainer'
export const SELECT_CONTAINER_SUCCESS = '[Storage] SelectContainer Success'
export const SELECT_CONTAINER_FAIL = '[Storage] SelectContainer Fail'

export const DELETE_FILE = '[Storage] DeleteFile'
export const DELETE_FILE_SUCCESS = '[Storage] DeleteFile Success'
export const DELETE_FILE_FAIL = '[Storage] DeleteFile Fail'

export class CreateContainer implements Action {
  public readonly type = CREATE_CONTAINER
  constructor(public payload: any) {}
}

export class CreateContainerSuccess implements Action {
  public readonly type = CREATE_CONTAINER_SUCCESS
  constructor(public payload: any) {}
}

export class CreateContainerFail implements Action {
  public readonly type = CREATE_CONTAINER_FAIL
  constructor(public payload: any) {}
}

export class ReadContainers implements Action {
  public readonly type = READ_CONTAINERS
  constructor(public payload: LoopBackFilter = {}) {}
}

export class ReadContainersSuccess implements Action {
  public readonly type = READ_CONTAINERS_SUCCESS
  constructor(public payload: any) {}
}

export class ReadContainersFail implements Action {
  public readonly type = READ_CONTAINERS_FAIL
  constructor(public payload: any) {}
}

export class UpdateContainer implements Action {
  public readonly type = UPDATE_CONTAINER
  constructor(public payload: any) {}
}

export class UpdateContainerSuccess implements Action {
  public readonly type = UPDATE_CONTAINER_SUCCESS
  constructor(public payload: any) {}
}

export class UpdateContainerFail implements Action {
  public readonly type = UPDATE_CONTAINER_FAIL
  constructor(public payload: any) {}
}

export class DeleteContainer implements Action {
  public readonly type = DELETE_CONTAINER
  constructor(public payload: any) {}
}

export class DeleteContainerSuccess implements Action {
  public readonly type = DELETE_CONTAINER_SUCCESS
  constructor(public payload: any) {}
}

export class DeleteContainerFail implements Action {
  public readonly type = DELETE_CONTAINER_FAIL
  constructor(public payload: any) {}
}

export class SelectContainer implements Action {
  public readonly type = SELECT_CONTAINER
  constructor(public payload: any) {}
}

export class SelectContainerSuccess implements Action {
  public readonly type = SELECT_CONTAINER_SUCCESS
  constructor(public payload: any) {}
}

export class SelectContainerFail implements Action {
  public readonly type = SELECT_CONTAINER_FAIL
  constructor(public payload: any) {}
}

export class DeleteFile implements Action {
  public readonly type = DELETE_FILE
  constructor(public payload: any) {}
}

export class DeleteFileSuccess implements Action {
  public readonly type = DELETE_FILE_SUCCESS
  constructor(public payload: any) {}
}

export class DeleteFileFail implements Action {
  public readonly type = DELETE_FILE_FAIL
  constructor(public payload: any) {}
}

export type Actions =
  | CreateContainer
  | CreateContainerSuccess
  | CreateContainerFail
  | ReadContainers
  | ReadContainersSuccess
  | ReadContainersFail
  | UpdateContainer
  | UpdateContainerSuccess
  | UpdateContainerFail
  | DeleteContainer
  | DeleteContainerSuccess
  | DeleteContainerFail
  | SelectContainer
  | SelectContainerSuccess
  | SelectContainerFail
  | DeleteFile
  | DeleteFileSuccess
  | DeleteFileFail
