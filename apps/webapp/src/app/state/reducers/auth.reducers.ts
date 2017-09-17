import { Account } from '@ngx-plus/ngx-sdk'
import * as Auth from '../actions/auth.actions'

export interface State {
  id: string
  user: Account
  userId: string
  isAdmin: boolean
  created: Date
  ttl: number
  rememberMe: boolean
}

const initialState: State = {
  id: null,
  user: null,
  userId: null,
  isAdmin: null,
  created: null,
  ttl: null,
  rememberMe: null,
}

const checkAdmin = (roles = []) => roles.includes('Admin')

export function AuthReducer(state = initialState, action: Auth.Actions): State {
  switch (action.type) {
    case Auth.LOG_OUT_SUCCESS:
    case Auth.LOG_OUT_FAIL: {
      return Object.assign({}, initialState)
    }
    case Auth.LOG_IN_SUCCESS: {
      const updateState = Object.assign({}, action.payload)
      return updateState
    }
    case Auth.CHECK_TOKEN_SUCCESS: {
      const updateState = Object.assign({}, state, action.payload)
      const roles = updateState.user.roles.map(role => role.name)
      updateState.isAdmin = checkAdmin(roles)
      return updateState
    }
    case Auth.UPDATE_USER_SUCCESS: {
      const updateState = Object.assign({}, state)
      const roles = action.payload.roles.map(role => role.name)
      updateState.isAdmin = checkAdmin(roles)
      updateState.user = action.payload
      return updateState
    }
    default:
      return state
  }
}
