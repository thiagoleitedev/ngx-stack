import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'

import { AccountApi } from '@ngx-plus/ngx-sdk'
import { NgxUiActions, NgxUiService } from '@ngx-plus/ngx-ui'

@Component({
  selector: 'ngx-auth',
  template: `
    <div class="auth-bg">
      <img src="assets/img/world-bg.jpg">
    </div>
    <ngx-auth-header></ngx-auth-header>
    <div class="auth-container">
      <div class="auth-body">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public cardConfig
  public nav = {
    title: 'Auth',
    items: [
      { name: 'Log In', link: '/auth/login', icon: 'fa fa-fw fa-sign-in' },
      {
        name: 'Register',
        link: '/auth/register',
        icon: 'fa fa-fw fa-user-plus',
      },
    ],
  }

  constructor(public router: Router, private ui: NgxUiService, private store: Store<any>) {}

  ngOnInit() {
    this.cardConfig = {
      headerImg: this.ui.authHeaderImg,
      postHeaderImg: this.ui.postHeaderImg,
      preHeaderImg: this.ui.preHeaderImg,
    }
    this.store.dispatch(new NgxUiActions.DeactivateHeader())
    this.store.dispatch(new NgxUiActions.CloseSidebar())
    this.store.dispatch(new NgxUiActions.DeactivateSidebar())
  }
}
