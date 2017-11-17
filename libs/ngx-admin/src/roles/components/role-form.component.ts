import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Router } from '@angular/router'

import { NgxFormConfig } from '@ngx-plus/ngx-ui'

import { RolesService } from '../roles.service'

@Component({
  selector: 'ngx-role-form',
  template: `
    <ngx-form *ngIf="service.selected$ | async"
              [config]="service.formConfig"
              [item]="service.selected$ | async"
              (action)="handleAction($event)">
    </ngx-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
  public formConfig: NgxFormConfig

  constructor(public service: RolesService, private router: Router) {}

  ngOnInit() {
    this.formConfig = this.service.formConfig
  }

  handleAction(event) {
    switch (event.type) {
      case 'Save':
        this.service.update(event.payload)
        return this.handleAction({ type: 'Cancel' })
      case 'Cancel':
        return this.router.navigate(['/admin/roles'])
      default:
        return console.log('$event', event)
    }
  }
}
