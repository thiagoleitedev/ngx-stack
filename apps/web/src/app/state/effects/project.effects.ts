import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { catchError, map, mergeMap } from 'rxjs/operators'

import { Project, ProjectApi } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '@ngx-plus/ngx-ui'

import * as Projects from '../actions/project.actions'

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions, private api: ProjectApi, private ui: NgxUiService) {}

  @Effect()
  protected createProject: Observable<Action> = this.actions$
    .ofType(Projects.CREATE_PROJECT)
    .pipe(
      mergeMap((action: Projects.CreateProject) =>
        this.api
          .create(action.payload)
          .pipe(
            map((response: Project) => new Projects.CreateProjectSuccess(response)),
            catchError((error: any) => of(new Projects.CreateProjectFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected createProjectSuccess = this.actions$.ofType(Projects.CREATE_PROJECT_SUCCESS).pipe(
    map((action: Projects.CreateProjectSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Create Project Success',
        body: `The <u><i>${action.payload.name}</i></u> project has been created successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected createProjectFail = this.actions$.ofType(Projects.CREATE_PROJECT_FAIL).pipe(
    map((action: Projects.CreateProjectFail) =>
      this.ui.alerts.notifyError({
        title: 'Create Project Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected readProjects: Observable<Action> = this.actions$
    .ofType(Projects.READ_PROJECTS)
    .pipe(
      mergeMap((action: Projects.ReadProjects) =>
        this.api
          .find(action.payload)
          .pipe(
            map((response: any) => new Projects.ReadProjectsSuccess(response)),
            catchError((error: any) => of(new Projects.ReadProjectsFail(error)))
          )
      )
    )

  @Effect()
  protected updateProject: Observable<Action> = this.actions$
    .ofType(Projects.UPDATE_PROJECT)
    .pipe(
      mergeMap((action: Projects.UpdateProject) =>
        this.api
          .patchAttributes(action.payload.id, action.payload)
          .pipe(
            map((response: Project) => new Projects.UpdateProjectSuccess(action.payload)),
            catchError((error: any) => of(new Projects.UpdateProjectFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected updateProjectSuccess = this.actions$.ofType(Projects.UPDATE_PROJECT_SUCCESS).pipe(
    map((action: Projects.UpdateProjectSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Update Project Success',
        body: `The <u><i>${action.payload.name}</i></u> project has been updated successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected updateProjectFail = this.actions$.ofType(Projects.UPDATE_PROJECT_FAIL).pipe(
    map((action: Projects.UpdateProjectFail) =>
      this.ui.alerts.notifyError({
        title: 'Update Project Fail',
        body: `${action.payload.message}`,
      })
    )
  )

  @Effect()
  protected deleteProject: Observable<Action> = this.actions$
    .ofType(Projects.DELETE_PROJECT)
    .pipe(
      mergeMap((action: Projects.DeleteProject) =>
        this.api
          .deleteById(action.payload.id)
          .pipe(
            map((response: Project) => new Projects.DeleteProjectSuccess(action.payload)),
            catchError((error: any) => of(new Projects.DeleteProjectFail(error)))
          )
      )
    )

  @Effect({ dispatch: false })
  protected deleteProjectSuccess = this.actions$.ofType(Projects.DELETE_PROJECT_SUCCESS).pipe(
    map((action: Projects.DeleteProjectSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Delete Project Success',
        body: `The <u><i>${action.payload.name}</i></u> project has been deleted successfully.`,
      })
    )
  )

  @Effect({ dispatch: false })
  protected deleteProjectFail = this.actions$.ofType(Projects.DELETE_PROJECT_FAIL).pipe(
    map((action: Projects.DeleteProjectFail) =>
      this.ui.alerts.notifyError({
        title: 'Delete Project Fail',
        body: `${action.payload.message}`,
      })
    )
  )
}
