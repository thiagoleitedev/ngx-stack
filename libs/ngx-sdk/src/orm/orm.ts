/* tslint:disable */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as OrmModels from './models';
import * as models from '../models';

import { RealTime } from '../services';


@Injectable()
export class Orm {
  public AccessToken: OrmModels.OrmAccessToken;
  public ACL: OrmModels.OrmACL;
  public RoleMapping: OrmModels.OrmRoleMapping;
  public Role: OrmModels.OrmRole;
  public Account: OrmModels.OrmAccount;
  public Project: OrmModels.OrmProject;
  public Storage: OrmModels.OrmStorage;
  public StorageContainer: OrmModels.OrmStorageContainer;
  public StorageFile: OrmModels.OrmStorageFile;

  constructor(public store: Store<any>, protected realTime?: RealTime) {
    this.AccessToken = new OrmModels.OrmAccessToken(store, realTime);
    this.ACL = new OrmModels.OrmACL(store, realTime);
    this.RoleMapping = new OrmModels.OrmRoleMapping(store, realTime);
    this.Role = new OrmModels.OrmRole(store, realTime);
    this.Account = new OrmModels.OrmAccount(store, realTime);
    this.Project = new OrmModels.OrmProject(store, realTime);
    this.Storage = new OrmModels.OrmStorage(store, realTime);
    this.StorageContainer = new OrmModels.OrmStorageContainer(store, realTime);
    this.StorageFile = new OrmModels.OrmStorageFile(store, realTime);
  }
}
