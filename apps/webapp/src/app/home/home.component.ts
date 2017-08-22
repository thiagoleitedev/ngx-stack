import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'

import { NgxUiService } from '../ui'
import { UiActions } from '../state'

@Component({
  selector: 'ngx-home',
  template: `
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private ui: NgxUiService, private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new UiActions.ActivateHeader())
    this.store.dispatch(new UiActions.ActivateSidebar())
    this.store.dispatch(new UiActions.ActivateFooter())
  }
}
