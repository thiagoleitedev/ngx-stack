import { Observable } from 'rxjs/Observable'
import { ActionReducerMap } from '@ngrx/store'
import * as Users from './user.reducers'
import * as Roles from './role.reducers'
import * as Controls from './control.reducers'
import { AuthReducer } from './auth.reducers'
import { ProjectReducer } from './project.reducers'
import { UiReducer } from './ui.reducers'

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

export { AuthReducer, ProjectReducer, UiReducer }
