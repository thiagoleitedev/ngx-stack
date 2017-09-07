import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Project, ProjectApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../ui'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/startWith'

import * as Projects from '../actions/project.actions'

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private api: ProjectApi,
    private ui: NgxUiService
  ) { }

  @Effect()
  protected createProject: Observable<Action> = this.actions$
    .ofType(Projects.CREATE_PROJECT)
    .mergeMap((action: Projects.CreateProject) =>
      this.api
        .create(action.payload)
        .map((response: Project) => new Projects.CreateProjectSuccess(response))
        .catch((error: any) => of(new Projects.CreateProjectFail(error)))
    )

  @Effect({ dispatch: false })
  protected createProjectSuccess = this.actions$
    .ofType(Projects.CREATE_PROJECT_SUCCESS)
    .map((action: Projects.CreateProjectSuccess) =>
      this.ui.alerts.toastSuccess(
        'Create Project Success',
        `The <u><i>${action.payload
          .name}</i></u> project has been created successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected createProjectFail = this.actions$
    .ofType(Projects.CREATE_PROJECT_FAIL)
    .map((action: Projects.CreateProjectFail) =>
      this.ui.alerts.toastError(
        'Create Project Fail',
        `${action.payload.message}`
      )
    )

  @Effect()
  protected readProjects: Observable<Action> = this.actions$
    .ofType(Projects.READ_PROJECTS)
    .mergeMap((action: Projects.ReadProjects) =>
      this.api
        .find(action.payload)
        .map(
        (response: any) =>
          new Projects.ReadProjectsSuccess(response)
        )
        .catch((error: any) => of(new Projects.ReadProjectsFail(error)))
    )

  @Effect()
  protected updateProject: Observable<Action> = this.actions$
    .ofType(Projects.UPDATE_PROJECT)
    .mergeMap((action: Projects.UpdateProject) =>
      this.api
        .patchAttributes(action.payload.id, action.payload)
        .map(
        (response: Project) =>
          new Projects.UpdateProjectSuccess(action.payload)
        )
        .catch((error: any) => of(new Projects.UpdateProjectFail(error)))
    )

  @Effect({ dispatch: false })
  protected updateProjectSuccess = this.actions$
    .ofType(Projects.UPDATE_PROJECT_SUCCESS)
    .map((action: Projects.UpdateProjectSuccess) =>
      this.ui.alerts.toastSuccess(
        'Update Project Success',
        `The <u><i>${action.payload
          .name}</i></u> project has been updated successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected updateProjectFail = this.actions$
    .ofType(Projects.UPDATE_PROJECT_FAIL)
    .map((action: Projects.UpdateProjectFail) =>
      this.ui.alerts.toastError(
        'Update Project Fail',
        `${action.payload.message}`
      )
    )

  @Effect()
  protected deleteProject: Observable<Action> = this.actions$
    .ofType(Projects.DELETE_PROJECT)
    .mergeMap((action: Projects.DeleteProject) =>
      this.api
        .deleteById(action.payload.id)
        .map(
        (response: Project) =>
          new Projects.DeleteProjectSuccess(action.payload)
        )
        .catch((error: any) => of(new Projects.DeleteProjectFail(error)))
    )

  @Effect({ dispatch: false })
  protected deleteProjectSuccess = this.actions$
    .ofType(Projects.DELETE_PROJECT_SUCCESS)
    .map((action: Projects.DeleteProjectSuccess) =>
      this.ui.alerts.toastSuccess(
        'Delete Project Success',
        `The <u><i>${action.payload
          .name}</i></u> project has been deleted successfully.`
      )
    )

  @Effect({ dispatch: false })
  protected deleteProjectFail = this.actions$
    .ofType(Projects.DELETE_PROJECT_FAIL)
    .map((action: Projects.DeleteProjectFail) =>
      this.ui.alerts.toastError(
        'Delete Project Fail',
        `${action.payload.message}`
      )
    )
}
