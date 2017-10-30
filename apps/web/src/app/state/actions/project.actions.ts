import { Action } from '@ngrx/store'
import { Project, LoopBackFilter } from '@ngx-plus/ngx-sdk'

export const CREATE_PROJECT = '[Projects] CreateProject'
export const CREATE_PROJECT_SUCCESS = '[Projects] CreateProject Success'
export const CREATE_PROJECT_FAIL = '[Projects] CreateProject Fail'

export const READ_PROJECTS = '[Projects] ReadProjects'
export const READ_PROJECTS_SUCCESS = '[Projects] ReadProjects Success'
export const READ_PROJECTS_FAIL = '[Projects] ReadProjects Fail'

export const UPDATE_PROJECT = '[Projects] UpdateProject'
export const UPDATE_PROJECT_SUCCESS = '[Projects] UpdateProject Success'
export const UPDATE_PROJECT_FAIL = '[Projects] UpdateProject Fail'

export const DELETE_PROJECT = '[Projects] DeleteProject'
export const DELETE_PROJECT_SUCCESS = '[Projects] DeleteProject Success'
export const DELETE_PROJECT_FAIL = '[Projects] DeleteProject Fail'

export const SELECT_PROJECT = '[Projects] SelectProject'
export const SELECT_PROJECT_SUCCESS = '[Projects] SelectProject Success'
export const SELECT_PROJECT_FAIL = '[Projects] SelectProject Fail'

export class CreateProject implements Action {
  public readonly type = CREATE_PROJECT
  constructor(public payload: Project) {}
}

export class CreateProjectSuccess implements Action {
  public readonly type = CREATE_PROJECT_SUCCESS
  constructor(public payload: Project) {}
}

export class CreateProjectFail implements Action {
  public readonly type = CREATE_PROJECT_FAIL
  constructor(public payload: any) {}
}

export class ReadProjects implements Action {
  public readonly type = READ_PROJECTS
  constructor(public payload: LoopBackFilter = {}) {}
}

export class ReadProjectsSuccess implements Action {
  public readonly type = READ_PROJECTS_SUCCESS
  constructor(public payload: Project[]) {}
}

export class ReadProjectsFail implements Action {
  public readonly type = READ_PROJECTS_FAIL
  constructor(public payload: any) {}
}

export class UpdateProject implements Action {
  public readonly type = UPDATE_PROJECT
  constructor(public payload: Project) {}
}

export class UpdateProjectSuccess implements Action {
  public readonly type = UPDATE_PROJECT_SUCCESS
  constructor(public payload: Project) {}
}

export class UpdateProjectFail implements Action {
  public readonly type = UPDATE_PROJECT_FAIL
  constructor(public payload: any) {}
}

export class DeleteProject implements Action {
  public readonly type = DELETE_PROJECT
  constructor(public payload: any) {}
}

export class DeleteProjectSuccess implements Action {
  public readonly type = DELETE_PROJECT_SUCCESS
  constructor(public payload: any) {}
}

export class DeleteProjectFail implements Action {
  public readonly type = DELETE_PROJECT_FAIL
  constructor(public payload: any) {}
}

export class SelectProject implements Action {
  public readonly type = SELECT_PROJECT
  constructor(public payload: Project) {}
}

export class SelectProjectSuccess implements Action {
  public readonly type = SELECT_PROJECT_SUCCESS
  constructor(public payload: any) {}
}

export class SelectProjectFail implements Action {
  public readonly type = SELECT_PROJECT_FAIL
  constructor(public payload: any) {}
}

export type Actions =
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFail
  | ReadProjects
  | ReadProjectsSuccess
  | ReadProjectsFail
  | UpdateProject
  | UpdateProjectSuccess
  | UpdateProjectFail
  | DeleteProject
  | DeleteProjectSuccess
  | DeleteProjectFail
  | SelectProject
  | SelectProjectSuccess
  | SelectProjectFail
