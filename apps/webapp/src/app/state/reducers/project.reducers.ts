import { Observable } from 'rxjs/Observable'
import { Account, Role, RoleMapping, Project } from '@ngx-plus/ngx-sdk'
import * as Projects from '../actions/project.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: Project }
  selected: Project
  count: number
}

export const initialState: State = {
  ids: [],
  entities: {},
  selected: new Project(),
  count: 0,
}

export function ProjectReducer(
  state: State = initialState,
  action: Projects.Actions
): State {
  switch (action.type) {
    case Projects.CREATE_PROJECT_SUCCESS: {
      const project: Project = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = [...state.ids, project.id]
      updateState.entities[project.id] = project
      updateState.count = updateState.ids.length
      return updateState
    }
    case Projects.READ_PROJECTS_SUCCESS: {
      const updateState = Object.assign({}, state)
      const projects: Project[] = action.payload
      const newProjects = projects.filter(
        project => !state.entities[project.id]
      )
      if (newProjects) {
        const newProjectIds = newProjects.map(project => project.id)
        const newProjectEntities = newProjects.reduce(
          (entities: { [id: string]: Project }, project: Project) => {
            return Object.assign(entities, {
              [project.id]: project,
            })
          },
          {}
        )
        updateState.ids = [...state.ids, ...newProjectIds]
        updateState.entities = Object.assign(
          {},
          state.entities,
          newProjectEntities
        )
      }
      if (updateState.selected) {
        updateState.selected = updateState.entities[updateState.selected.id]
      }
      updateState.count = updateState.ids.length
      return updateState
    }
    case Projects.UPDATE_PROJECT_SUCCESS: {
      const project: Project = action.payload
      const updateState = Object.assign({}, state)
      updateState.entities[project.id] = project
      if (project.id === state.selected.id) {
        updateState.selected = updateState.entities[project.id]
      }
      return updateState
    }
    case Projects.DELETE_PROJECT_SUCCESS: {
      const project: Project = action.payload
      const updateState = Object.assign({}, state)
      updateState.ids = updateState.ids.filter(id => id !== project.id)
      delete updateState.entities[project.id]
      updateState.count = updateState.ids.length
      if (project.id === state.selected.id) {
        updateState.selected = new Project()
      }
      return updateState
    }
    case Projects.SELECT_PROJECT: {
      const project: Project = action.payload
      const updateState = Object.assign({}, state)
      updateState.selected = project
      return updateState
    }
    default: {
      return state
    }
  }
}
