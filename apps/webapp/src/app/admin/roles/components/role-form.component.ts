import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AdminUi } from '@ngx-plus/admin-ui'
import { Subscription } from 'rxjs/Subscription'

import { RoleActions } from '../../../state'
import { Role, RolesService } from '../roles.service'

@Component({
  selector: 'admin-role-form',
  template: `
    <admin-form *ngIf="item"
                [config]="formConfig"
                [item]="item"
                (action)="handleAction($event)">
    </admin-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFormComponent implements OnInit {

  private subscriptions: Subscription[]
  public formConfig: any = {}
  public item: any

  constructor(
    public service: RolesService,
    private ui: AdminUi,
    private router: Router,
    private store: Store<any>,
  ) {
    this.subscriptions = []
  }

  ngOnInit() {
    this.formConfig = this.service.getFormConfig(true)
    this.subscriptions.push(
      this.service.selected$.subscribe(
        (role) => this.item = role,
        (err) => console.log(err)))
  }

  handleAction(event) {
    switch (event.type) {
      case 'update':
        this.handleAction({ type: 'cancel' })
        return this.service.upsert(event.payload)
      case 'cancel':
        return this.router.navigate(['/admin/roles'])
      default:
        return console.log('Unknown Event Action:', event)
    }
  }

}
