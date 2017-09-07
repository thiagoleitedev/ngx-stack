import * as Files from '../actions/file.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: any }
  selected: any
  count: number
}

export const initialState: State = {
  ids: [],
  entities: {},
  selected: {},
  count: 0,
}

export function FileReducer(
  state: State = initialState,
  action: Files.Actions
): State {
  switch (action.type) {
    case Files.CREATE_CONTAINER_SUCCESS: {
      const container: any = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = [...state.ids, container.name]
      updateState.entities[container.name] = container
      updateState.count = updateState.ids.length
      return updateState
    }
    case Files.READ_CONTAINERS_SUCCESS: {
      const updateState = Object.assign({}, state)
      const containers: any[] = action.payload
      const newContainers = containers.filter(
        container => !state.entities[container.name]
      )
      if (newContainers) {
        const newContainerIds = newContainers.map(container => container.name)
        const newContainerEntities = newContainers.reduce(
          (entities: { [id: string]: any }, container: any) => {
            return Object.assign(entities, {
              [container.name]: container,
            })
          },
          {}
        )
        updateState.ids = [...state.ids, ...newContainerIds]
        updateState.entities = Object.assign(
          {},
          state.entities,
          newContainerEntities
        )
      }
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      updateState.count = updateState.ids.length
      return updateState
    }
    case Files.READ_FILES_SUCCESS: {
      const updateState = Object.assign({}, state)
      const containerName = action.payload.container
      updateState.entities[containerName].files = action.payload.files
      updateState.entities[containerName].size = action.payload.files.length
      return updateState
    }
    case Files.DELETE_CONTAINER_SUCCESS: {
      const container: any = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = updateState.ids.filter(id => id !== container.name)
      delete updateState.entities[container.name]
      updateState.count = updateState.ids.length
      return updateState
    }
    case Files.SELECT_CONTAINER: {
      const container: any = action.payload
      const updateState = Object.assign({}, state)
      updateState.selected = container
      return updateState
    }
    default: {
      return state
    }
  }
}
