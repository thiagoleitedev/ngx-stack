import { Account } from '@ngx-plus/ngx-sdk'
import * as Auth from '../actions/auth.actions'

export interface State {
  id: string
  user: Account
  userId: string
  created: Date
  ttl: number
  rememberMe: boolean
}

const initialState: State = {
  id: null,
  user: null,
  userId: null,
  created: null,
  ttl: null,
  rememberMe: null,
}

export function AuthReducer(state = initialState, action: Auth.Actions): State {
  switch (action.type) {
    case Auth.LOG_OUT_SUCCESS:
    case Auth.LOG_OUT_FAIL: {
      return Object.assign({}, initialState)
    }
    case Auth.LOG_IN_SUCCESS:
    case Auth.LOAD_TOKEN_SUCCESS: {
      const token = action.payload
      return Object.assign({}, token)
    }
    case Auth.UPDATE_USER_SUCCESS: {
      const updateState = Object.assign({}, state)
      updateState.user = action.payload
      return updateState
    }
    default:
      return state
  }
}
