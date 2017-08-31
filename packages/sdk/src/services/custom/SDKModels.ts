/* tslint:disable */
import { Injectable } from '@angular/core';
import { AccessToken } from '../../models/AccessToken';
import { ACL } from '../../models/ACL';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { Account } from '../../models/Account';
import { Project } from '../../models/Project';
import { Container } from '../../models/Container';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    AccessToken: AccessToken,
    ACL: ACL,
    RoleMapping: RoleMapping,
    Role: Role,
    Account: Account,
    Project: Project,
    Container: Container,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
