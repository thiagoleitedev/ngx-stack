/* tslint:disable */
import { AuthGuard } from './auth.guard';
import { AccessTokenExistsGuard } from './AccessToken';
import { ACLExistsGuard } from './ACL';
import { RoleMappingExistsGuard } from './RoleMapping';
import { RoleExistsGuard } from './Role';
import { AccountExistsGuard } from './Account';
import { ProjectExistsGuard } from './Project';
import { ContainerExistsGuard } from './Container';

export const LOOPBACK_GUARDS_PROVIDERS = [
  AuthGuard,
	AccessTokenExistsGuard,
	ACLExistsGuard,
	RoleMappingExistsGuard,
	RoleExistsGuard,
	AccountExistsGuard,
	ProjectExistsGuard,
	ContainerExistsGuard,
];

export * from './auth.guard';
export * from './AccessToken';
export * from './ACL';
export * from './RoleMapping';
export * from './Role';
export * from './Account';
export * from './Project';
export * from './Container';
