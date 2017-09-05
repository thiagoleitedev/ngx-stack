import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { concat } from 'rxjs/observable/concat'
import { Effect, Actions } from '@ngrx/effects'
import { Store, Action } from '@ngrx/store'
import { Container, ContainerApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../ui'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/startWith'

import * as Files from '../actions/file.actions'

@Injectable()
export class FileEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private api: ContainerApi,
    private ui: NgxUiService
  ) { }

  @Effect()
  protected createContainer: Observable<Action> = this.actions$
    .ofType(Files.CREATE_CONTAINER)
    .mergeMap((action: Files.CreateContainer) =>
      this.api
        .create(action.payload)
        .map((response: any) => new Files.CreateContainerSuccess(response))
        .catch((error: any) => of(new Files.CreateContainerFail(error)))
    )

  @Effect({ dispatch: false })
  protected createContainerSuccess = this.actions$
    .ofType(Files.CREATE_CONTAINER_SUCCESS)
    .map((action: Files.CreateContainerSuccess) =>
      this.ui.alerts.toastSuccess(
        'Create Container Success',
        `The <u><i>${action.payload
          .name}</i></u> container has been created successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected createContainerFail = this.actions$
    .ofType(Files.CREATE_CONTAINER_FAIL)
    .map((action: Files.CreateContainerFail) =>
      this.ui.alerts.toastError(
        'Create Container Fail',
        `${action.payload.message}`
      )
    )

  @Effect()
  protected readContainers: Observable<Action> = this.actions$
    .ofType(Files.READ_CONTAINERS)
    .mergeMap((action: Files.ReadContainers) =>
      this.api
        .find(action.payload)
        .map(
        (response: any) =>
          new Files.ReadContainersSuccess(response)
        )
        .catch((error: any) => of(new Files.ReadContainersFail(error)))
    )

  @Effect({ dispatch: false })
  protected readContainersSuccess: Observable<Action> = this.actions$
    .ofType(Files.READ_CONTAINERS_SUCCESS)
    .do((action: Files.ReadContainersSuccess) => {
      const containers = action.payload
      containers.forEach(container => this.store.dispatch(new Files.ReadFiles(container.name)))
    })

  @Effect()
  protected readFiles: Observable<Action> = this.actions$
    .ofType(Files.READ_FILES)
    .mergeMap((action: Files.ReadFiles) =>
      this.api
        .getFiles(action.payload)
        .map(
        (response: any) =>
          new Files.ReadFilesSuccess({ container: action.payload, files: response })
        )
        .catch((error: any) => of(new Files.ReadFilesFail(error)))
    )

  @Effect()
  protected deleteContainer: Observable<Action> = this.actions$
    .ofType(Files.DELETE_CONTAINER)
    .mergeMap((action: Files.DeleteContainer) =>
      this.api
        .destroyContainer(action.payload.name)
        .map(
        (response: any) =>
          new Files.DeleteContainerSuccess(action.payload)
        )
        .catch((error: any) => of(new Files.DeleteContainerFail(error)))
    )

  @Effect({ dispatch: false })
  protected deleteContainerSuccess = this.actions$
    .ofType(Files.DELETE_CONTAINER_SUCCESS)
    .map((action: Files.DeleteContainerSuccess) =>
      this.ui.alerts.toastSuccess(
        'Delete Container Success',
        `The <u><i>${action.payload
          .name}</i></u> container has been deleted successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected deleteContainerFail = this.actions$
    .ofType(Files.DELETE_CONTAINER_FAIL)
    .map((action: Files.DeleteContainerFail) =>
      this.ui.alerts.toastError(
        'Delete Container Fail',
        `${action.payload.message}`
      )
    )
}
