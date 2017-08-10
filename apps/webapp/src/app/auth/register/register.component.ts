import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import { Account, AccountApi } from '@ngx-plus/ngx-sdk'

@Component({
  selector: 'ngx-auth-register',
  template: `
    <ngx-form [config]="formConfig"
              [item]="registration"
              (action)="submit($event)">
    </ngx-form>
  `,
  styles: []
})
export class RegisterComponent {

  private subscriptions: Subscription[] = new Array<Subscription>()
  public registration: Account
  public formConfig: {}

  constructor(
    private ui: NgxUiService,
    private userApi: AccountApi,
    private router: Router,
  ) {
    this.formConfig = this.getFormConfig()
    this.registration = new Account()
  }

  getFormConfig() {
    return {
      fields: this.getFormFields(),
      showCancel: false,
      action: 'register',
      submitButtonText: 'Submit'
    }
  }

  getFormFields() {
    return [
      this.ui.form.email('email', {
        label: 'Email',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-envelope-o'
        }
      }),
      this.ui.form.password('password', {
        label: 'Password',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-key'
        }
      }),
      this.ui.form.input('firstName', {
        label: 'First Name',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        }
      }),
      this.ui.form.input('middleName', {
        label: 'Middle Name',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        },
      }),
      this.ui.form.input('lastName', {
        label: 'Last Name',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        },
      }),
      this.ui.form.select('suffix', {
        label: 'Suffix',
        className: 'col-12 col-lg-6',
        addonLeft: {
          class: 'fa fa-fw fa-user-o'
        },
        options: [
          { label: 'Jr.', value: 'Jr.' },
          { label: 'Sr.', value: 'Sr.' },
          { label: 'II', value: 'II' },
          { label: 'III', value: 'III' },
          { label: 'IV', value: 'IV' },
          { label: 'V', value: 'V' },
        ],
      }),
    ]
  }

  submit(event) {
    event.payload.username = event.payload.email
    event.payload.fullName = event.payload.firstName + ' ' + (event.payload.middleName || '') + ' ' + event.payload.lastName + ' ' + (event.payload.suffix || '')
    return this.userApi.create(event.payload)
      .subscribe(
      (data) => {
        this.ui.toastSuccess('Registration Success', `User <u><i>${event.payload.email}</u></i> has been registered successfully.`)
        this.router.navigate(['auth', 'login'])
      },
      (err) => {
        console.log(err)
        this.ui.toastError('Registration Failure', err.statusCode === 401 ? 'Invalid Credentials' : err.message)
      })
  }

}
