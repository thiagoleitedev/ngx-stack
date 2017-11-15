/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, StorageContainer } from '../models';

export const StorageContainerActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('StorageContainer'), {
  FIND_BY_ID_FILES: type('[StorageContainer] findByIdFiles'),
  FIND_BY_ID_FILES_SUCCESS: type('[StorageContainer] findByIdFiles success'),
  FIND_BY_ID_FILES_FAIL: type('[StorageContainer] findByIdFiles fail'),

  DESTROY_BY_ID_FILES: type('[StorageContainer] destroyByIdFiles'),
  DESTROY_BY_ID_FILES_SUCCESS: type('[StorageContainer] destroyByIdFiles success'),
  DESTROY_BY_ID_FILES_FAIL: type('[StorageContainer] destroyByIdFiles fail'),

  UPDATE_BY_ID_FILES: type('[StorageContainer] updateByIdFiles'),
  UPDATE_BY_ID_FILES_SUCCESS: type('[StorageContainer] updateByIdFiles success'),
  UPDATE_BY_ID_FILES_FAIL: type('[StorageContainer] updateByIdFiles fail'),

  GET_FILES: type('[StorageContainer] getFiles'),
  GET_FILES_SUCCESS: type('[StorageContainer] getFiles success'),
  GET_FILES_FAIL: type('[StorageContainer] getFiles fail'),

  CREATE_FILES: type('[StorageContainer] createFiles'),
  CREATE_FILES_SUCCESS: type('[StorageContainer] createFiles success'),
  CREATE_FILES_FAIL: type('[StorageContainer] createFiles fail'),

  DELETE_FILES: type('[StorageContainer] deleteFiles'),
  DELETE_FILES_SUCCESS: type('[StorageContainer] deleteFiles success'),
  DELETE_FILES_FAIL: type('[StorageContainer] deleteFiles fail'),

  CREATE_MANY_FILES: type('[StorageContainer] createManyFiles'),
  CREATE_MANY_FILES_SUCCESS: type('[StorageContainer] createManyFiles success'),
  CREATE_MANY_FILES_FAIL: type('[StorageContainer] createManyFiles fail'),

});
export const StorageContainerActions =
Object.assign(BaseLoopbackActionsFactory<StorageContainer>(StorageContainerActionTypes), {

  /**
   * findByIdFiles Action.
   * Find a related item by id for files.
   *
   * @param {any} id StorageContainer id
   * @param {any} fk Foreign key for files
   * @param {any} meta (optional).
   * 
   */
  findByIdFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.FIND_BY_ID_FILES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * findByIdFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  findByIdFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.FIND_BY_ID_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * findByIdFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  findByIdFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.FIND_BY_ID_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * destroyByIdFiles Action.
   * Delete a related item by id for files.
   *
   * @param {any} id StorageContainer id
   * @param {any} fk Foreign key for files
   * @param {any} meta (optional).
   * 
   */
  destroyByIdFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.DESTROY_BY_ID_FILES;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdFilesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  destroyByIdFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.DESTROY_BY_ID_FILES_SUCCESS;
      public payload: {id: any, fk: any};

    constructor(id: any, fk: any, public meta?: any) {
      this.payload = {id, fk};
    }
  },
  /**
   * destroyByIdFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  destroyByIdFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.DESTROY_BY_ID_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * updateByIdFiles Action.
   * Update a related item by id for files.
   *
   * @param {any} id StorageContainer id
   * @param {any} fk Foreign key for files
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  updateByIdFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.UPDATE_BY_ID_FILES;
      public payload: {id: any, fk: any, data: any};

    constructor(id: any, fk: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, fk, data};
    }
  },
  /**
   * updateByIdFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  updateByIdFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.UPDATE_BY_ID_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * updateByIdFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  updateByIdFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.UPDATE_BY_ID_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * getFiles Action.
   * Queries files of StorageContainer.
   *
   * @param {any} id StorageContainer id
   * @param {object} filter 
   * @param {any} meta (optional).
   * 
   */
  getFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.GET_FILES;
      public payload: {id: any, filter: LoopBackFilter};

    constructor(id: any, filter: LoopBackFilter = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, filter};
    }
  },
  /**
   * getFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  getFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.GET_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * getFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  getFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.GET_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createFiles Action.
   * Creates a new instance in files of this model.
   *
   * @param {any} id StorageContainer id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.CREATE_FILES;
      public payload: {id: any, data: any};

    constructor(id: any, data: any = {}, customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object} data 
   * @param {any} meta (optional).
   * 
   */
  createFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.CREATE_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.CREATE_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * deleteFiles Action.
   * Deletes all files of this model.
   *
   * @param {any} id StorageContainer id
   * @param {any} meta (optional).
   * 
   */
  deleteFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.DELETE_FILES;
      
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteFilesSuccess Action.
   * 
   * @param {any} id 
   * This method returns no data.
   * @param {any} meta (optional).
   * 
   */
  deleteFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.DELETE_FILES_SUCCESS;
  
    constructor(public payload: any, public meta?: any) {}
  },
  /**
   * deleteFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  deleteFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.DELETE_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },

  /**
   * createManyFiles Action.
   * Creates a new instance in files of this model.
   *
   * @param {any} id StorageContainer id
   * @param {object} data Request data.
   *
   * This method expects a subset of model properties as request parameters.
   * @param {any} meta (optional).
   * 
   */
  createManyFiles: class implements Action {
    public readonly type = StorageContainerActionTypes.CREATE_MANY_FILES;
      public payload: {id: any, data: any[]};

    constructor(id: any, data: any[] = [], customHeaders?: Function, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyFilesSuccess Action.
   * 
   * @param {any} id 
   * @param {object[]} data 
   * @param {any} meta (optional).
   * 
   */
  createManyFilesSuccess: class implements Action {
    public readonly type = StorageContainerActionTypes.CREATE_MANY_FILES_SUCCESS;
      public payload: {id: any, data: any};

    constructor(id: any, data: any, public meta?: any) {
      this.payload = {id, data};
    }
  },
  /**
   * createManyFilesFail Action.
   *
   * @param {any} payload
   * @param {any} meta (optional).
   * 
   */
  createManyFilesFail: class implements Action {
    public readonly type = StorageContainerActionTypes.CREATE_MANY_FILES_FAIL;

    constructor(public payload: any, public meta?: any) { }
  },
});