import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'

import { UserActions } from '../../../state'
import { NgxUiService, NgxFormConfig } from '../../../ui'
import { User, UsersService } from '../users.service'

@Component({
  selector: 'ngx-user-form',
  template: `
    <ngx-form *ngIf="service.selected$ | async"
              [config]="service.formConfig"
              [item]="service.selected$ | async"
              (action)="handleAction($event)">
    </ngx-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  public formConfig: NgxFormConfig
  public item: any
  private subscriptions: Subscription[] = []

  constructor(
    public service: UsersService,
    private ui: NgxUiService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.formConfig = this.service.formConfig
  }

  handleAction(event) {
    switch (event.type) {
      case 'Save':
        const fullName = new String(
          `${event.payload.firstName} ${event.payload.middleName || ''} ${event
            .payload.lastName} ${event.payload.suffix || ''}`
        ).trim()
        event.payload.fullName = fullName
        this.service.update(event.payload)
        return this.router.navigate(['/admin/users'])
      case 'Cancel':
        return this.router.navigate(['/admin/users'])
      default:
        return console.log('$event', event)
    }
  }
}
