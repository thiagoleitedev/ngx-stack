/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { StorageFile, StorageFileInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { StorageFileActionTypes } from '../actions';

export interface StorageFilesState extends EntityState<StorageFile | StorageFileInterface> {};

export const StorageFileAdapter: EntityAdapter<StorageFile | StorageFileInterface> = createEntityAdapter<StorageFile | StorageFileInterface>();

const initialState: StorageFilesState = StorageFileAdapter.getInitialState({});

const cases = BaseReducerFactory<StorageFilesState, StorageFile | StorageFileInterface>(StorageFileActionTypes, StorageFileAdapter);

/**
 * @module StorageFilesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible StorageFile reducer.
 */
export function StorageFilesReducer(state = initialState, action: LoopbackAction): StorageFilesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getStorageFilesState = (state: any) => state.StorageFiles;
export const getStorageFilesEntities = (state: any) => state.StorageFiles.entities;
export const getStorageFilesIds = (state: any) => state.StorageFiles.ids;

export const getStorageFiles =
  createSelector(getStorageFilesEntities, getStorageFilesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getStorageFileById(id: string) {
  return (state: any) => state.StorageFiles.entities[id];
}

export function getStorageFilesById(ids: string[]) {
  return createSelector(getStorageFilesEntities, (entities) => ids.map((id) => entities[id]));
}
