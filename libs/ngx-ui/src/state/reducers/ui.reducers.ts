import * as Ui from '../actions/ui.actions'

export interface State {
  loader: {
    active: boolean
  }
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
  loader: {
    active: true,
  },
  header: {
    active: true,
  },
  footer: {
    active: true,
  },
  sidebar: {
    active: true,
    open: true,
  },
  morebar: {
    active: true,
    open: false,
  },
}

export function NgxUiReducer(state = initialState, action: Ui.Actions): State {
  switch (action.type) {
    case Ui.ACTIVATE_LOADER: {
      const updateState = Object.assign({}, state)
      updateState.loader.active = true
      return updateState
    }
    case Ui.DEACTIVATE_LOADER: {
      const updateState = Object.assign({}, state)
      updateState.loader.active = false
      return updateState
    }
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
    case Ui.OPEN_SIDEBAR: {
      const updateState = Object.assign({}, state)
      updateState.sidebar.open = true
      return updateState
    }
    case Ui.CLOSE_SIDEBAR: {
      const updateState = Object.assign({}, state)
      updateState.sidebar.open = false
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
    case Ui.OPEN_MOREBAR: {
      const updateState = Object.assign({}, state)
      updateState.morebar.open = true
      return updateState
    }
    case Ui.CLOSE_MOREBAR: {
      const updateState = Object.assign({}, state)
      updateState.morebar.open = false
      return updateState
    }
    default: {
      return state
    }
  }
}
