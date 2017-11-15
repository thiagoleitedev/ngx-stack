/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Project } from '../models';

export const ProjectActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Project'), {
});
export const ProjectActions =
Object.assign(BaseLoopbackActionsFactory<Project>(ProjectActionTypes), {
});