import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { NgxUiActions } from '@ngx-plus/ngx-ui'

import { ProjectActions, StorageActions } from '../state'

@Component({
  selector: 'ngx-home',
  template: `
      <router-outlet></router-outlet>
  `,
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new NgxUiActions.ActivateHeader())
    this.store.dispatch(new NgxUiActions.ActivateSidebar())
    this.store.dispatch(new NgxUiActions.ActivateFooter())
    this.store.dispatch(new ProjectActions.ReadProjects({ order: 'name ASC' }))
    this.store.dispatch(
      new StorageActions.ReadContainers({
        include: 'files',
        order: 'container ASC',
      }),
    )
  }
}
