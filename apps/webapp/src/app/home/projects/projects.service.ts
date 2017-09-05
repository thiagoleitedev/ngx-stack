import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  AccountApi,
  Account,
  ProjectApi,
  Project,
  AccessToken,
} from '@ngx-plus/ngx-sdk'
export { Project } from '@ngx-plus/ngx-sdk'
import { NgxUiService } from '../../ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'

import { ProjectActions, UserActions } from '../../state'

@Injectable()
export class ProjectsService {
  public items$: Observable<any>
  public selected$: Observable<any>
  public selected: any
  public formConfig = {
    fields: {
      name: 'input',
      description: 'input',
      salesHandoff: {
        type: 'date',
        label: 'Sales Handoff',
      },
      clientKickoff: {
        type: 'date',
        label: 'Client Kickoff',
      },
      devKickoff: {
        type: 'date',
        label: 'Dev Kickoff',
      },
    },
    buttons: [
      {
        label: 'Cancel',
        type: 'button',
        classNames: 'btn btn-danger col-lg-6',
        click: { type: 'Cancel' },
      },
      {
        label: 'Save',
        type: 'button',
        classNames: 'btn btn-success text-white col-lg-6',
        click: { type: 'Save' },
      },
    ],
  }

  constructor(
    private api: ProjectApi,
    private userApi: AccountApi,
    private ui: NgxUiService,
    private store: Store<any>
  ) {
    this.items$ = this.store.select('home').map(home => home.projects)
    this.selected$ = this.items$.map(items => items.selected)
  }

  setSelected(item) {
    this.store.dispatch(new ProjectActions.SelectProject(item))
    this.selected = item
  }

  get(id): Observable<any> {
    return this.api.find({ where: { id: id } })
  }

  upsert(item) {
    if (item.id) {
      return this.update(item)
    }
    return this.create(item)
  }

  create(item) {
    this.store.dispatch(new ProjectActions.CreateProject(item))
  }

  read(item = {}) {
    this.store.dispatch(new ProjectActions.ReadProjects(item))
  }

  update(item) {
    this.store.dispatch(new ProjectActions.UpdateProject(item))
  }

  delete(item) {
    this.store.dispatch(new ProjectActions.DeleteProject(item))
  }
}
