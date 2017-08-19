import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService } from '../../../ui'
import { Subscription } from 'rxjs/Subscription'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-password',
  templateUrl: './user-password.component.html',
})
export class UserPasswordComponent implements OnInit {

  private subscriptions: Subscription[]
  public formConfig
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
    this.formConfig = {}
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        return this.service.changePassword(
          Object.assign(event.payload),
          res => this.ui.alerts.toastSuccess(
            'Change Password Success', `<u>${event.payload.email}</u>'s password has been changed successfully'`
          ),
          err => this.ui.alerts.toastError('Change Password Fail', err.message)
        )
      case 'reset':
        return this.service.resetPassword(
          Object.assign(event.payload),
          res => this.ui.alerts.toastSuccess(
            'Password Reset Success', `An email with a password recovery link has been sent to <u>${event.payload.email}</u>`
          ),
          err => this.ui.alerts.toastError('Password Reset Fail', err.message)
        )
      case 'cancel':
        return this.router.navigate(['/system/users'])
      default:
        return console.log('Unknown event action', event)
    }
  }

}
