import { Observable } from 'rxjs/Observable'
import { Account, Role, RoleMapping, ACL } from '@ngx-plus/ngx-sdk'
import * as Users from '../actions/user.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: Account }
  selected: Account
  count: number
}

export const initialState: State = {
  ids: [],
  entities: {},
  selected: new Account(),
  count: 0,
}

export function UserReducer(state: State = initialState, action: Users.Actions): State {
  switch (action.type) {
    case Users.CREATE_USER_SUCCESS: {
      const user: Account = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = [...state.ids, user.id]
      updateState.entities[user.id] = user
      updateState.count = updateState.ids.length
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Users.READ_USERS_SUCCESS: {
      const updateState = Object.assign({}, state)
      const users: Account[] = action.payload
      const newUsers = users.filter(user => !state.entities[user.id])
      if (newUsers) {
        const newUserIds = newUsers.map(user => user.id)
        const newUserEntities = newUsers.reduce((entities: { [id: string]: Account }, user: Account) => {
          return Object.assign(entities, {
            [user.id]: user
          })
        }, {})
        updateState.ids = [...state.ids, ...newUserIds]
        updateState.entities = Object.assign({}, state.entities, newUserEntities)
      }
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      updateState.count = updateState.ids.length
      return updateState
    }
    case Users.UPDATE_USER_SUCCESS: {
      const user: Account = action.payload
      const updateState = Object.assign({}, state)
      updateState.entities[user.id] = user
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Users.DELETE_USER_SUCCESS: {
      const user: Account = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = updateState.ids.filter(id => id !== user.id)
      delete updateState.entities[user.id]
      updateState.count = updateState.ids.length
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Users.SELECT_USER: {
      const user: Account = action.payload
      const updateState = Object.assign({}, state)
      updateState.selected = user
      return updateState
    }
    case Users.ADD_USER_TO_ROLE_SUCCESS: {
      const user: Account = action.payload.user
      const role: Role = action.payload.role
      const updateState = Object.assign({}, state)
      const userRoles: Role[] = user.roles || []
      updateState.entities[user.id].roles = [...userRoles, role]
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      return updateState
    }
    case Users.DELETE_USER_FROM_ROLE_SUCCESS: {
      const user: Account = action.payload.user
      const userRoles: Role[] = user.roles || []
      const role: Role = action.payload.role
      const updateState = Object.assign({}, state)
      updateState.entities[user.id].roles = userRoles.filter(r => r.id !== role.id)
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
