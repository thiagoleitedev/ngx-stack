/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, StorageFile } from '../models';

export const StorageFileActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('StorageFile'), {
});
export const StorageFileActions =
Object.assign(BaseLoopbackActionsFactory<StorageFile>(StorageFileActionTypes), {
});