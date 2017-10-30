import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { StorageContainer } from '@ngx-plus/ngx-sdk'
import * as Storage from '../actions/storage.actions'

export interface State {
  ids: any[]
  entities: {}
  selectedId: any
  count: number
}

export function sortByName(a: StorageContainer, b: StorageContainer): number {
  return a.name.localeCompare(b.name)
}

export const adapter: EntityAdapter<StorageContainer> = createEntityAdapter<
  StorageContainer
>({
  selectId: (container: StorageContainer) => container.id.toString(),
  sortComparer: sortByName,
})

export const initialState = adapter.getInitialState({
  selectedId: null,
  count: 0,
})

export function StorageReducer(
  state = initialState,
  action: Storage.Actions,
): State {
  switch (action.type) {
    case Storage.CREATE_CONTAINER_SUCCESS: {
      const container = action.payload
      return {
        ...adapter.addOne(container, state),
        selectedId: state.selectedId,
        count: state.count + 1,
      }
    }
    case Storage.READ_CONTAINERS_SUCCESS: {
      const containers = action.payload
      return {
        ...adapter.addMany(containers, state),
        selectedId: state.selectedId,
        count: containers.length,
      }
    }
    case Storage.DELETE_CONTAINER_SUCCESS: {
      const container = action.payload
      return {
        ...adapter.removeOne(container, state),
        selectedId: state.selectedId,
        count: state.count - 1,
      }
    }
    case Storage.DELETE_FILE_SUCCESS: {
      const container = action.payload.container
      const deletedFile = action.payload
      const updateState = Object.assign({}, state)
      updateState.entities[container].files = updateState.entities[
        container
      ].files.filter(file => file.id !== deletedFile.id)
      return updateState
    }
    case Storage.SELECT_CONTAINER: {
      return {
        ...state,
        selectedId: action.payload.id,
      }
    }
    default: {
      return state
    }
  }
}
