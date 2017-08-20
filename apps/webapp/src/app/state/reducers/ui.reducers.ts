import { Action, ActionReducer } from '@ngrx/store'
import * as Ui from '../actions/ui.actions'

export interface State {
  header: {
    active: boolean
  }
  footer: {
    active: boolean
  }
  sidebar: {
    active: boolean
    open: boolean
  }
  morebar: {
    active: boolean
    open: boolean
  }
}

const initialState: State = {
  header: {
    active: null
  },
  footer: {
    active: null
  },
  sidebar: {
    active: null,
    open: null
  },
  morebar: {
    active: null,
    open: null
  }
}

export function UiReducer(state = initialState, action: Ui.Actions): State {
  switch (action.type) {
    case Ui.ACTIVATE_FOOTER: {
      const updateState = Object.assign({}, state)
      updateState.footer.active = true
      return updateState
    }
    case Ui.DEACTIVATE_FOOTER: {
      const updateState = Object.assign({}, state)
      updateState.footer.active = false
      return updateState
    }
    case Ui.ACTIVATE_HEADER: {
      const updateState = Object.assign({}, state)
      updateState.header.active = true
      return updateState
    }
    case Ui.DEACTIVATE_HEADER: {
      const updateState = Object.assign({}, state)
      updateState.header.active = false
      return updateState
    }
    case Ui.ACTIVATE_SIDEBAR: {
      const updateState = Object.assign({}, state)
      updateState.sidebar.active = true
      return updateState
    }
    case Ui.DEACTIVATE_SIDEBAR: {
      const updateState = Object.assign({}, state)
      updateState.sidebar.active = false
      return updateState
    }
    case Ui.TOGGLE_SIDEBAR: {
      const updateState = Object.assign({}, state)
      updateState.sidebar.open = !updateState.sidebar.open
      return updateState
    }
    case Ui.ACTIVATE_MOREBAR: {
      const updateState = Object.assign({}, state)
      updateState.morebar.active = true
      return updateState
    }
    case Ui.DEACTIVATE_MOREBAR: {
      const updateState = Object.assign({}, state)
      updateState.morebar.active = false
      return updateState
    }
    case Ui.TOGGLE_MOREBAR: {
      const updateState = Object.assign({}, state)
      updateState.morebar.open = !updateState.morebar.open
      return updateState
    }
    default:
      return state
  }
}
