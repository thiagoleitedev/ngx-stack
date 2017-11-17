import { ActionReducerMap } from '@ngrx/store'

import * as Project from './project.reducers'
import * as Storage from './storage.reducers'

export interface HomeState {
  projects: Project.State
  storage: Storage.State
}

export const HomeReducer: ActionReducerMap<HomeState> = {
  projects: Project.ProjectReducer,
  storage: Storage.StorageReducer,
}
