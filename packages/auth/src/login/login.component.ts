import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUi } from '@ngx-plus/admin-ui';
import { AccountApi } from '@ngx-plus/admin-sdk';

@Component({
  selector: 'admin-auth-login',
  template: `
    <admin-form [config]="formConfig"
                [item]="credentials"
                (action)="login($event)">
    </admin-form>
  `,

})
export class LoginComponent {

  public credentials = {
    email: null,
    password: null,
  }

  public formConfig: {};

  constructor(
    private ui: AdminUi,
    private userApi: AccountApi,
    private router: Router,
  ) {
    this.formConfig = this.getFormConfig();
    this.ui.deactivateSidebar()
  }

  getFormConfig() {
    return {
      fields: this.getFormFields(),
      showCancel: false,
      action: 'login',
      submitButtonText: 'Log In'
    };
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
    ];
  }

  login(event) {
    this.userApi
      .login(event.payload)
      .subscribe(
      (data) => {
        this.router.navigate(['home'])
        this.ui.toastSuccess('Login Success', `You are logged in as <u><i>${event.payload.email}</u></i>.`)
      },
      (err) => {
        this.ui.toastError('Login Failure', err.statusCode === 401 ? 'Invalid Credentials' : err.message)
      })
  }

  logout() {
    this.userApi
      .logout()
      .subscribe(
      (data) => this.ui.toastSuccess('Logout Success', 'You have logged out successfully.'),
      (err) => this.ui.toastError('Logout Failure', err.message))
  }
}
