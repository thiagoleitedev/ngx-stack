import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { NgxUiService } from '../../ui'
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
export class RegisterComponent implements OnInit {

  private subscriptions: Subscription[] = new Array<Subscription>()
  public registration: Account
  public formConfig: {}

  constructor(
    private ui: NgxUiService,
    private userApi: AccountApi,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formConfig = {
      fields: {
        email: 'email',
        password: 'password',
      },
      buttons: [
        {
          label: 'Log In',
          type: 'submit',
          classNames: 'btn btn-success btn-block text-white',
          click: { type: 'LogIn' },
        },
      ],
    }
    this.registration = new Account()
  }

  submit(event) {
    event.payload.username = event.payload.email
    event.payload.fullName = event.payload.firstName + ' ' + (event.payload.middleName || '') + ' ' + event.payload.lastName + ' ' + (event.payload.suffix || '')
    return this.userApi.create(event.payload)
      .subscribe(
      (data) => {
        this.ui.alerts.toastSuccess('Registration Success', `User <u><i>${event.payload.email}</u></i> has been registered successfully.`)
        this.router.navigate(['auth', 'login'])
      },
      (err) => {
        console.log(err)
        this.ui.alerts.toastError('Registration Failure', err.statusCode === 401 ? 'Invalid Credentials' : err.message)
      })
  }

}
