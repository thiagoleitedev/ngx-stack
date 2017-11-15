/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { StorageContainer, StorageContainerInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { StorageContainerActionTypes } from '../actions';

export interface StorageContainersState extends EntityState<StorageContainer | StorageContainerInterface> {};

export const StorageContainerAdapter: EntityAdapter<StorageContainer | StorageContainerInterface> = createEntityAdapter<StorageContainer | StorageContainerInterface>();

const initialState: StorageContainersState = StorageContainerAdapter.getInitialState({});

const cases = BaseReducerFactory<StorageContainersState, StorageContainer | StorageContainerInterface>(StorageContainerActionTypes, StorageContainerAdapter);

/**
 * @module StorageContainersReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible StorageContainer reducer.
 */
export function StorageContainersReducer(state = initialState, action: LoopbackAction): StorageContainersState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getStorageContainersState = (state: any) => state.StorageContainers;
export const getStorageContainersEntities = (state: any) => state.StorageContainers.entities;
export const getStorageContainersIds = (state: any) => state.StorageContainers.ids;

export const getStorageContainers =
  createSelector(getStorageContainersEntities, getStorageContainersIds, (entities, ids) => ids.map((id) => entities[id]));

export function getStorageContainerById(id: string) {
  return (state: any) => state.StorageContainers.entities[id];
}

export function getStorageContainersById(ids: string[]) {
  return createSelector(getStorageContainersEntities, (entities) => ids.map((id) => entities[id]));
}
