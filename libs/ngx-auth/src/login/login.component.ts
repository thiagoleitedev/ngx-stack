import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Store } from '@ngrx/store'

import { NgxActionButton } from '@ngx-plus/ngx-ui'

import { NgxAuthActions } from '../state'

@Component({
  selector: 'ngx-auth-login',
  template: `
    <div class="row justify-content-center">
      <div class="col-12 card login-social-icons">
        <div class="row">
          <ngx-action-button *ngFor="let item of socialIcons"
                             [config]="item"
                             (action)="handleAction($event)">
          </ngx-action-button>
        </div>
      </div>
    </div>
    <ngx-form [config]="formConfig"
              [item]="credentials"
              (action)="handleAction($event)">
    </ngx-form>
  `,
})
export class LoginComponent {
  @Input()
  socialIcons: NgxActionButton[] = [
    {
      action: 'TwitterAuth',
      class: 'btn btn-sm btn-success text-white mr-2',
      icon: 'fa fa-fw fa-twitter',
      item: '',
      label: '',
    },
    {
      action: 'FacebookAuth',
      class: 'btn btn-sm btn-primary text-white mr-2',
      icon: 'fa fa-fw fa-facebook',
      item: '',
      label: '',
    },
    {
      action: 'GoogleAuth',
      class: 'btn btn-sm btn-info text-white mr-2',
      icon: 'fa fa-fw fa-google-plus',
      item: '',
      label: '',
    },
    {
      action: 'LinkedInAuth',
      class: 'btn btn-sm btn-success text-white',
      icon: 'fa fa-fw fa-linkedin',
      item: '',
      label: '',
    },
  ]

  public credentials = {
    email: null,
    password: null,
    rememberMe: true,
  }

  public formConfig: {} = {
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

  constructor(private store: Store<any>) {}

  handleAction(event) {
    switch (event.type) {
      case 'LogIn': {
        return this.store.dispatch(new NgxAuthActions.LogIn(event.payload))
      }
      default: {
        return console.log('$event', event)
      }
    }
  }
}
