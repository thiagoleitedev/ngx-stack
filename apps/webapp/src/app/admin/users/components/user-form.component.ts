import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { NgxUiService } from '../../../ui'
import { Subscription } from 'rxjs/Subscription'

import { UserActions } from '../../../state'
import { User, UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-form',
  template: `
    <ngx-form *ngIf="item"
                [config]="formConfig"
                [item]="item"
                (action)="handleAction($event)">
    </ngx-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  private subscriptions: Subscription[]
  public formConfig: any = {}
  public item: any

  constructor(
    public service: UsersService,
    private ui: NgxUiService,
    private router: Router,
    private store: Store<any>
  ) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.formConfig = {}
    this.subscriptions.push(
      this.service.selected$.subscribe(
        user => (this.item = user),
        err => console.log(err)
      )
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'update':
        const fullName =
          event.payload.firstName +
          ' ' +
          (event.payload.middleName || '') +
          ' ' +
          event.payload.lastName +
          ' ' +
          (event.payload.suffix || '')
        event.payload.fullName = fullName.replace('  ', ' ')
        this.handleAction({ type: 'cancel' })
        return this.service.upsert(event.payload)
      case 'cancel':
        return this.router.navigate(['/admin/users'])
      default:
        return console.log('Unknown Event Action:', event)
    }
  }
}
