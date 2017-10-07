import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { UiActions, ProjectActions, StorageActions } from '../state'

@Component({
  selector: 'ngx-home',
  template: `
      <router-outlet></router-outlet>
  `,
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new UiActions.ActivateHeader())
    this.store.dispatch(new UiActions.ActivateSidebar())
    this.store.dispatch(new UiActions.ActivateFooter())
    this.store.dispatch(new ProjectActions.ReadProjects())
    this.store.dispatch(new StorageActions.ReadContainers({ include: 'files' }))
  }
}
