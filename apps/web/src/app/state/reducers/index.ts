import { ActionReducerMap } from '@ngrx/store'
import { LoopbackStateInterface, LoopbackReducer } from '@ngx-plus/ngx-sdk'
import { UiReducer } from './ui.reducers'


export interface AdminState {
  users: LoopbackStateInterface['Accounts']
  roles: LoopbackStateInterface['Roles']
  controls: LoopbackStateInterface['ACLs']
}

export const AdminReducer: ActionReducerMap<AdminState> = {
  users: LoopbackReducer['Accounts'],
  roles: LoopbackReducer['Roles'],
  controls: LoopbackReducer['ACLs'],
}

export interface HomeState {
  projects: LoopbackStateInterface['Projects']
  storage: LoopbackStateInterface['Storages']
}

export const HomeReducer: ActionReducerMap<HomeState> = {
  projects: LoopbackReducer['Projects'],
  storage: LoopbackReducer['Storages'],
}

export { UiReducer }
