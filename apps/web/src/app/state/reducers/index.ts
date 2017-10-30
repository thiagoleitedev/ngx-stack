import { Observable } from 'rxjs/Observable'
import { ActionReducerMap } from '@ngrx/store'

import { AuthReducer } from './auth.reducers'
import { UiReducer } from './ui.reducers'

import * as Controls from './control.reducers'
import * as Projects from './project.reducers'
import * as Roles from './role.reducers'
import * as Storage from './storage.reducers'
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
  projects: Projects.State
  storage: Storage.State
}

export const HomeReducer: ActionReducerMap<HomeState> = {
  projects: Projects.ProjectReducer,
  storage: Storage.StorageReducer,
}

export { AuthReducer, UiReducer }
