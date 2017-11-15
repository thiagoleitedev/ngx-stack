/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { ACL, ACLInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { ACLActionTypes } from '../actions';

export interface ACLsState extends EntityState<ACL | ACLInterface> {};

export const ACLAdapter: EntityAdapter<ACL | ACLInterface> = createEntityAdapter<ACL | ACLInterface>();

const initialState: ACLsState = ACLAdapter.getInitialState({});

const cases = BaseReducerFactory<ACLsState, ACL | ACLInterface>(ACLActionTypes, ACLAdapter);

/**
 * @module ACLsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible ACL reducer.
 */
export function ACLsReducer(state = initialState, action: LoopbackAction): ACLsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getACLsState = (state: any) => state.ACLs;
export const getACLsEntities = (state: any) => state.ACLs.entities;
export const getACLsIds = (state: any) => state.ACLs.ids;

export const getACLs =
  createSelector(getACLsEntities, getACLsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getACLById(id: string) {
  return (state: any) => state.ACLs.entities[id];
}

export function getACLsById(ids: string[]) {
  return createSelector(getACLsEntities, (entities) => ids.map((id) => entities[id]));
}
