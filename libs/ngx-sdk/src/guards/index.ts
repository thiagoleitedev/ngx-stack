/* tslint:disable */
import { AuthGuard } from './auth.guard';
import { AccessTokenExistsGuard } from './AccessToken';
import { ACLExistsGuard } from './ACL';
import { RoleMappingExistsGuard } from './RoleMapping';
import { RoleExistsGuard } from './Role';
import { AccountExistsGuard } from './Account';
import { ProjectExistsGuard } from './Project';
import { StorageExistsGuard } from './Storage';
import { StorageContainerExistsGuard } from './StorageContainer';
import { StorageFileExistsGuard } from './StorageFile';

export const LOOPBACK_GUARDS_PROVIDERS = [
  AuthGuard,
	AccessTokenExistsGuard,
	ACLExistsGuard,
	RoleMappingExistsGuard,
	RoleExistsGuard,
	AccountExistsGuard,
	ProjectExistsGuard,
	StorageExistsGuard,
	StorageContainerExistsGuard,
	StorageFileExistsGuard,
];

export * from './auth.guard';
export * from './AccessToken';
export * from './ACL';
export * from './RoleMapping';
export * from './Role';
export * from './Account';
export * from './Project';
export * from './Storage';
export * from './StorageContainer';
export * from './StorageFile';
