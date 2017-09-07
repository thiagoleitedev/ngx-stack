/* tslint:disable */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver } from './resolver';

import { ContainerActionTypes, ContainerActions } from '../actions/Container';
import { LoopbackErrorActions } from '../actions/error';
import { ContainerApi } from '../services/index';

@Injectable()
export class ContainerEffects extends BaseLoopbackEffects {
  @Effect()
  public getContainers$ = this.actions$
    .ofType(ContainerActionTypes.GET_CONTAINERS)
    .mergeMap((action: LoopbackAction) =>
      this.container.getContainers()
        .map((response: any) => new ContainerActions.getContainersSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.getContainersFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public createContainer$ = this.actions$
    .ofType(ContainerActionTypes.CREATE_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.container.createContainer(action.payload.options)
        .map((response: any) => new ContainerActions.createContainerSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.createContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public destroyContainer$ = this.actions$
    .ofType(ContainerActionTypes.DESTROY_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.container.destroyContainer(action.payload.container)
        .map((response: any) => new ContainerActions.destroyContainerSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.destroyContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public getContainer$ = this.actions$
    .ofType(ContainerActionTypes.GET_CONTAINER)
    .mergeMap((action: LoopbackAction) =>
      this.container.getContainer(action.payload.container)
        .map((response: any) => new ContainerActions.getContainerSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.getContainerFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public getFiles$ = this.actions$
    .ofType(ContainerActionTypes.GET_FILES)
    .mergeMap((action: LoopbackAction) =>
      this.container.getFiles(action.payload.container)
        .map((response: any) => new ContainerActions.getFilesSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.getFilesFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public getFile$ = this.actions$
    .ofType(ContainerActionTypes.GET_FILE)
    .mergeMap((action: LoopbackAction) =>
      this.container.getFile(action.payload.container, action.payload.file)
        .map((response: any) => new ContainerActions.getFileSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.getFileFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public removeFile$ = this.actions$
    .ofType(ContainerActionTypes.REMOVE_FILE)
    .mergeMap((action: LoopbackAction) =>
      this.container.removeFile(action.payload.container, action.payload.file)
        .map((response: any) => new ContainerActions.removeFileSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.removeFileFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public upload$ = this.actions$
    .ofType(ContainerActionTypes.UPLOAD)
    .mergeMap((action: LoopbackAction) =>
      this.container.upload(action.payload.req, action.payload.res)
        .map((response: any) => new ContainerActions.uploadSuccess(action.payload.id, response, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.uploadFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
    );

  @Effect()
  public download$ = this.actions$
    .ofType(ContainerActionTypes.DOWNLOAD)
    .mergeMap((action: LoopbackAction) =>
      this.container.download(action.payload.container, action.payload.file, action.payload.req, action.payload.res)
        .map((response: any) => new ContainerActions.downloadSuccess(action.payload.id, action.payload.fk, action.meta))
        .catch((error: any) => concat(
          of(new ContainerActions.downloadFail(error, action.meta)),
          of(new LoopbackErrorActions.error(error, action.meta))
        ))
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
    @Inject(ContainerApi) public container: ContainerApi
  ) {
    super(actions$, container, 'Container', ContainerActionTypes, ContainerActions);
  }
}
