/* tslint:disable */
import { map, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver } from './resolver';

import * as actions from '../actions';
import { StorageContainerActionTypes, StorageContainerActions } from '../actions/StorageContainer';
import { LoopbackErrorActions } from '../actions/error';
import { StorageContainerApi } from '../services/index';

@Injectable()
export class StorageContainerEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.FIND_BY_ID_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.findByIdFiles(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'StorageFile', 'findByIdSuccess'),
            of(new StorageContainerActions.findByIdFilesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new StorageContainerActions.findByIdFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.DESTROY_BY_ID_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.destroyByIdFiles(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'StorageFile', 'deleteByIdSuccess'),
            of(new StorageContainerActions.destroyByIdFilesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new StorageContainerActions.destroyByIdFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.UPDATE_BY_ID_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.updateByIdFiles(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'StorageFile', 'findByIdSuccess'),
            of(new StorageContainerActions.updateByIdFilesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new StorageContainerActions.updateByIdFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.GET_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.getFiles(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'StorageFile', 'findSuccess'),
            of(new StorageContainerActions.getFilesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new StorageContainerActions.getFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.CREATE_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.createFiles(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'StorageFile', 'findSuccess'),
            of(new StorageContainerActions.createFilesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new StorageContainerActions.createFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.DELETE_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.deleteFiles(action.payload.id).pipe(
          map((response: any) => new StorageContainerActions.deleteFilesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new StorageContainerActions.deleteFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyFiles$ = this.actions$
    .ofType(StorageContainerActionTypes.CREATE_MANY_FILES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.storagecontainer.createManyFiles(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'StorageFile', 'findSuccess'),
            of(new StorageContainerActions.createManyFilesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new StorageContainerActions.createManyFilesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() public create$;
  @Effect() public createMany$;
  @Effect() public findById$;
  @Effect() public find$;
  @Effect() public findOne$;
  @Effect() public updateAll$;
  @Effect() public deleteById$;
  @Effect() public updateAttributes$;
  @Effect() public upsert$;
  @Effect() public upsertWithWhere$;
  @Effect() public replaceOrCreate$;
  @Effect() public replaceById$;
  @Effect() public patchOrCreate$;
  @Effect() public patchAttributes$;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(StorageContainerApi) public storagecontainer: StorageContainerApi
  ) {
    super(actions$, storagecontainer, 'StorageContainer', StorageContainerActionTypes, StorageContainerActions);
  }
}
