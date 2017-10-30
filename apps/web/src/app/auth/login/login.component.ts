import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

import { AuthActions } from '../../state'

@Component({
  selector: 'ngx-auth-login',
  template: `
    <ngx-form [config]="formConfig"
              [item]="credentials"
              (action)="handleAction($event)">
    </ngx-form>
  `,
})
export class LoginComponent {
  public credentials = {
    email: null,
    password: null,
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
        return this.store.dispatch(new AuthActions.LogIn(event.payload))
      }
      default: {
        return console.log('$event', event)
      }
    }
  }
}
