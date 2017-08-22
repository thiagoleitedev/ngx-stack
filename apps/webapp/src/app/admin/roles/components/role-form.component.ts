import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { NgxUiService } from '../../../ui'
import { Subscription } from 'rxjs/Subscription'

import { RoleActions } from '../../../state'
import { Role, RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-form',
  template: `
    <ngx-form *ngIf="item"
              [config]="service.formConfig"
              [item]="item"
              (action)="handleAction($event)">
    </ngx-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
  public formConfig
  public item: any
  private subscriptions: Subscription[] = []

  constructor(
    public service: RolesService,
    private ui: NgxUiService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.formConfig = this.service.formConfig
    this.subscriptions.push(
      this.service.selected$.subscribe(
        role => (this.item = role),
        err => console.log(err)
      )
    )
  }

  handleAction(event) {
    switch (event.type) {
      case 'Update':
        this.handleAction({ type: 'cancel' })
        return this.service.upsert(event.payload)
      case 'Cancel':
        return this.router.navigate(['/admin/roles'])
      default:
        return console.log('Unknown Event Action:', event)
    }
  }
}
