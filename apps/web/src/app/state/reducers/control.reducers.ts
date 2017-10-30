import { ACL } from '@ngx-plus/ngx-sdk'
import * as Controls from '../actions/control.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: ACL }
  selected: ACL
  count: number
}

export const initialState: State = {
  ids: [],
  entities: {},
  selected: new ACL(),
  count: 0,
}

export function ControlReducer(state: State = initialState, action: Controls.Actions): State {
  switch (action.type) {
    case Controls.CREATE_CONTROL_SUCCESS: {
      const control: ACL = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = [...state.ids, control.id]
      updateState.entities[control.id] = control
      updateState.count = updateState.ids.length
      return updateState
    }
    case Controls.READ_CONTROLS_SUCCESS: {
      const updateState = Object.assign({}, state)
      const controls: ACL[] = action.payload
      const newControls = controls.filter(control => !state.entities[control.id])
      if (newControls) {
        const newControlIds = newControls.map(control => control.id)
        const newControlEntities = newControls.reduce((entities: { [id: string]: ACL }, control: ACL) => {
          return Object.assign(entities, {
            [control.id]: control
          })
        }, {})
        updateState.ids = [...state.ids, ...newControlIds]
        updateState.entities = Object.assign({}, state.entities, newControlEntities)
      }
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      updateState.count = updateState.ids.length
      return updateState
    }
    case Controls.UPDATE_CONTROL_SUCCESS: {
      const control: ACL = action.payload
      const updateState = Object.assign({}, state)
      updateState.entities[control.id] = control
      if (control.id === state.selected.id) {
        updateState.selected = updateState.entities[control.id]
      }
      return updateState
    }
    case Controls.DELETE_CONTROL_SUCCESS: {
      const control: ACL = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = updateState.ids.filter(id => id !== control.id)
      delete updateState.entities[control.id]
      updateState.count = updateState.ids.length
      if (control.id === state.selected.id) {
        updateState.selected = new ACL()
      }
      return updateState
    }
    case Controls.SELECT_CONTROL: {
      const control: ACL = action.payload
      const updateState = Object.assign({}, state)
      updateState.selected = control
      return updateState
    }
    default: {
      return state
    }
  }
}
