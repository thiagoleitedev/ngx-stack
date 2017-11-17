import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { Account } from '@ngx-plus/ngx-sdk'

import { NgxAuthActions } from '../state'

@Component({
  selector: 'ngx-auth-register',
  template: `
    <ngx-form [config]="formConfig"
              [item]="registration"
              (action)="handleAction($event)">
    </ngx-form>
  `,
})
export class RegisterComponent implements OnInit {
  public registration: Account
  public formConfig: {}

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.formConfig = {
      fields: {
        firstName: {
          className: 'w-50',
          type: 'input',
          label: 'First Name',
        },
        middleName: {
          className: 'w-50',
          type: 'input',
          label: 'Middle Name',
        },
        lastName: {
          className: 'w-50',
          type: 'input',
          label: 'Last Name',
        },
        suffix: {
          className: 'w-50',
          type: 'select',
          label: 'Suffix',
          options: [
            { label: 'Jr.', value: 'Jr.' },
            { label: 'Sr.', value: 'Sr.' },
            { label: 'II', value: 'II' },
            { label: 'III', value: 'III' },
            { label: 'IV', value: 'IV' },
            { label: 'V', value: 'V' },
          ],
        },
        email: {
          className: 'w-50',
          type: 'email',
          label: 'Email',
        },
        password: {
          className: 'w-50',
          type: 'password',
          label: 'Password',
        },
      },
      buttons: [
        {
          label: 'Register',
          type: 'submit',
          classNames: 'btn btn-success btn-block text-white',
          click: { type: 'Register' },
        },
      ],
    }
    this.registration = new Account()
  }

  handleAction(event) {
    switch (event.type) {
      case 'Register': {
        const fullName = new String(
          `${event.payload.firstName} ${event.payload.middleName || ''} ${event.payload.lastName} ${event.payload
            .suffix || ''}`,
        ).trim()
        event.payload.fullName = fullName
        event.payload.roles = []
        return this.store.dispatch(new NgxAuthActions.Register(event.payload))
      }
      default: {
        return console.log('$event', event)
      }
    }
  }
}
