/* tslint:disable */
import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import { LoopbackAuthEffects } from './effects/auth';
import { AccessTokenEffects } from './effects/AccessToken';
import { ACLEffects } from './effects/ACL';
import { RoleMappingEffects } from './effects/RoleMapping';
import { RoleEffects } from './effects/Role';
import { AccountEffects } from './effects/Account';
import { ProjectEffects } from './effects/Project';
import { StorageEffects } from './effects/Storage';
import { StorageContainerEffects } from './effects/StorageContainer';
import { StorageFileEffects } from './effects/StorageFile';

export interface LoopbackStateInterface {
  LoopbackAuth: SDKToken;
  AccessTokens: reducers.AccessTokensState;
  ACLs: reducers.ACLsState;
  RoleMappings: reducers.RoleMappingsState;
  Roles: reducers.RolesState;
  Accounts: reducers.AccountsState;
  Projects: reducers.ProjectsState;
  Storages: reducers.StoragesState;
  StorageContainers: reducers.StorageContainersState;
  StorageFiles: reducers.StorageFilesState;
};

export const LoopbackReducer = {
  LoopbackAuth: reducers.LoopbackAuthReducer,
	AccessTokens: reducers.AccessTokensReducer,
	ACLs: reducers.ACLsReducer,
	RoleMappings: reducers.RoleMappingsReducer,
	Roles: reducers.RolesReducer,
	Accounts: reducers.AccountsReducer,
	Projects: reducers.ProjectsReducer,
	Storages: reducers.StoragesReducer,
	StorageContainers: reducers.StorageContainersReducer,
	StorageFiles: reducers.StorageFilesReducer,
};

export const LoopbackEffects = [
  LoopbackAuthEffects,
  AccessTokenEffects,
  ACLEffects,
  RoleMappingEffects,
  RoleEffects,
  AccountEffects,
  ProjectEffects,
  StorageEffects,
  StorageContainerEffects,
  StorageFileEffects,
];
