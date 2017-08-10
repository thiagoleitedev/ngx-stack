import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService } from '@ngx-plus/ngx-ui'
import { Subscription } from 'rxjs/Subscription'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-password',
  templateUrl: './user-password.component.html',
})
export class UserPasswordComponent implements OnInit {

  private subscriptions: Subscription[]
  public formConfig: any = {
    hasHeader: false,
    fields: [],
    showCancel: true,
  }
  public item: any

  constructor(
    public service: UsersService,
    public ui: NgxUiService,
    private router: Router,
  ) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.subscriptions.push(
      this.service.selected$.subscribe(
        (user) => this.item = user,
        (err) => console.log(err)))
    this.formConfig.fields = [
      this.ui.form.password('password', {
        label: 'Password',
        placeholder: 'Must be at least 5 characters',
        addonLeft: {
          class: 'fa fa-fw fa-key'
        }
      }),
      this.ui.form.password('password', {
        label: 'Confirm Password',
        placeholder: 'Re-enter the password to confirm',
        addonLeft: {
          class: 'fa fa-fw fa-key'
        }
      }),
    ]
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        return this.service.changePassword(
          Object.assign(event.payload),
          res => this.ui.toastSuccess(
            'Change Password Success', `<u>${event.payload.email}</u>'s password has been changed successfully'`
          ),
          err => this.ui.toastError('Change Password Fail', err.message)
        )
      case 'reset':
        return this.service.resetPassword(
          Object.assign(event.payload),
          res => this.ui.toastSuccess(
            'Password Reset Success', `An email with a password recovery link has been sent to <u>${event.payload.email}</u>`
          ),
          err => this.ui.toastError('Password Reset Fail', err.message)
        )
      case 'cancel':
        return this.router.navigate(['/system/users'])
      default:
        return console.log('Unknown event action', event)
    }
  }

}
