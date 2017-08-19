import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService, NavItem } from '../ui'
import {
  RealTime,
  AccountApi,
  FireLoopRef,
  Account,
  SDKToken,
} from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'ngx-auth',
  template: `
  <div class="container">
    <div class="row align-items-center justify-content-center">
      <div class="col-12 col-lg-6">
        <ngx-card [config]="cardConfig">
          <router-outlet></router-outlet>
        </ngx-card>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .row {
      height: 75vh;
    }
    `,
  ],
})
export class AuthComponent implements OnInit, OnDestroy {
  public cardConfig
  public data: any
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    public userApi: AccountApi,
    public router: Router,
    private ui: NgxUiService,
    private rt: RealTime
  ) { }

  ngOnInit() {
    this.cardConfig = {
      headerImg: this.ui.authHeaderImg,
      nav: {
        title: 'Auth',
        items: [
          { name: 'Log In', link: '/auth/login', icon: 'fa fa-fw fa-sign-in' },
          {
            name: 'Register',
            link: '/auth/register',
            icon: 'fa fa-fw fa-registered',
          },
        ],
      },
      postHeaderImg: this.ui.postHeaderImg,
      preHeaderImg: this.ui.preHeaderImg,
    }
    this.ui.deactivateSidebar()
    this.ui.deactivateHeader()
    this.ui.deactivateFooter()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    )
  }
}
