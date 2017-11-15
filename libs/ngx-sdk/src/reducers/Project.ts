/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Project, ProjectInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { ProjectActionTypes } from '../actions';

export interface ProjectsState extends EntityState<Project | ProjectInterface> {};

export const ProjectAdapter: EntityAdapter<Project | ProjectInterface> = createEntityAdapter<Project | ProjectInterface>();

const initialState: ProjectsState = ProjectAdapter.getInitialState({});

const cases = BaseReducerFactory<ProjectsState, Project | ProjectInterface>(ProjectActionTypes, ProjectAdapter);

/**
 * @module ProjectsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Project reducer.
 */
export function ProjectsReducer(state = initialState, action: LoopbackAction): ProjectsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getProjectsState = (state: any) => state.Projects;
export const getProjectsEntities = (state: any) => state.Projects.entities;
export const getProjectsIds = (state: any) => state.Projects.ids;

export const getProjects =
  createSelector(getProjectsEntities, getProjectsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getProjectById(id: string) {
  return (state: any) => state.Projects.entities[id];
}

export function getProjectsById(ids: string[]) {
  return createSelector(getProjectsEntities, (entities) => ids.map((id) => entities[id]));
}
