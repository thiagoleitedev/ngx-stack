import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxUiService, NgxFormConfig, CardConfig } from '../../../ui'
import { Subscription } from 'rxjs/Subscription'

import { UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-password',
  template: `
    <div class="row align-items-start">
      <div class="col-lg-6">
        <ngx-card [config]="changeCardConfig">
          <ngx-form [config]="formConfig"
                    [item]="item"
                    (action)="handleAction($event)">
          </ngx-form>
        </ngx-card>
      </div>
      <div class="col-lg-6">
        <ngx-card [config]="resetCardConfig">
          <p class="lead text-justify mb-3">
            An email with a password recovery link will be sent to the user's email address.
          </p>
          <hr>
          <button type="button"
                  class="btn btn-danger btn-block"
                  (click)="handleAction({ type: 'Reset', payload: item })">
              Trigger Password Reset
            </button>
        </ngx-card>
      </div>
    </div>
  `,
})
export class UserPasswordComponent implements OnInit {
  public changeCardConfig: CardConfig
  public resetCardConfig: CardConfig
  public formConfig: NgxFormConfig
  public item: any
  private subscriptions: Subscription[]

  constructor(
    public service: UsersService,
    public ui: NgxUiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscriptions = []
    this.subscriptions.push(
      this.service.selected$.subscribe(
        user => (this.item = user),
        err => console.log(err),
      ),
    )
    this.formConfig = {
      fields: {
        password: 'password',
        confirm: {
          type: 'password',
          label: 'Confirm Password',
        },
      },
      buttons: [
        {
          label: 'Change Password',
          type: 'button',
          classNames: 'btn btn-danger btn-block',
          click: { type: 'Cancel' },
        },
      ],
    }
    this.changeCardConfig = {
      cardTitle: 'Change Password',
      headerBg: 'secondary text-info',
    }
    this.resetCardConfig = {
      cardTitle: 'Password Reset',
      headerBg: 'secondary text-info',
    }
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        return this.service.changePassword(
          Object.assign(event.payload),
          res =>
            this.ui.alerts.notifySuccess({
              title: 'Change Password Success',
              body: `<u>${event.payload
                .email}</u>'s password has been changed successfully'`,
            }),
          err =>
            this.ui.alerts.notifyError({
              title: 'Change Password Fail',
              body: err.message,
            }),
        )
      case 'reset':
        return this.service.resetPassword(
          Object.assign(event.payload),
          res =>
            this.ui.alerts.notifySuccess({
              title: 'Password Reset Success',
              body: `An email with a password recovery link has been sent to <u>${event
                .payload.email}</u>`,
            }),
          err =>
            this.ui.alerts.notifyError({
              title: 'Password Reset Fail',
              body: err.message,
            }),
        )
      case 'cancel':
        return this.router.navigate(['/system/users'])
      default:
        return console.log('$event', event)
    }
  }
}
