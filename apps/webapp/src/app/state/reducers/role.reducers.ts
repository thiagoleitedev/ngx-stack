import { Observable } from 'rxjs/Observable'
import { Account, Role, RoleMapping, ACL } from '@ngx-plus/ngx-sdk'
import * as Roles from '../actions/role.actions'
import * as Users from '../actions/user.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: Role }
  selected: Role
  count: number
}

export const initialState: State = {
  ids: [],
  entities: {},
  selected: new Role(),
  count: 0,
}

export function RoleReducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case Roles.CREATE_ROLE_SUCCESS: {
      const role: Role = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = [...state.ids, role.id]
      updateState.entities[role.id] = role
      updateState.count = updateState.ids.length
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Roles.READ_ROLES_SUCCESS: {
      const updateState = Object.assign({}, state)
      const roles: Role[] = action.payload
      const newRoles = roles.filter(role => !state.entities[role.id])
      if (newRoles) {
        const newRoleIds = newRoles.map(role => role.id)
        const newRoleEntities = newRoles.reduce((entities: { [id: string]: Role }, role: Role) => {
          return Object.assign(entities, {
            [role.id]: role
          })
        }, {})
        updateState.ids = [...state.ids, ...newRoleIds]
        updateState.entities = Object.assign({}, state.entities, newRoleEntities)
      }
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      updateState.count = updateState.ids.length
      return updateState
    }
    case Roles.UPDATE_ROLE_SUCCESS: {
      const role: Role = action.payload
      const updateState = Object.assign({}, state)
      updateState.entities[role.id] = role
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Roles.DELETE_ROLE_SUCCESS: {
      const role: Role = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = updateState.ids.filter(id => id !== role.id)
      delete updateState.entities[role.id]
      updateState.count = updateState.ids.length
      return updateState
    }
    case Roles.SELECT_ROLE: {
      const role: Role = action.payload
      const updateState = Object.assign({}, state)
      updateState.selected = role
      return updateState
    }
    case Users.ADD_USER_TO_ROLE_SUCCESS: {
      const user: Account = action.payload.user
      const role: Role = action.payload.role
      const updateState = Object.assign({}, state)
      const roleUsers: RoleMapping[] = role.principals || []
      updateState.entities[role.id].principals = [...roleUsers, action.payload.mapping]
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Users.DELETE_USER_FROM_ROLE_SUCCESS: {
      const user: Account = action.payload.user
      const role: Role = action.payload.role
      const roleUsers: RoleMapping[] = role.principals || []
      const updateState = Object.assign({}, state)
      updateState.entities[role.id].principals = roleUsers.filter(r => r.principalId !== user.id)
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    default: {
      return state
    }
  }
}
