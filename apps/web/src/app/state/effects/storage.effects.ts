import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Effect, Actions } from '@ngrx/effects'
import { Store, Action } from '@ngrx/store'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { StorageApi, StorageContainerApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'

import * as Storage from '../actions/storage.actions'

@Injectable()
export class StorageEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private api: StorageApi,
    private containerApi: StorageContainerApi,
    private ui: NgxUiService
  ) {}

  @Effect()
  protected createContainer: Observable<Action> = this.actions$
    .ofType(Storage.CREATE_CONTAINER)
    .pipe(
      mergeMap((action: Storage.CreateContainer) =>
        this.api
          .create(action.payload)
          .pipe(
            map((response: any) => new Storage.CreateContainerSuccess(response)),
            catchError((error: any) => of(new Storage.CreateContainerFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected createContainerSuccess = this.actions$.ofType(Storage.CREATE_CONTAINER_SUCCESS).pipe(
    map((action: Storage.CreateContainerSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Create Container Success',
        body: `The <u><i>${action.payload.name}</i></u> container has been created successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected createContainerFail = this.actions$.ofType(Storage.CREATE_CONTAINER_FAIL).pipe(
    map((action: Storage.CreateContainerFail) =>
      this.ui.alerts.notifyError({
        title: 'Create Container Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected readContainers: Observable<Action> = this.actions$
    .ofType(Storage.READ_CONTAINERS)
    .pipe(
      mergeMap((action: Storage.ReadContainers) =>
        this.containerApi
          .find(action.payload)
          .pipe(
            map((response: any) => new Storage.ReadContainersSuccess(response)),
            catchError((error: any) => of(new Storage.ReadContainersFail(error)))
          )
      )
    )

  @Effect()
  protected deleteContainer: Observable<Action> = this.actions$
    .ofType(Storage.DELETE_CONTAINER)
    .pipe(
      mergeMap((action: Storage.DeleteContainer) =>
        this.api
          .destroyContainer(action.payload.name)
          .pipe(
            map((response: any) => new Storage.DeleteContainerSuccess(action.payload)),
            catchError((error: any) => of(new Storage.DeleteContainerFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected deleteContainerSuccess = this.actions$.ofType(Storage.DELETE_CONTAINER_SUCCESS).pipe(
    map((action: Storage.DeleteContainerSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Delete Container Success',
        body: `The <u><i>${action.payload.name}</i></u> container has been deleted successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected deleteContainerFail = this.actions$.ofType(Storage.DELETE_CONTAINER_FAIL).pipe(
    map((action: Storage.DeleteContainerFail) =>
      this.ui.alerts.notifyError({
        title: 'Delete Container Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected deleteFile: Observable<Action> = this.actions$
    .ofType(Storage.DELETE_FILE)
    .pipe(
      mergeMap((action: Storage.DeleteFile) =>
        this.api
          .removeFile(action.payload.container, action.payload.name)
          .pipe(
            map((response: any) => new Storage.DeleteFileSuccess(action.payload)),
            catchError((error: any) => of(new Storage.DeleteFileFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected deleteFileSuccess = this.actions$.ofType(Storage.DELETE_FILE_SUCCESS).pipe(
    map((action: Storage.DeleteFileSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Delete File Success',
        body: `The <u><i>${action.payload.name}</i></u> file has been deleted successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected deleteFileFail = this.actions$.ofType(Storage.DELETE_FILE_FAIL).pipe(
    map((action: Storage.DeleteFileFail) =>
      this.ui.alerts.notifyError({
        title: 'Delete File Fail',
        body: `${action.payload.message}`,
      })
    )
  )
}
