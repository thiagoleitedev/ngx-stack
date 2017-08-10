import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import { AccountApi } from '@ngx-plus/ngx-sdk'
import { Store } from '@ngrx/store'

import { AuthActions } from '../../state'

@Component({
  selector: 'ngx-auth-login',
  template: `
    <ngx-form [config]="formConfig"
                [item]="credentials"
                (action)="login($event)">
    </ngx-form>
  `,

})
export class LoginComponent {

  public credentials = {
    email: null,
    password: null,
  }

  public formConfig: {}

  constructor(
    private ui: NgxUiService,
    private api: AccountApi,
    private router: Router,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.formConfig = this.getFormConfig()
    this.ui.deactivateSidebar()
  }

  getFormConfig() {
    return {
      fields: this.getFormFields(),
      showCancel: false,
      action: 'login',
      submitButtonText: 'Log In'
    }
  }

  getFormFields() {
    return [
      this.ui.form.email('email', {
        label: 'Email',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-envelope-o'
        }
      }),
      this.ui.form.password('password', {
        label: 'Password',
        className: 'col-12',
        addonLeft: {
          class: 'fa fa-fw fa-key'
        }
      })
    ]
  }

  login(event) {
    this.store
      .dispatch(new AuthActions.LogIn(event.payload))
  }

  logout() {
    this.store
      .dispatch(new AuthActions.LogOut({}))
  }
}
