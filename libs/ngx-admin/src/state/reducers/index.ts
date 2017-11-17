import { Observable } from 'rxjs/Observable'
import { ActionReducerMap } from '@ngrx/store'

import * as Controls from './control.reducers'
import * as Roles from './role.reducers'
import * as Users from './user.reducers'

export interface AdminState {
  users: Users.State
  roles: Roles.State
  controls: Controls.State
}

export const NgxAdminReducer: ActionReducerMap<AdminState> = {
  users: Users.UserReducer,
  roles: Roles.RoleReducer,
  controls: Controls.ControlReducer,
}
