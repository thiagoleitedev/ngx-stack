import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService, NavItem } from '@ngx-plus/ngx-ui'
import { RealTime, AccountApi, FireLoopRef, Account, SDKToken } from '@ngx-plus/ngx-sdk'
import { Subscription } from 'rxjs/Subscription'

import { AuthService } from './auth.service'

@Component({
  selector: 'ngx-auth',
  template: `
    <div class="row align-items-center justify-content-center auth-root">
      <div class="col-12 col-lg-6">
        <ngx-card [nav]="nav"
                    [headerImg]="data.headerImg"
                    [preHeaderImg]="data.preHeaderImg"
                    [postHeaderImg]="data.postHeaderImg">
          <router-outlet></router-outlet>
        </ngx-card>
      </div>
    </div>
  `,
  styles: [`
    .auth-root {
      height: 75vh
    }
    `]
})
export class AuthComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>()
  public user: Account
  private userRef: FireLoopRef<Account>
  private token: any
  public nav: NavItem
  public data: any

  constructor(
    private ui: NgxUiService,
    private auth: AuthService,
    private rt: RealTime,
    public userApi: AccountApi,
    public router: Router,
  ) { }

  ngOnInit() {
    this.ui.deactivateSidebar()
    this.ui.deactivateHeader()
    this.ui.deactivateFooter()
    this.nav = {
      title: '',
      items: [
        { name: 'Log In', link: '/auth/login', icon: 'fa fa-fw fa-sign-in' },
        { name: 'Register', link: '/auth/register', icon: 'fa fa-fw fa-registered' }
      ]
    }
    this.data = {
      headerImg: this.auth.headerImg,
      preHeaderImg: this.auth.preHeaderImg,
      postHeaderImg: this.auth.postHeaderImg,
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

}
