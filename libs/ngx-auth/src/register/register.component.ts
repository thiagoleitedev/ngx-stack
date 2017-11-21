import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store'

import { Account } from '@ngx-plus/ngx-sdk'
import { NgxActionButton } from '@ngx-plus/ngx-ui'

import { NgxAuthActions } from '../state'

@Component({
  selector: 'ngx-auth-register',
  template: `
    <div class="row justify-content-center">
      <div class="col-12 card register-social-icons">
        <div class="row">
          <ngx-action-button *ngFor="let item of socialIcons"
                             [config]="item"
                             (action)="handleAction($event)">
          </ngx-action-button>
        </div>
      </div>
    </div>
    <ngx-form [config]="formConfig"
              [item]="registration"
              (action)="handleAction($event)">
    </ngx-form>
  `,
})
export class RegisterComponent implements OnInit {
  @Input()
  socialIcons: NgxActionButton[] = [
    {
      action: 'TwitterRegister',
      class: 'btn btn-sm btn-success text-white mr-2',
      icon: 'fa fa-fw fa-twitter',
      item: '',
      label: '',
    },
    {
      action: 'FacebookRegister',
      class: 'btn btn-sm btn-primary text-white mr-2',
      icon: 'fa fa-fw fa-facebook',
      item: '',
      label: '',
    },
    {
      action: 'GoogleRegister',
      class: 'btn btn-sm btn-info text-white mr-2',
      icon: 'fa fa-fw fa-google-plus',
      item: '',
      label: '',
    },
    {
      action: 'LinkedInRegister',
      class: 'btn btn-sm btn-success text-white',
      icon: 'fa fa-fw fa-linkedin',
      item: '',
      label: '',
    },
  ]

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
