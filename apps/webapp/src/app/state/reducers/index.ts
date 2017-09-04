import { Observable } from 'rxjs/Observable'
import { ActionReducerMap } from '@ngrx/store'

import { AuthReducer } from './auth.reducers'
import { UiReducer } from './ui.reducers'

import * as Controls from './control.reducers'
import * as Files from './file.reducers'
import * as Projects from './project.reducers'
import * as Roles from './role.reducers'
import * as Users from './user.reducers'

export interface AdminState {
  users: Users.State
  roles: Roles.State
  controls: Controls.State
}

export const AdminReducer: ActionReducerMap<AdminState> = {
  users: Users.UserReducer,
  roles: Roles.RoleReducer,
  controls: Controls.ControlReducer,
}

export interface HomeState {
  files: Files.State
  projects: Projects.State
}

export const HomeReducer: ActionReducerMap<HomeState> = {
  files: Files.FileReducer,
  projects: Projects.ProjectReducer,
}

export { AuthReducer, UiReducer }
