import { Action } from '@ngrx/store'
import { Container, LoopBackFilter } from '@ngx-plus/ngx-sdk'

export const CREATE_CONTAINER = '[Files] CreateContainer'
export const CREATE_CONTAINER_SUCCESS = '[Files] CreateContainer Success'
export const CREATE_CONTAINER_FAIL = '[Files] CreateContainer Fail'

export const READ_CONTAINERS = '[Files] ReadContainers'
export const READ_CONTAINERS_SUCCESS = '[Files] ReadContainers Success'
export const READ_CONTAINERS_FAIL = '[Files] ReadContainers Fail'

export const READ_FILES = '[Files] ReadFiles'
export const READ_FILES_SUCCESS = '[Files] ReadFiles Success'
export const READ_FILES_FAIL = '[Files] ReadFiles Fail'

export const DELETE_CONTAINER = '[Files] DeleteContainer'
export const DELETE_CONTAINER_SUCCESS = '[Files] DeleteContainer Success'
export const DELETE_CONTAINER_FAIL = '[Files] DeleteContainer Fail'

export const SELECT_CONTAINER = '[Files] SelectContainer'
export const SELECT_CONTAINER_SUCCESS = '[Files] SelectContainer Success'
export const SELECT_CONTAINER_FAIL = '[Files] SelectContainer Fail'

export class CreateContainer implements Action {
  public readonly type = CREATE_CONTAINER
  constructor(public payload: any) { }
}

export class CreateContainerSuccess implements Action {
  public readonly type = CREATE_CONTAINER_SUCCESS
  constructor(public payload: any) { }
}

export class CreateContainerFail implements Action {
  public readonly type = CREATE_CONTAINER_FAIL
  constructor(public payload: any) { }
}

export class ReadContainers implements Action {
  public readonly type = READ_CONTAINERS
  constructor(public payload: LoopBackFilter = {}) { }
}

export class ReadContainersSuccess implements Action {
  public readonly type = READ_CONTAINERS_SUCCESS
  constructor(public payload: any) { }
}

export class ReadContainersFail implements Action {
  public readonly type = READ_CONTAINERS_FAIL
  constructor(public payload: any) { }
}

export class ReadFiles implements Action {
  public readonly type = READ_FILES
  constructor(public payload: any) { }
}

export class ReadFilesSuccess implements Action {
  public readonly type = READ_FILES_SUCCESS
  constructor(public payload: any) { }
}

export class ReadFilesFail implements Action {
  public readonly type = READ_FILES_FAIL
  constructor(public payload: any) { }
}

export class DeleteContainer implements Action {
  public readonly type = DELETE_CONTAINER
  constructor(public payload: any) { }
}

export class DeleteContainerSuccess implements Action {
  public readonly type = DELETE_CONTAINER_SUCCESS
  constructor(public payload: any) { }
}

export class DeleteContainerFail implements Action {
  public readonly type = DELETE_CONTAINER_FAIL
  constructor(public payload: any) { }
}

export class SelectContainer implements Action {
  public readonly type = SELECT_CONTAINER
  constructor(public payload: any) { }
}

export class SelectContainerSuccess implements Action {
  public readonly type = SELECT_CONTAINER_SUCCESS
  constructor(public payload: any) { }
}

export class SelectContainerFail implements Action {
  public readonly type = SELECT_CONTAINER_FAIL
  constructor(public payload: any) { }
}

export type Actions =
  | CreateContainer
  | CreateContainerSuccess
  | CreateContainerFail
  | ReadContainers
  | ReadContainersSuccess
  | ReadContainersFail
  | ReadFiles
  | ReadFilesSuccess
  | ReadFilesFail
  | DeleteContainer
  | DeleteContainerSuccess
  | DeleteContainerFail
  | SelectContainer
  | SelectContainerSuccess
  | SelectContainerFail
