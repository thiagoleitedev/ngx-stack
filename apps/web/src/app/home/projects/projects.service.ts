import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

import { ProjectApi, Project } from '@ngx-plus/ngx-sdk'
export { Project } from '@ngx-plus/ngx-sdk'

import { ProjectActions } from '../../state'

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

  constructor(private api: ProjectApi, private store: Store<any>) {
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

  create(item) {
    this.store.dispatch(new ProjectActions.CreateProject(item))
  }

  update(item) {
    this.store.dispatch(new ProjectActions.UpdateProject(item))
  }

  delete(item) {
    this.store.dispatch(new ProjectActions.DeleteProject(item))
  }
}
